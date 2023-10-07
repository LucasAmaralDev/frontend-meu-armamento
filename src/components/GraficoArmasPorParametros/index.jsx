import React, { useEffect, useState } from 'react'
import HOST from '../../services/host'
import ReactApexChart from 'react-apexcharts'

export default function GraficoArmasPorParametros() {

    const [armasPorTipo, setArmasPorTipo] = useState([])
    const [chartArmasPorTipo, setChartArmasPorTipo] = useState([{}])

    async function buscarArmasPorTipo() {
        const response = await fetch(HOST + 'dashboards/armas/tipo', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setArmasPorTipo(dataResponse)
            setChartArmasPorTipo({
                options: {
                    chart: {
                        id: 'basic-bar'
                    },
                    xaxis: {
                        categories: dataResponse.map((element) => {
                            return element.tipo
                        })
                    }
                },
                series: [{
                    name: "quantidade",
                    data: dataResponse.map((element) => element.total)
                }]
            })
        }

    }

    useEffect(() => {
        buscarArmasPorTipo()
    }, [])


    const [armasPorEstadoConservacao, setArmasPorEstadoConservacao] = useState([])
    const [chartArmasPorEstadoConservacao, setChartArmasPorEstadoConservacao] = useState([{}])

    async function buscarArmasPorEstadoConservacao() {
        const response = await fetch(HOST + 'dashboards/armas/estado-conservacao', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setArmasPorEstadoConservacao(dataResponse)
            setChartArmasPorEstadoConservacao({
                options: {
                    chart: {
                        id: 'basic-bar'
                    },
                    xaxis: {
                        categories: dataResponse.map((element) => {
                            return element.estadoConservacao
                        })
                    }
                },
                series: [{
                    name: "quantidade",
                    data: dataResponse.map((element) => element.total)
                }]
            })
        }

    }

    useEffect(() => {
        buscarArmasPorEstadoConservacao()
    }, [])


    return (
        <>

            {

                armasPorTipo.length > 0 &&

                <>

                    <div className="flex items-center flex-col gap-8 py-8 w-full max-lg:hidden">

                        <h3 className='text-3xl'> Armas por Tipo</h3>

                        <ReactApexChart
                            options={chartArmasPorTipo.options}
                            series={chartArmasPorTipo.series}
                            type="bar"
                            width="700"
                        />
                    </div>

                    <div className="flex items-center flex-col gap-8 py-8 h-full justify-center w-full lg:hidden">

                        <h3 className='text-2xl text-center'> Armas por Tipo</h3>

                        <ReactApexChart
                            options={chartArmasPorTipo.options}
                            series={chartArmasPorTipo.series}
                            type="bar"
                            width="450"
                        />
                    </div>

                </>




            }


            {

                armasPorEstadoConservacao.length > 0 &&
                <>

                    <div className="flex items-center flex-col gap-8 py-8 w-full max-lg:hidden">

                        <h3 className='text-3xl'> Armas por Estado de Conservação</h3>

                        <ReactApexChart
                            options={chartArmasPorEstadoConservacao.options}
                            series={chartArmasPorEstadoConservacao.series}
                            type="bar"
                            width="700"
                        />
                    </div>

                    <div className="flex items-center flex-col gap-8 py-8 w-full lg:hidden">

                        <h3 className='text-2xl text-center'> Armas por Estado de Conservação</h3>

                        <ReactApexChart
                            options={chartArmasPorEstadoConservacao.options}
                            series={chartArmasPorEstadoConservacao.series}
                            type="bar"
                            width="400"
                        />
                    </div>

                </>



            }

        </>
    )
}
