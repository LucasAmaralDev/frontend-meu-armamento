import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToasterContext } from '../../Context/ToasterContext'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import { cssButtonConfirm, cssInput } from '../../services/utils'

export default function EditarPerfil() {

    const { toast } = useContext(ToasterContext)
    const navigate = useNavigate()

    const [meusDados, setMeusDados] = useState({})
    const { register, handleSubmit } = useForm()

    async function atualizarDados(dados) {
        const toastAtualizar = toast.loading('Atualizando perfil...')
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
            toast.success("Perfil atualizado", {
                id: toastAtualizar
            })
            navigate('/home')
        }

        else {
            toast.error(dataResponse.error, {
                id: toastAtualizar
            })
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
            <EscopoAdmin titulo="Editar Perfil">

                {
                    meusDados &&
                    <section className='w-full pt-10'>
                        <form onSubmit={handleSubmit(atualizarDados)}>

                            <div className="flex flex-col gap-2 max-lg:gap-4 w-full items-center">

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
