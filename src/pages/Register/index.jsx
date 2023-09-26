import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import HOST from '../../services/host'
import { useForm } from 'react-hook-form'
import ModalResposta from '../../components/ModalResposta'



export default function Register() {

    const { register, handleSubmit } = useForm()
    const [modal, setModal] = useState(false)
    const [dadosModal, setDadosModal] = useState({})


    // Dados para cadastro
    // numeroRegistro: '',
    // nome: '',
    // senha: '',
    // confirmarSenha: ''

    async function fazerCadastro(data) {

        if (data.senha !== data.confirmarSenha) {
            setDadosModal({
                titulo: 'Erro',
                mensagem: 'As senhas não coincidem'
            })
        }

        const credenciaisLogin = {
            registroMilitar: data.numeroRegistro,
            senha: data.senha,
            nome: data.nome
        }

        const response = await fetch(HOST + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciaisLogin)
        })

        const dados = await response.json()
        if (response.status === 201) {
            window.location.href = '/home'
            return
        }

        else {
            setDadosModal({
                titulo: 'Erro',
                mensagem: dados.error
            })

            setModal(true)
        }

    }

    return (
        <div className='flex flex-col w-full min-h-screen'>

            <ModalResposta modal={modal} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem} action={dadosModal.action} />


            <Header />


            <main className='flex flex-col w-full min-h-full justify-around items-center gap-6 p-3 max-lg: pt-0'>


                <section className=' h-full flex flex-col items-center gap-2 md:gap-0 md:justify-center md:items-center md:w-2/5 md:h-1/2'>
                    <div className='flex w-full py-4 justify-center'>
                        <h1 className='text-2xl font-bold'>COMPLETE SEU CADASTRO</h1>
                    </div>

                    <form
                        className='flex flex-col justify-center items-center gap-2 w-full p-4 bg-white rounded-md'
                        onSubmit={handleSubmit(fazerCadastro)}
                    >

                        <label className='flex flex-col justify-center items-center gap-1 w-full'>
                            <span>Número de Registro</span>
                            <input className='border border-solid border-gray-300 rounded-md p-2 text-center w-full' type="text"
                                {...register('numeroRegistro')}
                            />
                        </label>

                        <label className='flex flex-col justify-center items-center gap-1 w-full'>
                            <span>Nome</span>
                            <input className='border border-solid border-gray-300 rounded-md p-2 text-center w-full' type="text"
                                {...register('nome')}
                            />
                        </label>

                        <label className='flex flex-col justify-center items-center gap-1 w-full'>
                            <span>Senha</span>
                            <input className='border border-solid border-gray-300 rounded-md p-2 text-center w-full' type="password"
                                {...register('senha')}
                            />
                        </label>

                        <label className='flex flex-col justify-center items-center gap-1 w-full'>
                            <span>Confirmar Senha</span>
                            <input className='border border-solid border-gray-300 rounded-md p-2 text-center w-full' type="password"
                                {...register('confirmarSenha')}
                            />
                        </label>

                        <div className='flex flex-col justify-center items-center gap-3 w-full p-4 bg-white rounded-md'>
                            <button className='w-full m-1 p-2 border-2 border-gray-300 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 active:bg-green-900' onClick={handleSubmit(fazerCadastro)}>CADASTRAR</button>
                            <Link to='/login' className='w-full flex flex-col items-center'>
                                <p>Já possui uma conta?</p>
                                <button className='w-full m-1 p-2 border-2 border-gray-300 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 active:bg-green-900'>FAZER LOGIN</button>
                            </Link>
                        </div>

                    </form>

                </section>

            </main>
        </div>
    )
}
