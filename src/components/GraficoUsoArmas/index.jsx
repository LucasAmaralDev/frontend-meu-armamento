import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

export default function GraficoUsoArmas(props) {

    useEffect(() => {
        if (Object.keys(props.dados).length > 0) {
            setDataDashboard([
                { item: 'Armas Disponiveis', valor: props.dados.quantidadeArmasDisponiveis },
                { item: 'Armas em Uso', valor: props.dados.armasAcauteladas },
                { item: 'Armas Baixadas', valor: (props.dados.quantidadeArmas - props.dados.quantidadeArmasDisponiveis - props.dados.armasAcauteladas) }
            ])
        }

    }, [props.dados])

    const [dataDashboard, setDataDashboard] = useState([
    ]);

    const donutChartData = {
        options: {
            labels: dataDashboard.map((element) => element.item),
            legend: {
                fontSize: '16px', // Defina o tamanho da fonte desejado, por exemplo, '16px'
            },
        },
        series: dataDashboard.map((element) => element.valor),
    };

    return (
        <>

            <div className="flex items-center flex-col gap-8 py-8 w-full max-lg:hidden">

                <h3 className='text-3xl'> Arsenal de Armas</h3>
                <div>
                    <ReactApexChart
                        options={donutChartData.options}
                        series={donutChartData.series}
                        type="donut"
                        width="600"
                    />
                </div>
            </div>

            <div className="flex items-center flex-col gap-8 py-8 w-full justify-center h-full lg:hidden">

                <h3 className='text-3xl'> Arsenal de Armas</h3>
                <div>
                    <ReactApexChart
                        options={donutChartData.options}
                        series={donutChartData.series}
                        type="donut"
                        width="450"
                    />
                </div>
            </div>

        </>
    )
}
