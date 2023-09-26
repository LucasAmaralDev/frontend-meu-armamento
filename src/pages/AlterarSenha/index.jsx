import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import { useForm } from 'react-hook-form'
import ModalResposta from '../../components/ModalResposta'
import HOST from '../../services/host'
import { cssButtonConfirm, cssInput } from '../../services/utils'

export default function AlterarSenha() {

    const { register, handleSubmit } = useForm()
    const [meusDados, setMeusDados] = useState({})
    const [modal, setModal] = useState(false)
    const [dadosModal, setDadosModal] = useState({})

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


    function voltarParaHome() {
        window.location.href = '/home'
    }

    async function atualizarDados(dados) {

        if (dados.confirmarSenha !== dados.novaSenha) {
            setDadosModal({
                titulo: 'Erro',
                mensagem: 'As senhas não coincidem'
            })

            setModal(true)
            return
        }

        const response = await fetch(HOST + 'armeiro/update/password/' + meusDados.id, {
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

    return (
        <>
            <ModalResposta modal={modal} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem} action={dadosModal.action} />


            <EscopoAdmin titulo="Alterar Senha">
                
            <section className='w-full pt-10'>
                        <form onSubmit={handleSubmit(atualizarDados)}>

                            <div className="flex flex-col gap-2 max-lg:gap-4 w-full items-center">


                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>Senha</span>
                                    <input className={cssInput}
                                    type="password"
                                        {...register('senha')} />
                                </label>

                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>Nova Senha</span>
                                    <input className={cssInput} 
                                    type="password"
                                        {...register('novaSenha')} />
                                </label>

                                <label className="flex flex-col items-center gap-1 max-lg:gap-2 w-full max-lg:w-4/5">
                                    <span>Confirmar Senha</span>
                                    <input className={cssInput} 
                                    type="password"
                                        {...register('confirmarSenha')} />
                                </label>


                            </div>

                            <div className="flex justify-center items-center gap-2 max-lg:gap-4 w-full mt-4 px-9">
                                <button className={cssButtonConfirm}>ATUALIZAR</button>
                            </div>
                        </form>
                    </section>

            </EscopoAdmin>
        </>
    )
}
