import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToasterContext } from '../../../Context/ToasterContext'
import EscopoAdmin from '../../../components/EscopoAdmin'
import ModalFabricantes from '../../../components/ModalFabricantes'
import HOST from '../../../services/host'
import { cssButtonConfirm, cssInput, cssSelect } from '../../../services/utils'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

export default function CadastrarArma() {
    const { toast } = useContext(ToasterContext)

    const navigate = useNavigate()
    const [fabricantes, setFabricantes] = useState([])

    async function getFabricantes() {
        const response = await fetch(HOST + 'fabricante', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        const dataResponse = await response.json()
        if (response.ok) {
            setFabricantes(dataResponse)
        }
        console.log(dataResponse)
    }

    useEffect(() => {
        getFabricantes()
    }, [])

    function retornarParaPaginaAnterior() {
        window.location.href = '/armas'
    }

    async function formularioNovaArma(data) {
        console.log(data)
        const toastArma = toast.loading('Cadastrando arma...');
        const tratamento = {
            ...data,
            capacidadeCarregador: parseInt(data.capacidadeCarregador),
            anoFabricacao: parseInt(data.anoFabricacao)
        }

        if (data.capacidadeCarregador < 1) {
            toast.error('A capacidade do carregador deve ser maior que 0', {
                id: toastArma,
            });
            return
        }

        if (data.capacidadeCarregador > 100) {
            toast.error('A capacidade do carregador deve ser menor que 100', {
                id: toastArma,
            });
            return
        }

        if (data.anoFabricacao < 1990) {
            toast.error('O ano de fabricação deve ser maior que 1990', {
                id: toastArma,
            });
            return
        }



        const response = await fetch(HOST + 'arma/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
            body: JSON.stringify(tratamento)
        })

        const dataResponse = await response.json()

        console.log(response)
        console.log(dataResponse)

        if (response.ok) {
            toast.success(dataResponse.message, {
                id: toastArma,
            });
            navigate('/armas')
        }

        else {
            toast.error(dataResponse.error, {
                id: toastArma,
            });
        }


    }

    const { register, handleSubmit } = useForm()

    return (
        <EscopoAdmin titulo="CADASTRAR ARMA">

            <div className='w-full h-full flex flex-col items-center py-4 px-2 gap-6 overflow-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>Cadastrar Arma</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovaArma)}
                    className='w-full h-full flex flex-col justify-center items-center gap-4'>

                    <TextField id="outlined-basic" label="Numero de Serie" variant="outlined" className='w-2/5 h-16' {...register('numeroSerie')} />

                    <div className='w-2/5 relative'>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Fabricante</InputLabel>
                            <Select
                                label="Fabricante"
                                {...register('fabricantes')}

                            >
                                {
                                    fabricantes.map((fabricante, index) => {
                                        return (
                                            <MenuItem key={index} value={fabricante.id}>{fabricante.nome}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <ModalFabricantes fabricantes={fabricantes} getFabricantes={getFabricantes} />
                    </div>

                    <input type="text" {
                        ...register('modelo')
                    } placeholder='Modelo' className={cssInput} />

                    <input type="text" {
                        ...register('calibre')
                    } placeholder='Calibre' className={cssInput} />

                    <input type='number' {
                        ...register('capacidadeCarregador')
                    } placeholder='Capacidade do Carregador' className={cssInput} />

                    <select {
                        ...register('estadoConservacao')
                    } className={cssSelect}>
                        <option value="">Selecione o Estado de Conservação</option>
                        <option value="NOVO">Novo</option>
                        <option value="EXCELENTE">Excelente</option>
                        <option value="BOM">Bom</option>
                        <option value="REGULAR">Regular</option>
                        <option value="BAIXADA">Baixada</option>
                    </select>

                    <select {
                        ...register('tipo')
                    } className={cssSelect}>
                        <option value="">Selecione o Tipo</option>
                        <option value="1">Pistola</option>
                        <option value="2">Revolver</option>
                        <option value="3">Espingarda</option>
                        <option value="4">Fuzil</option>
                        <option value="5">Submetralhadora</option>
                        <option value="6">Carabina</option>
                        <option value="7">Escopeta</option>
                    </select>

                    <input {
                        ...register('anoFabricacao')
                    } type="number" placeholder='Ano de Fabricação' className={cssInput} />

                    <button {
                        ...register('cadastrar')
                    } type='submit' className={cssButtonConfirm}>Cadastrar</button>
                </form>
            </div>
        </EscopoAdmin>
    )
}
