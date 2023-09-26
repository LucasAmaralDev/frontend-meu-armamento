import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../../components/EscopoAdmin'
import { useForm } from 'react-hook-form'
import HOST from '../../../services/host'
import ModalResposta from '../../../components/ModalResposta'
import { cssButtonConfirm, cssSelect } from '../../../services/utils'

export default function CadastrarRegistro() {

    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [militares, setMilitares] = useState([])
    const [armas, setArmas] = useState([])

    async function buscarMilitares() {
        const response = await fetch(HOST + 'militares/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })

        const dataResponse = await response.json()

        if (response.ok) {

            setMilitares(dataResponse)

        }

        else {
            setDataModal({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })

            setModal(true)
        }
    }

    async function buscarArmas() {

        const response = await fetch(HOST + 'arma/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })

        const dataResponse = await response.json()

        if (response.ok) {
            console.log(dataResponse)
            setArmas(dataResponse)
        }

        else {
            setDataModal({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })

            setModal(true)
        }

    }

    useEffect(() => {
        buscarMilitares()
        buscarArmas()
    }, [])

    function retornarParaPaginaAnterior() {
        window.location.href = '/registros'
    }

    async function formularioNovoMilitar(data) {
        const tratamento = {
            ...data,
            arma_id: parseInt(data.arma_id),
            militar_id: parseInt(data.militar_id)
        }

        const response = await fetch(HOST + 'acautelamento/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors'
            ,
            body: JSON.stringify(tratamento)
        })

        const dataResponse = await response.json()


        if (response.ok) {
            setDataModal({
                titulo: 'Sucesso',
                mensagem: "Acautelamento realizado com sucesso",
                action: retornarParaPaginaAnterior
            })
            setModal(true)
        }

        else {
            setDataModal({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })
            setModal(true)
        }


    }

    const { register, handleSubmit } = useForm()

    return (
        <EscopoAdmin titulo="LANÇAR REGISTRO DE ACAUTELAMENTO">

            <ModalResposta modal={modal} setModal={setModal} titulo={dataModal.titulo} mensagem={dataModal.mensagem} action={dataModal.action} />

            <div className='w-full h-full flex flex-col justify-center items-center py-4 px-2 gap-6 overflow-x-scroll max-lg:overflow-x-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>LANÇAR REGISTRO DE ACAUTELAMENTO</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovoMilitar)}
                    className='w-full h-full flex flex-col justify-center items-center gap-12'>

                    <select
                        {...register('militar_id')}
                        className={cssSelect} >
                        <option value=''>Selecione o militar</option>
                        {
                            militares.map((militar) => {
                                return (
                                    <option value={militar.id}>{militar.registroMilitar} | {militar.nome}</option>
                                )
                            })
                        }
                    </select>


                    <select
                        {...register('arma_id')}
                        className={cssSelect}>
                        <option value=''>Selecione a arma</option>
                        {
                            armas.map((arma) => {

                                if (arma.estadoConservacao === 'BAIXADA') {
                                    return <></>
                                }

                                return (
                                    <option value={arma.id}>{arma.numeroSerie} | {arma.modelo} | {arma.estadoConservacao}</option>
                                )
                            })
                        }
                    </select>

                    <button {
                        ...register('cadastrar')
                    } type='submit' className={cssButtonConfirm}>Cadastrar</button>
                </form>
            </div>
        </EscopoAdmin>
    )
}
