import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'
import { Button, TextField } from '@mui/material'
import { ToasterContext } from '../../Context/ToasterContext'

export default function FormLogin(props) {
    const { toast } = useContext(ToasterContext)

    const setPagina = props.setPagina
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        titulo: '',
        mensagem: ''
    })

    const { register, handleSubmit } = useForm()

    async function fazerLogin(data) {

        const toastLogin = toast.loading('Efetuando Login...');

        if (data.registroMilitar.length < 1) {
            toast.error('O registro militar deve ser preenchido', {
                id: toastLogin,
            });
            return
        }

        if (data.senha.length < 1) {
            toast.error('A senha deve ser preenchida', {
                id: toastLogin,
            });
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
            toast.error(dataResponse.error, {
                id: toastLogin,
            });
            return
        }

        localStorage.setItem('token', dataResponse.token)
        toast.success('Login Efetuado com sucesso', {
            id: toastLogin,
        });

        navigate('/home')

    }

    return (
        <>
            <ModalResposta modal={open} setModal={setOpen} mensagem={dados.mensagem} titulo={dados.titulo} />

            <form onSubmit={handleSubmit(fazerLogin)}
                className='h-full w-5/12 flex bg-white flex-col justify-center items-center gap-4 px-4 max-lg:w-full'
            >

                <h1 className='text-4xl font-bold text-gray-900'>Login</h1>

                <TextField id="outlined-basic" label="Registro Militar" variant="outlined" {...register('registroMilitar')} className='w-full' />

                <TextField id="outlined-basic" label="Senha" type='password' variant="outlined" {...register('senha')} className='w-full' />

                <Button variant="contained" className='w-full h-12 bg-gray-900 text-white rounded-lg' color='success' type='submit' >Entrar</Button>

                <div className='text-gray-900 cursor-pointer' onClick={() => {
                    setPagina('Registro')
                }}>Não tenho cadastro</div>

            </form>

        </>
    )
}
