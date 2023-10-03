import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'
import { useNavigate } from 'react-router-dom'

export default function FormRegistro(props) {
    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        titulo: '',
        mensagem: ''
    })
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    async function cadastrar(data) {

        if (data.senha != data.confirmarSenha) {
            setDados({
                titulo: 'Senhas não conferem',
                mensagem: 'Suas senhas não correspondem!'
            })
            setOpen(true)
            return
        }

        if (data.senha.length < 6) {
            setDados({
                titulo: "Senha Insegura",
                mensagem: "A senha deve conter ao menos 6 digitos"
            })
            setOpen(true)
            return
        }

        console.log(data)

        const response = await fetch(HOST + 'signup', {
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

            <form onSubmit={handleSubmit(cadastrar)}
                className='h-full w-5/12 flex bg-white flex-col justify-center items-center gap-4 px-4'
            >
                <h1 className='text-4xl font-bold text-gray-900'>Registro</h1>

                <input type="text" {...register('registroMilitar')} placeholder='Registro Militar' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <input type="text" {...register('nome')} placeholder='Nome' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <input type="email" {...register('email')} placeholder='Email' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <input type="password" {...register('senha')} placeholder='Senha' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <input type='password' {...register('confirmarSenha')} placeholder='ConfirmarSenha' className='w-full h-12 border border-gray-300 rounded-lg px-4' />

                <button className='w-full h-12 bg-gray-900 text-white rounded-lg'>Cadastrar</button>

                <div className='text-gray-900 cursor-pointer' onClick={() => props.setPagina('Login')}>Já possuo uma conta</div>

            </form>

        </>
    )
}
