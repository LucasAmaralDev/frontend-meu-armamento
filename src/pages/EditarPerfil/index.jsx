import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import { useForm } from 'react-hook-form'
import ModalResposta from '../../components/ModalResposta'
import { cssButtonConfirm, cssInput } from '../../services/utils'

export default function EditarPerfil() {
    //Classes do tailwind
    

    const [meusDados, setMeusDados] = useState({})
    const { register, handleSubmit } = useForm()
    const [modal, setModal] = useState(false)
    const [dadosModal, setDadosModal] = useState({})

    function voltarParaHome() {
        window.location.href = '/home'
    }

    async function atualizarDados(dados) {
        
        const response = await fetch(HOST + 'armeiro/update/' + meusDados.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(dados)
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setDadosModal({
                titulo: 'Sucesso',
                mensagem: dataResponse.message,
                action: voltarParaHome
            })

            setModal(true)
        }

        else {
            setDadosModal({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })

            setModal(true)
        }
    }

    async function carregarMeusDados() {


        const response = await fetch(HOST + 'get-my-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dados = await response.json()
        setMeusDados(dados)
    }

    useEffect(() => {
        carregarMeusDados()
    }, [])

    return (
        <>
            <ModalResposta modal={modal} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem} action={dadosModal.action} />


            <EscopoAdmin titulo="Editar Perfil">

                {
                    meusDados &&
                    <section className='w-full pt-10'>
                        <form onSubmit={handleSubmit(atualizarDados)}>

                            <div className="flex flex-col gap-2 max-lg:gap-4 w-full items-center">

                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>ID</span>
                                    <input className={cssInput} type="text"
                                        disabled={true}
                                        defaultValue={meusDados.id} />
                                </label>

                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>registroMilitar</span>
                                    <input className={cssInput} type="text"
                                        disabled={true}
                                        defaultValue={meusDados.registroMilitar} />
                                </label>


                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>Nome</span>
                                    <input className={cssInput} type="text"
                                        {...register('nome')}
                                        defaultValue={meusDados.nome} />
                                </label>

                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>Email</span>
                                    <input className={cssInput} type="text"
                                        {...register('email')}
                                        defaultValue={meusDados.email} />
                                </label>

                            </div>

                            <div className="flex justify-center items-center gap-2 max-lg:gap-4 w-full mt-4 max-lg:px-9">
                                <button className={cssButtonConfirm}>ATUALIZAR</button>
                            </div>
                        </form>
                    </section>
                }

            </EscopoAdmin>
        </>
    )
}
