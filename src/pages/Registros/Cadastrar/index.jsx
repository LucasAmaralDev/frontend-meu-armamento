import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToasterContext } from '../../../Context/ToasterContext'
import EscopoAdmin from '../../../components/EscopoAdmin'
import HOST from '../../../services/host'
import { cssButtonConfirm, cssSelect } from '../../../services/utils'
import { useNavigate } from 'react-router-dom'

export default function CadastrarRegistro() {

    const { toast } = useContext(ToasterContext)
    const navigate = useNavigate()
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
            toast.error(dataResponse.error)
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
            setArmas(dataResponse)
        } else {
            toast.error(dataResponse.error)
        }

    }

    useEffect(() => {
        buscarMilitares()
        buscarArmas()
    }, [])


    async function formularioNovoAcautelamento(data) {
        const toastAcautelamento = toast.loading("Registrando retirada...")
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
            toast.success("Retirada registrada", {
                id: toastAcautelamento
            })
            navigate('/registros')
        }

        else {
            toast.error(dataResponse.error, {
                id: toastAcautelamento
            })
        }


    }

    const { register, handleSubmit } = useForm()

    return (
        <EscopoAdmin titulo="LANÇAR REGISTRO DE ACAUTELAMENTO">

            <div className='w-full h-full flex flex-col justify-center items-center py-4 px-2 gap-6 overflow-x-scroll max-lg:overflow-x-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>LANÇAR REGISTRO DE ACAUTELAMENTO</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovoAcautelamento)}
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

                                if (arma.emUso === true) {
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
