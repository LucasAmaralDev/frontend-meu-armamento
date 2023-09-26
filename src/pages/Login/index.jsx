import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import HOST from './../../services/host'
import ModalResposta from '../../components/ModalResposta'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {

    const [modal, setModal] = useState(false)
    const [dadosModal, setDadosModal] = useState({})
    const { register, handleSubmit } = useForm()


    async function fazerLogin(data) {

        const response = await fetch(HOST + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dados = await response.json()
        if (response.status === 200) {
            window.localStorage.setItem('token', dados.token)
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
        <div className='flex flex-col w-full h-screen'>
            <ModalResposta modal={modal} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem} action={dadosModal.action} />


            <Header />
            <main className='flex flex-col w-full h-full justify-around items-center gap-10 p-3 overflow-y-auto'
            >

                <section className=' h-full flex flex-col items-center gap-2 md:gap-0 md:justify-center md:items-center md:w-2/5 md:h-1/2'
                >
                    <div className='flex w-full py-4 justify-center'>
                        <h1 className='text-2xl font-bold'>ENTRE COM SUAS CREDENCIAIS</h1>
                    </div>

                    <form className='flex flex-col justify-center items-center gap-2 w-full p-4 bg-white rounded-md'
                        onSubmit={handleSubmit(fazerLogin)}
                    >

                        <label className='flex flex-col justify-center items-center gap-1 w-full'>
                            <span>REGISTRO MILITAR</span>
                            <input className='w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600'
                                type="text"
                                {...register('registroMilitar')}
                            />
                        </label>

                        <label className='flex flex-col justify-center items-center gap-1 w-full pb-4'>
                            <span>SENHA</span>
                            <input className='w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-600'
                                type="password"
                                {...register('senha')}
                            />
                        </label>

                        <button onClick={handleSubmit(fazerLogin)} className='w-full m-1 p-2 border-2 border-gray-300 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 active:bg-green-900'>ENTRAR</button>

                        <Link to={'/register'} className='flex flex-col justify-center items-center gap-3 w-full p-4 bg-white rounded-md'>

                            <p>Não possui uma conta?</p>
                            <button className='w-full m-1 p-2 border-2 border-gray-300 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 active:bg-green-900'>CADASTRAR-SE</button>
                            
                        </Link>
                    </form>

                </section>




            </main>
        </ div>
    )
}
