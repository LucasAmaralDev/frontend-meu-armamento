import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { ToasterContext } from '../../Context/ToasterContext'

export default function FormRegistro(props) {

    const { toast } = useContext(ToasterContext)

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        titulo: '',
        mensagem: ''
    })
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm()

    async function cadastrar(data) {
        const registerToast = toast.loading('Efetuando Cadastro...');

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


        const response = await fetch(HOST + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataResponse = await response.json()

        if (!response.ok) {
            toast.error(dataResponse.error, {
                id: registerToast,
            });
            return

        }

        localStorage.setItem('token', dataResponse.token)
        navigate('/home')
        toast.success('Bem-Vindo ao Gestão de Armas', {
            id: registerToast,
        });
    }

    return (
        <>

            <form onSubmit={handleSubmit(cadastrar)}
                className='h-full w-5/12 flex bg-white flex-col justify-center items-center gap-4 px-4 max-lg:w-full'
            >
                <h1 className='text-4xl font-bold text-gray-900'>Registro</h1>

                <TextField id="outlined-basic" label="Registro Militar" variant="outlined" {...register('registroMilitar')} className='w-full' />

                <TextField id="outlined-basic" label="Nome" variant="outlined" {...register('nome')} className='w-full' />

                <TextField id="outlined-basic" label="Email" type='email' variant="outlined" {...register('email')} className='w-full' />

                <TextField id="outlined-basic" label="Senha" type='password' variant="outlined" {...register('senha')} className='w-full' />

                <TextField id="outlined-basic" label="Confirmar Senha" type='password' variant="outlined" {...register('confirmarSenha')} className='w-full' />

                <Button variant="contained" className='w-full h-12 bg-gray-900 text-white rounded-lg' color='success' type='submit' >Cadastrar</Button>


                <div className='text-gray-900 cursor-pointer' onClick={() => props.setPagina('Login')}>Já possuo uma conta</div>

            </form>

        </>
    )
}
