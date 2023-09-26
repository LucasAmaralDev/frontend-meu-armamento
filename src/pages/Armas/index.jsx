import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import BotaoAcoes from '../../components/BotaoAcoesArma'

/**
 * 
 * Informações sobre a página de Armas
 * 
 * 1 - A página de Armas deve conter um filtro para que o usuário possa filtrar as armas cadastradas
 * 2 - A página de Armas deve conter uma tabela com as armas cadastradas
 * 3 - A página de Armas deve conter um botão para cadastrar uma nova arma
 * 4 - A página de Armas deve conter um botão para editar cada arma que aparecer na tabela
 * 5 - A página de Armas deve conter um botão para excluir cada arma que aparecer na tabela
 * 6 - A página de Armas deve conter um botão para visualizar cada arma que aparecer na tabela
 * 
 *  Dados que vem da api de armas
 * 
 *  {
 *    id,
 *   anoFabricacao,
 *  calibre,
 * capacidadeCarregador,
 * dataCadastro,
 * estadoConservacao,
 * fabricante,
 * modelo,
 * numeroSerie,
 * armeiro.nome,
 * }
 */

export default function Armas() {

    const infoPaginacao = {
        itens_por_pagina: 8,
    }

    const [armas, setArmas] = useState([])
    const [pagina, setPagina] = useState(1)
    const [armasfiltradas, setArmasFiltradas] = useState([])
    const [filtro, setFiltro] = useState({
        modelo: '',
        fabricante: '',
        anoDeFabricacao: NaN,
        estadoConservacao: '',
    })  

    async function carregarArmas() {

        const response = await fetch(HOST + 'arma/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dados = await response.json()

        console.log(dados)
        setArmas(dados)

    }

    useEffect(() => {
        carregarArmas()
    }, [])









    // Effect que controla os filtros
    useEffect(() => {

        // Lista de Armas Filtradas Caso algum Filtro Seja Aplicado
        const listaDeArmas = []

        // Caso nao haja nenhum filtro aplicado, a lista de armas filtradas recebe todas as armas
        if (filtro.modelo.length < 1 && filtro.fabricante.length < 1 && filtro.anoDeFabricacao.length < 1 && filtro.estadoConservacao.length < 1) {
            setArmasFiltradas(armas)
            return
        }

        // Caso haja algum filtro aplicado, a lista de armas filtradas recebe apenas as armas que passarem pelo filtro
        armas.forEach(arma => {

            if (filtro.modelo && !arma.modelo.toUpperCase().includes(filtro.modelo.toUpperCase())) {
                return
            }

            if (filtro.fabricante && !arma.fabricante.toUpperCase().includes(filtro.fabricante.toUpperCase())) {
                return
            }

            if (filtro.anoDeFabricacao.length > 0 && arma.anoFabricacao != filtro.anoDeFabricacao) {
                return
            }

            if (filtro.estadoConservacao && !arma.estadoConservacao.includes(filtro.estadoConservacao.toUpperCase())) {
                return
            }

            listaDeArmas.push(arma)
        })

        setArmasFiltradas(listaDeArmas)
        setPagina(1)
        
    }, [filtro, armas])


    return (
        <>
            <EscopoAdmin titulo='ARMAS'>

                {/* CONTAINER DA PAGINA DE ARMAS */}
                <div className="w-full h-full overflow-y-auto max-lg:overflow-x-scroll p-4 max-lg:px-1">

                    {/* PARTE DOS FILTROS */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 max-lg:gap-6'>



                        <div className='flex max-lg:flex-col max-lg:gap-4 w-full lg:justify-around lg:h-40 lg:items-center shadow-sm rounded-md'
                        >

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:w-full'
                            >
                                <label htmlFor='modelo' className='text-2xl'>Modelo</label>

                                <input
                                    type='text'
                                    id='modelo'
                                    placeholder='Insira o Modelo'
                                    className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                    value={filtro.modelo}
                                    onChange={(e) => {
                                        setFiltro({
                                            ...filtro,
                                            modelo: e.target.value
                                        })
                                    }}
                                />
                            </div>

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>
                                <label htmlFor='fabricante' className='text-2xl'>Fabricante</label>
                                
                                <input 
                                type='text' 
                                id='fabricante' 
                                placeholder='Insira o Fabricante' 
                                className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl' 
                                value={filtro.fabricante}
                                onChange={(e) => {
                                    setFiltro({
                                        ...filtro,
                                        fabricante: e.target.value
                                    })
                                }}
                                />
                            </div>

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:hidden'>
                                <label htmlFor='anoDeFabricacao' className='text-2xl'>Ano de Fabricação</label>
                                
                                <input 
                                type='number' 
                                id='anoDeFabricacao' 
                                placeholder='Insira o Ano de Fabricação' 
                                className='w-full px-2 py-1 text-center rounded-md border-2 border-gray-400 focus:border-blue-500 focus:outline-none text-xl'
                                value={filtro.anoDeFabricacao}
                                onChange={(e) => {
                                    setFiltro({
                                        ...filtro,
                                        anoDeFabricacao: e.target.value
                                    })
                                }}
                                />
                            
                            </div>

                            <div
                                className='flex flex-col justify-around items-center w-1/5 h-full max-lg:w-full'>
                                <label htmlFor='estadoConservacao' className='text-2xl'>Estado de Conservação</label>
                                
                                <select 
                                name="estadoConservacao" 
                                id="estadoConservacao" 
                                className='w-full px-2 py-1 rounded-md border-2 text-center border-gray-400 focus:border-blue-500 focus:outline-none text-xl
                                '
                                value={filtro.estadoConservacao}
                                onChange={(e) => {
                                    setFiltro({
                                        ...filtro,
                                        estadoConservacao: e.target.value
                                    })
                                }}
                                >
                                    <option value="">Selecione</option>
                                    <option value="NOVO">Novo</option>
                                    <option value="EXELENTE">Exelente</option>
                                    <option value="BOM">Bom</option>
                                    <option value="REGULAR">Regular</option>
                                    <option value="BAIXADA">Baixada</option>
                                </select>
                            </div>
                        </div>




                    </section>

                    


                    {/* PARTE DA TABELA */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 mb-1 max-lg:mb-24 max-lg:px-0 max-lg:flex-col-reverse'>
                        <div className='max-lg:hidden'>
                            <h1 className='text-4xl max-lg:text-2xl'>ARMAS</h1>
                        </div>
                        <div>
                            <button
                                className='w-80 h-16 rounded-md bg-green-500 text-white text-2xl focus:outline-none hover:bg-green-600 my-2'
                                onClick={() => {
                                    window.location.href = '/armas/cadastrar'
                                }}
                            >
                                Cadastrar Nova Arma
                            </button>
                        </div>

                        <div className='w-full flex justify-center items-center flex-col gap-2 max-lg:gap-6 max-lg:items-start'>
                            <table className='w-full rounded-md shadow-md'>
                                <thead className='bg-green-500 text-white text-2xl'>
                                    <tr>
                                        <th className='p-2'>Numero de Série</th>
                                        <th className='p-2'>Modelo</th>
                                        <th className='p-2 max-lg:hidden'>Fabricante</th>
                                        <th className='p-2 max-lg:hidden'>Ano de Fabricação</th>
                                        <th className='p-2 max-lg:hidden'>Estado de Conservação</th>
                                        <th className='p-2'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 text-center text-xl'>
                                    {
                                        armasfiltradas.length > 0 ? armasfiltradas.map((arma, index) => {
                                            if(index >= (pagina - 1) * infoPaginacao.itens_por_pagina && index < pagina * infoPaginacao.itens_por_pagina){
                                                return (
                                                    <tr key={arma.id}>
                                                        <td className='py-2'>{arma.numeroSerie}</td>
                                                        <td className='py-2'>{arma.modelo}</td>
                                                        <td className='py-2 max-lg:hidden'>{arma.fabricante}</td>
                                                        <td className='py-2 max-lg:hidden'>{arma.anoFabricacao}</td>
                                                        <td className='py-2 max-lg:hidden'>{arma.estadoConservacao}</td>
                                                        <td className='py-2'>
                                                            <BotaoAcoes arma={arma} atualizarDados={carregarArmas} />
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
                                    armasfiltradas.length > infoPaginacao.itens_por_pagina  ?

                                    <tfoot className='bg-green-500 text-white text-2xl w-full'>

                                    <tr>

                                        <td className='py-2' colSpan='6'>

                                            <div className='w-full flex justify-center items-center gap-2'>
                                                
                                                <button
                                                onClick={() => {
                                                    if(pagina > 1){
                                                        setPagina(pagina - 1)
                                                    }
                                                }}

                                                >{'<<'}</button>
                                                <p>{pagina} de { Math.ceil(armasfiltradas.length / infoPaginacao.itens_por_pagina)}</p>
                                                
                                                <button
                                                onClick={
                                                    () => {
                                                        if(pagina < Math.ceil(armasfiltradas.length / infoPaginacao.itens_por_pagina)){
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
