import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToasterContext } from '../../../Context/ToasterContext'
import EscopoAdmin from '../../../components/EscopoAdmin'
import ModalFabricantes from '../../../components/ModalFabricantes'
import HOST from '../../../services/host'
import { cssButtonConfirm, cssInput, cssSelect } from '../../../services/utils'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

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
    }

    useEffect(() => {
        getFabricantes()
    }, [])

    function retornarParaPaginaAnterior() {
        window.location.href = '/armas'
    }

    async function formularioNovaArma(data) {
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

            <div className='w-full h-full flex flex- px-2 gap-6 overflow-auto max-lg:h-auto'>

                <form
                    onSubmit={handleSubmit(formularioNovaArma)}
                    className='w-full h-full flex flex-col items-center gap-2 py-4'>

                    <TextField id="outlined-basic" label="Numero de Serie" variant="outlined" className='w-2/5 h-16' {...register('numeroSerie')} />

                    <div className='w-2/5 relative'>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Fabricante</InputLabel>
                            <Select
                                label="Fabricante"
                                {...register('fabricante')}

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

                    <TextField label="Modelo" variant="outlined" className='w-2/5 h-16' {...register('modelo')} />

                    <TextField label="Calibre" variant="outlined" className='w-2/5 h-16' {...register('calibre')} />

                    <TextField label="Capacidade do Carregador" variant="outlined" className='w-2/5 h-16' {...register('capacidadeCarregador')} />

                    <div className='w-2/5 relative'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estado de Conservação</InputLabel>
                            <Select label="Estado de Conservação" {...register('estadoConservacao')} >
                                <MenuItem value="NOVO">Novo</MenuItem>
                                <MenuItem value="EXCELENTE">Excelente</MenuItem>
                                <MenuItem value="BOM">Bom</MenuItem>
                                <MenuItem value="REGULAR">Regular</MenuItem>
                                <MenuItem value="BAIXADA">Baixada</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='w-2/5 relative'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select label="Tipo" {...register('tipo')} >
                                <MenuItem value="1">Pistola</MenuItem>
                                <MenuItem value="2">Revolver</MenuItem>
                                <MenuItem value="3">Espingarda</MenuItem>
                                <MenuItem value="4">Fuzil</MenuItem>
                                <MenuItem value="5">Submetralhadora</MenuItem>
                                <MenuItem value="6">Carabina</MenuItem>
                                <MenuItem value="7">Escopeta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <TextField label="Ano de Fabricação" variant="outlined" className='w-2/5 h-16' {...register('anoFabricacao')} />

                    <Button variant="contained" className='w-2/5' color='success' type='submit' >Cadastrar</Button>

                    <p className='text-xs opacity-0'>a</p>
                </form>
            </div>
        </EscopoAdmin>
    )
}
