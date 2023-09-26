import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import BotaoAcoesRegistro from '../../components/BotaoAcoesRegistro'

export default function Registros() {

    const infoPaginacao = {
        itens_por_pagina: 8,
    }

    const [registros, setRegistros] = useState([])
    const [pagina, setPagina] = useState(1)
    const [registrosFiltrados, setRegistrosFiltrados] = useState([])
    const [filtro, setFiltro] = useState({
        registroMilitar: '',
        numeroSerie: ''
    })

    async function carregarRegistros() {

        const response = await fetch(HOST + 'acautelamento/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dados = await response.json()

        if (response.ok) {
            setRegistros(dados)
            setRegistrosFiltrados(dados)
        }
        else {
            localStorage.clear()
            window.location.href = '/login'
        }

    }

    useEffect(() => {
        carregarRegistros()
    }, [])









    // Effect que controla os filtros
    useEffect(() => {

        // Lista de Registro Cadastrados Caso algum Filtro Seja Aplicado
        const listaDeMilitares = []

        // Caso nao haja nenhum filtro aplicado, a lista de registros Filtrados recebe todas as armas
        if (filtro.registroMilitar.length < 1 && filtro.numeroSerie.length < 1) {
            setRegistrosFiltrados(registros)
            console.log(listaDeMilitares)
            return
        }

        // Caso haja algum filtro aplicado, a lista de registros Filtrados recebe apenas as armas que passarem pelo filtro
        registros.forEach(registro => {

            if (filtro.registroMilitar && !registro.militar.registroMilitar.toUpperCase().includes(filtro.registroMilitar.toUpperCase())) {
                return
            }

            if (filtro.numeroSerie && !registro.arma.numeroSerie.toUpperCase().includes(filtro.numeroSerie.toUpperCase())) {
                return
            }

            listaDeMilitares.push(registro)
        })

        setRegistrosFiltrados(listaDeMilitares)
        setPagina(1)

    }, [filtro, registros])

    return (
        <>
            <EscopoAdmin titulo="REGISTRO">

                {/* CONTAINER DA PAGINA DE REGISTROS */}
                <div className="w-full h-full overflow-y-auto max-lg:overflow-x-scroll p-4 max-lg:px-1">

                    {/* PARTE DOS FILTROS */}
                    <section className='w-full max-lg:hidden flex justify-center items-center flex-col p-2 gap-2 max-lg:gap-6'>


                        <div className='flex max-lg:flex-col max-lg:gap-4 w-full lg:justify-around lg:h-40 lg:items-center shadow-sm rounded-md'
                        >

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:w-full'
                            >
                                <label htmlFor='registroMilitar' className='text-2xl'>Registro Militar</label>

                                <input
                                    type='text'
                                    id='registroMilitar'
                                    placeholder='Insira o Registro Militar'
                                    className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                    value={filtro.registroMilitar}
                                    onChange={(e) => {
                                        setFiltro({
                                            ...filtro,
                                            registroMilitar: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>
                                <label htmlFor='numeroSerie' className='text-2xl'>Numero de Serie</label>

                                <input
                                    type='text'
                                    id='numeroSerie'
                                    placeholder='Insira o Nome'
                                    className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                    value={filtro.numeroSerie}
                                    onChange={(e) => {
                                        setFiltro({
                                            ...filtro,
                                            numeroSerie: e.target.value
                                        })
                                    }}
                                />
                            </div>

                        </div>




                    </section>




                    {/* PARTE DA TABELA */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 mb-1 max-lg:mb-24 max-lg:px-0 max-lg:flex-col-reverse'>
                        <div className='max-lg:hidden'>
                            <h1 className='text-4xl max-lg:text-2xl'>REGISTROS</h1>
                        </div>
                        <div>
                            <button
                                className='w-80 h-16 rounded-md bg-green-500 text-white text-2xl focus:outline-none hover:bg-green-600 my-2'
                                onClick={() => {
                                    window.location.href = '/registros/cadastrar'
                                }}
                            >
                                Lançar Novo Registro
                            </button>
                        </div>

                        <div className='w-full flex justify-center items-center flex-col gap-2 max-lg:gap-6 max-lg:items-start'>
                            <table className='w-full rounded-md shadow-md'>
                                <thead className='bg-green-500 text-white text-2xl'>
                                    <tr>
                                        <th className='p-2 max-lg:hidden'>Data Registro</th>
                                        <th className='p-2 max-lg:hidden'>Registro Militar</th>
                                        <th className='p-2'>Militar</th>
                                        <th className='p-2 max-lg:hidden'>Numero de Serie</th>
                                        <th className='p-2'>Arma</th>
                                        <th className='p-2'>Data Entrega</th>
                                        <th className='p-2'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 text-center text-xl'>
                                    {
                                        registrosFiltrados.length > 0 ? registrosFiltrados.map((registro, index) => {
                                            if (index >= (pagina - 1) * infoPaginacao.itens_por_pagina && index < pagina * infoPaginacao.itens_por_pagina) {
                                                return (
                                                    <tr key={registro.id}>
                                                        <td className='py-2 max-lg:hidden'>{registro.dataAcautelamento}</td>
                                                        <td className='py-2 max-lg:hidden'>{registro.militar.registroMilitar}</td>
                                                        <td className='py-2'>{registro.militar.nome}</td>
                                                        <td className='py-2 max-lg:hidden'>{registro.arma.numeroSerie}</td>
                                                        <td className='py-2'>{registro.arma.modelo}</td>
                                                        <td className='py-2'>{registro.dataDevolucao ? registro.dataDevolucao : 'Não Entregue'}</td>
                                                        <td className='py-2'>
                                                            <BotaoAcoesRegistro registro={registro} atualizarDados={carregarRegistros} />
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
                                    registrosFiltrados.length > infoPaginacao.itens_por_pagina ?

                                        <tfoot className='bg-green-500 text-white text-2xl w-full'>

                                            <tr>

                                                <td className='py-2' colSpan='7'>

                                                    <div className='w-full flex justify-center items-center gap-2'>

                                                        <button
                                                            onClick={() => {
                                                                if (pagina > 1) {
                                                                    setPagina(pagina - 1)
                                                                }
                                                            }}

                                                        >{'<<'}</button>
                                                        <p>{pagina} de {Math.ceil(registrosFiltrados.length / infoPaginacao.itens_por_pagina)}</p>

                                                        <button
                                                            onClick={
                                                                () => {
                                                                    if (pagina < Math.ceil(registrosFiltrados.length / infoPaginacao.itens_por_pagina)) {
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
