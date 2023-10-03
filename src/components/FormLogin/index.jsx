import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'

export default function FormLogin(props) {

    const setPagina = props.setPagina
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        titulo: '',
        mensagem: ''
    })

    const { register, handleSubmit } = useForm()

    async function fazerLogin(data) {
        if (data.registroMilitar.length < 1) {
            setDados({
                titulo: 'Erro',
                mensagem: 'O registro militar deve ser preenchido'
            })
            setOpen(true)
            return
        }

        if (data.senha.length < 1) {
            setDados({
                titulo: 'Erro',
                mensagem: 'A senha deve ser preenchida'
            })

            setOpen(true)
            return
        }

        const response = await fetch(HOST + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataResponse = await response.json()

        if (!response.ok) {
            setDados({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })
            setOpen(true)
            return
        }

        localStorage.setItem('token', dataResponse.token)
        navigate('/home')
    }

    return (
        <>
            <ModalResposta modal={open} setModal={setOpen} mensagem={dados.mensagem} titulo={dados.titulo} />

            <form onSubmit={handleSubmit(fazerLogin)}
                className='h-full w-5/12 flex bg-white flex-col justify-center items-center gap-4 px-4'
            >
                <h1 className='text-4xl font-bold text-gray-900'>Login</h1>

                <input type="text" {...register('registroMilitar')} placeholder='Registro Militar' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <input type="password" {...register('senha')} placeholder='Senha' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <button className='w-full h-12 bg-gray-900 text-white rounded-lg'>Entrar</button>

                <div className='text-gray-900 cursor-pointer' onClick={() => {
                    console.log('click')
                    setPagina('Registro')
                }}>Não tenho cadastro</div>

            </form>

        </>
    )
}
