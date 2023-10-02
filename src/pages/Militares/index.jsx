import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import BotaoAcoesMilitares from '../../components/BotaoAcoesMilitares'

export default function Militares() {

    const infoPaginacao = {
        itens_por_pagina: 8,
    }

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
            console.log(dados)
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
            console.log(listaDeMilitares)
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
                <div className="w-full h-full overflow-y-auto max-lg:overflow-x-scroll p-4 max-lg:px-1">

                    {/* PARTE DOS FILTROS */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 max-lg:gap-6'>


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
                                <label htmlFor='nome' className='text-2xl'>Nome</label>

                                <input
                                    type='text'
                                    id='nome'
                                    placeholder='Insira o Nome'
                                    className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                    value={filtro.nome}
                                    onChange={(e) => {
                                        setFiltro({
                                            ...filtro,
                                            nome: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>
                                <label htmlFor='batalhao' className='text-2xl'>Batalhão</label>

                                <input
                                    type='text'
                                    id='batalhao'
                                    placeholder='Insira o Batalhão'
                                    className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                    value={filtro.batalhao}
                                    onChange={(e) => {
                                        setFiltro({
                                            ...filtro,
                                            batalhao: e.target.value
                                        })
                                    }}
                                />

                            </div>


                        </div>




                    </section>




                    {/* PARTE DA TABELA */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 mb-1 max-lg:mb-24 max-lg:px-0 max-lg:flex-col-reverse'>
                        <div className='max-lg:hidden'>
                            <h1 className='text-4xl max-lg:text-2xl'>MILITARES</h1>
                        </div>
                        <div>
                            <button
                                className='w-80 h-16 rounded-md bg-green-500 text-white text-2xl focus:outline-none hover:bg-green-600 my-2'
                                onClick={() => {
                                    window.location.href = '/militares/cadastrar'
                                }}
                            >
                                Cadastrar Novo Militar
                            </button>
                        </div>

                        <div className='w-full flex justify-center items-center flex-col gap-2 max-lg:gap-6 max-lg:items-start'>
                            <table className='w-full rounded-md shadow-md'>
                                <thead className='bg-green-500 text-white text-2xl'>
                                    <tr>
                                        <th className='p-2'>Registro Militar</th>
                                        <th className='p-2'>Nome</th>
                                        <th className='p-2 max-lg:hidden'>Batalhão</th>
                                        <th className='p-2'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 text-center text-xl'>
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
