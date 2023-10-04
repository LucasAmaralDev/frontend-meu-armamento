import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToasterContext } from '../../../Context/ToasterContext'
import EscopoAdmin from '../../../components/EscopoAdmin'
import ModalBatalhoes from '../../../components/ModaBatalhaoes'
import HOST from '../../../services/host'
import { cssButtonConfirm, cssInput } from '../../../services/utils'

export default function CadastrarMilitar() {

    const { toast } = useContext(ToasterContext)
    const navigate = useNavigate()
    const [batalhoes, setBatalhoes] = useState([])

    async function getBatalhoes() {
        const response = await fetch(HOST + 'batalhao', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        )
        const dataResponse = await response.json()
        if (response.ok) {
            setBatalhoes(dataResponse)
        }
    }

    useEffect(() => {
        getBatalhoes()
    }, [])



    async function formularioNovoMilitar(data) {
        const tratamento = {
            ...data
        }
        const toastNovoMilitar = toast.loading('Cadastrando militar...')
        const response = await fetch(HOST + 'militares/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors'
            ,
            body: JSON.stringify(tratamento)
        })

        const dataResponse = await response.json()

        if (response.ok) {
            toast.success(dataResponse.nome + " cadastrado com sucesso",{
                id: toastNovoMilitar
            })
            navigate('/militares')
        }

        else {
            toast.error(dataResponse.error, {
                id: toastNovoMilitar
            })
        }


    }

    const { register, handleSubmit } = useForm()

    return (
        <EscopoAdmin titulo="CADASTRAR MILITAR">


            <div className='w-full h-full flex flex-col justify-center items-center py-4 px-2 gap-6 overflow-x-scroll max-lg:overflow-x-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>Cadastrar  Militar</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovoMilitar)}
                    className='w-full h-full flex flex-col justify-center items-center gap-10'>

                    <input type="text" {
                        ...register('registroMilitar')
                    } placeholder='Registro Militar' className={cssInput} />

                    <input type="text" {
                        ...register('nome')
                    } placeholder='Nome' className={cssInput} />


                    <div className='w-full flex flex-col items-center gap-2'>
                        <select type="text" {
                            ...register('batalhao')
                        } placeholder='Batalhão' className={cssInput}>
                            <option value="">Selecione um Batalhão</option>
                            {
                                batalhoes.map((batalhao, index) => {
                                    return (
                                        <option key={index} value={batalhao.id}>{batalhao.nome}</option>
                                    )
                                })
                            }
                        </select>
                        <ModalBatalhoes batalhoes={batalhoes} getBatalhoes={getBatalhoes} />

                    </div>

                    <button {
                        ...register('cadastrar')
                    } type='submit' className={cssButtonConfirm} >Cadastrar</button>
                </form>
            </div>
        </EscopoAdmin>
    )
}
