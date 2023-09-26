import React, { useState } from 'react'
import EscopoAdmin from '../../../components/EscopoAdmin'
import { useForm } from 'react-hook-form'
import HOST from '../../../services/host'
import ModalResposta from '../../../components/ModalResposta'
import { cssButtonConfirm, cssInput } from '../../../services/utils'

export default function CadastrarMilitar() {

    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    function retornarParaPaginaAnterior() {
        window.location.href = '/militares'
    }

    async function formularioNovoMilitar(data) {
        const tratamento = {
            ...data
        }

        const response = await fetch(HOST + 'militares/add', {
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
                mensagem: dataResponse.nome + " cadastrado com sucesso",
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
        <EscopoAdmin titulo="CADASTRAR MILITAR">

            <ModalResposta modal={modal} setModal={setModal} titulo={dataModal.titulo} mensagem={dataModal.mensagem} action={dataModal.action} />

            <div className='w-full h-full flex flex-col justify-center items-center py-4 px-2 gap-6 overflow-x-scroll max-lg:overflow-x-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>Cadastrar  Militar</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovoMilitar)}
                    className='w-full h-full flex flex-col justify-center items-center gap-10'>

                    <input type="text" {
                        ...register('registroMilitar')
                    } placeholder='Registro Militar' className={cssInput} />

                    <input type="text" {
                        ...register('nome')
                    } placeholder='Nome' className={cssInput} />

                    <input type="text" {
                        ...register('batalhao')
                    } placeholder='Batalhão' className={cssInput} />

                    <button {
                        ...register('cadastrar')
                    } type='submit' className={cssButtonConfirm} >Cadastrar</button>
                </form>
            </div>
        </EscopoAdmin>
    )
}
