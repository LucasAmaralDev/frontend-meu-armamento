import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import BotaoAcoesMilitares from '../../components/BotaoAcoesMilitares'
import { useNavigate } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Militares() {

    const infoPaginacao = {
        itens_por_pagina: 7,
    }

    const navigate = useNavigate()
    const [militares, setMilitares] = useState([])
    const [pagina, setPagina] = useState(1)
    const [militaresFiltrados, setMilitaresFiltrados] = useState([])
    const [filtro, setFiltro] = useState({
        registroMilitar: '',
        nome: '',
        batalhao: ''
    })

    async function carregarMilitares() {

        const response = await fetch(HOST + 'militares/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dados = await response.json()

        if (response.ok) {
            setMilitares(dados)
            setMilitaresFiltrados(dados)
        }

        else {
            localStorage.clear()
            window.location.href = '/'
        }

    }

    useEffect(() => {
        carregarMilitares()
    }, [])









    // Effect que controla os filtros
    useEffect(() => {

        // Lista de Militares Cadastrados Caso algum Filtro Seja Aplicado
        const listaDeMilitares = []

        // Caso nao haja nenhum filtro aplicado, a lista de militares Filtrados recebe todas as armas
        if (filtro.registroMilitar.length < 1 && filtro.nome.length < 1 && filtro.batalhao.length < 1) {
            setMilitaresFiltrados(militares)
            return
        }

        // Caso haja algum filtro aplicado, a lista de militares Filtrados recebe apenas as armas que passarem pelo filtro
        militares.forEach(militar => {

            if (filtro.registroMilitar && !militar.registroMilitar.toUpperCase().includes(filtro.registroMilitar.toUpperCase())) {
                return
            }

            if (filtro.nome && !militar.nome.toUpperCase().includes(filtro.nome.toUpperCase())) {
                return
            }

            if (filtro.batalhao && !militar.batalhaoMilitar.nome.includes(filtro.batalhao.toUpperCase())) {
                return
            }

            listaDeMilitares.push(militar)
        })

        setMilitaresFiltrados(listaDeMilitares)
        setPagina(1)

    }, [filtro, militares])

    return (
        <>
            <EscopoAdmin titulo="MILITARES">



                {/* CONTAINER DA PAGINA DE MILITARES */}
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3 max-lg:overflow-x-scroll bg-stone-100 p-4 max-lg:px-1">




                    <div className='w-full'>
                        <Accordion>
                            <AccordionSummary

                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >Filtros</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <section className='w-full flex justify-center items-center flex-col p-2 gap-2 max-lg:gap-6'>



                                    <div className='flex max-lg:flex-col max-lg:gap-4 w-full lg:justify-around lg:h-20  lg:items-center shadow-sm rounded-md'
                                    >

                                        <div className='flex flex-col justify-around items-center w-1/5 h-full max-lg:w-full' >


                                            <TextField id="outlined-basic" label="Registro Militar" value={filtro.registroMilitar} variant="outlined" className='w-full' onChange={(e) => {
                                                setFiltro({
                                                    ...filtro,
                                                    registroMilitar: e.target.value
                                                })
                                            }} />

                                        </div>

                                        <div
                                            className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>


                                            <TextField id="outlined-basic" label="Filtrar por Nome" variant="outlined" value={filtro.nome} className='w-full' onChange={(e) => {
                                                setFiltro({
                                                    ...filtro,
                                                    nome: e.target.value
                                                })
                                            }} />

                                        </div>

                                        <div
                                            className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>


                                            <TextField id="outlined-basic" label="Filtrar por Batalhão" variant="outlined" className='w-full' value={filtro.batalhao} onChange={(e) => {
                                                setFiltro({
                                                    ...filtro,
                                                    batalhao: e.target.value
                                                })
                                            }} />

                                        </div>


                                    </div>




                                </section>

                            </AccordionDetails>
                        </Accordion>
                    </div>



                    {/* PARTE DA TABELA */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 mb-1 max-lg:mb-24 max-lg:px-0 max-lg:flex-col-reverse'>
                        <div>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
                                navigate('/militares/cadastrar')
                            }}>Cadastrar Militar</Button>
                        </div>

                        <div className='w-full flex justify-center items-center flex-col gap-2 max-lg:gap-6 max-lg:items-start'>
                            <table className='w-full rounded-md shadow-md'>
                                <thead className='bg-green-500 text-white text-xl'>
                                    <tr>
                                        <th className='p-2'>Registro Militar</th>
                                        <th className='p-2'>Nome</th>
                                        <th className='p-2 max-lg:hidden'>Batalhão</th>
                                        <th className='p-2'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 text-center text-lg'>
                                    {
                                        militaresFiltrados.length > 0 ? militaresFiltrados.map((militar, index) => {
                                            if (index >= (pagina - 1) * infoPaginacao.itens_por_pagina && index < pagina * infoPaginacao.itens_por_pagina) {
                                                return (
                                                    <tr key={militar.id}>
                                                        <td className='py-2'>{militar.registroMilitar}</td>
                                                        <td className='py-2'>{militar.nome}</td>
                                                        <td className='py-2 max-lg:hidden'>{militar.batalhaoMilitar.nome}</td>
                                                        <td className='py-2'>
                                                            <BotaoAcoesMilitares militar={militar} atualizarDados={carregarMilitares} />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })

                                            : <tr>
                                                <td colSpan='6' className='py-2'>Não Ha Informações</td>
                                            </tr>
                                    }
                                </tbody>
                                {/* Paginação */}


                                {
                                    militaresFiltrados.length > infoPaginacao.itens_por_pagina ?

                                        <tfoot className='bg-green-500 text-white text-2xl w-full'>

                                            <tr>

                                                <td className='py-2' colSpan='6'>

                                                    <div className='w-full flex justify-center items-center gap-2'>

                                                        <button
                                                            onClick={() => {
                                                                if (pagina > 1) {
                                                                    setPagina(pagina - 1)
                                                                }
                                                            }}

                                                        >{'<<'}</button>
                                                        <p>{pagina} de {Math.ceil(militaresFiltrados.length / infoPaginacao.itens_por_pagina)}</p>

                                                        <button
                                                            onClick={
                                                                () => {
                                                                    if (pagina < Math.ceil(militaresFiltrados.length / infoPaginacao.itens_por_pagina)) {
                                                                        setPagina(pagina + 1)
                                                                    }
                                                                }
                                                            }
                                                        >{'>>'}</button>

                                                    </div>

                                                </td>

                                            </tr>

                                        </tfoot>

                                        :
                                        <></>
                                }

                            </table>
                        </div>
                    </section>

                </div>

            </EscopoAdmin>
        </>
    )
}
