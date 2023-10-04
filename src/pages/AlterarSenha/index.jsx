import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToasterContext } from '../../Context/ToasterContext'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import { cssButtonConfirm, cssInput } from '../../services/utils'

export default function AlterarSenha() {

    const { toast } = useContext(ToasterContext)
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()
    const [meusDados, setMeusDados] = useState({})

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



    async function atualizarDados(dados) {
        const toastAtualizarSenha = toast.loading("Atualizando a senha...")

        if (dados.confirmarSenha !== dados.novaSenha) {
            toast.error('As senhas não coincidem', {
                id: toastAtualizarSenha
            })

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
            toast.success("Senha Atualizada", {
                id: toastAtualizarSenha
            })
            navigate('/home')
        }

        else {
            toast.error(dataResponse.error, {
                id: toastAtualizarSenha
            })
        }

    }

    return (
        <>
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
