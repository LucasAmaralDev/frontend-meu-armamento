import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import CardDashboard from '../../components/CardDashboard'

export default function Home() {

    const [dados, setDados] = useState({})

    async function carregarInformacoes() {

        const response = await fetch(HOST + 'dashboards/relatorios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if (!response.ok){
            localStorage.clear()
            window.location.href = '/'
        }

        const dados = await response.json()

        setDados(dados)

    }

    useEffect(() => {
        carregarInformacoes()
    }, [])

    return (
        <>
            <EscopoAdmin titulo="HOME">

                <section
                    className='w-full h-full overflow-auto flex flex-wrap justify-around items-center max-lg:gap-4 py-4'
                >




                    {
                        Object.keys(dados).length > 0 &&
                        <>

                            <CardDashboard titulo="Total de Armas Disponiveis" valor={dados.quantidadeArmasDisponiveis} />

                            <CardDashboard titulo="Total de Armas Acauteladas" valor={dados.armasAcauteladas} />

                            <CardDashboard titulo="Total de Armas Cadastradas" valor={dados.quantidadeArmas} />

                            <CardDashboard titulo="Total de Militares Cadastrados" valor={dados.quantidadeUsuarios} />

                            <CardDashboard titulo="Total de Armeiros Cadastrados" valor={dados.quantidadeArmeiros} />

                            <CardDashboard titulo="Total de Registros de Acautelamento" valor={dados.totalDeAcautelamentos} />
                        </>
                    }


                </section>




            </EscopoAdmin>
        </>
    )
}
