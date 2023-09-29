import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../components/EscopoAdmin'
import HOST from '../../services/host'
import CardDashboard from '../../components/CardDashboard'
import ReactApexChart from 'react-apexcharts';

export default function Home() {

    const [dados, setDados] = useState({})

    useEffect(() => {
        console.log(dados)
        if (Object.keys(dados).length > 0){
            setDataDashboard([
                {item: 'Armas Disponiveis', valor: dados.quantidadeArmasDisponiveis},
                {item: 'Armas em Uso', valor: dados.armasAcauteladas},
                {item: 'Armas Baixadas', valor:(dados.quantidadeArmas - dados.quantidadeArmasDisponiveis - dados.armasAcauteladas)}
            ])
        }

    }, [dados])

    const [dataDashboard, setDataDashboard] = useState([
    ]);

    const donutChartData = {
        options: {
            labels: dataDashboard.map((element) => element.item),
        },
        series: dataDashboard.map((element) => element.valor),
    };

    async function carregarInformacoes() {

        const response = await fetch(HOST + 'dashboards/relatorios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if (!response.ok) {
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
                    className='w-full h-full overflow-auto flex flex-wrap justify-around items-center gap-6 py-4'
                >

                    {/* Implementando teste */}
                <div className="flex items-center flex-col py-8 w-full max-lg:hidden">
                    
                    <h3 className='text-3xl'> Informativo de armas</h3>

                    <ReactApexChart
                        options={donutChartData.options}
                        series={donutChartData.series}
                        type="donut"
                        width="380"
                    />
                </div>


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
