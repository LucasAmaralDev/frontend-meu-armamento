import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'

export default function Armeiros() {

    const infoPaginacao = {
        itens_por_pagina: 8,
    }

    const [armeiros, setRegistros] = useState([])
    const [pagina, setPagina] = useState(1)

    async function carregarRegistros() {

        const response = await fetch(HOST + 'armeiro/find', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dados = await response.json()

        setRegistros(dados)

    }

    useEffect(() => {
        carregarRegistros()
    }, [])









    


    return (
        <>
            <EscopoAdmin titulo="Armeiros">

                <div className="w-full h-full overflow-y-auto max-lg:overflow-x-scroll p-4 max-lg:px-1">


                    {/* PARTE DA TABELA */}
                    <section className='w-full flex justify-center items-center flex-col p-2 gap-2 mb-1 max-lg:mb-24 max-lg:px-0 max-lg:flex-col-reverse'>
                        <div className='max-lg:hidden px-2'>
                            <h1 className='text-4xl max-lg:text-2xl'>ARMEIROS CADASTRADOS</h1>
                        </div>
                       

                        <div className='w-full flex justify-center items-center flex-col gap-2 max-lg:gap-6 max-lg:items-start'>
                            <table className='w-full rounded-md shadow-md'>
                                <thead className='bg-green-500 text-white text-2xl'>
                                    <tr>
                                        <th className='p-2 max-lg:hidden'>ID</th>
                                        <th className='p-2'>Registro Militar</th>
                                        <th className='p-2'>Nome</th>
                                        <th className='p-2 max-lg:hidden'>Email</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 text-center text-xl '>
                                    {
                                        armeiros.length > 0 ? armeiros.map((armeiro, index) => {
                                            if (index >= (pagina - 1) * infoPaginacao.itens_por_pagina && index < pagina * infoPaginacao.itens_por_pagina) {
                                                return (
                                                    <tr key={armeiro.id}>
                                                        <td className='py-2 max-lg:hidden'>{armeiro.id}</td>
                                                        <td className='py-2 whitespace-nowrap  max-lg:px-2'>{armeiro.registroMilitar}</td>
                                                        <td className='py-2 whitespace-nowrap  max-lg:px-2'>{armeiro.nome}</td>
                                                        <td className='py-2 whitespace-nowrap  max-lg:hidden'>{
                                                        armeiro.email
                                                        ? armeiro.email
                                                        : 'Nenhum email cadastrado'
                                                        }</td>
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
                                    armeiros.length > infoPaginacao.itens_por_pagina ?

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
                                                        <p>{pagina} de {Math.ceil(armeiros.length / infoPaginacao.itens_por_pagina)}</p>

                                                        <button
                                                            onClick={
                                                                () => {
                                                                    if (pagina < Math.ceil(armeiros.length / infoPaginacao.itens_por_pagina)) {
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
