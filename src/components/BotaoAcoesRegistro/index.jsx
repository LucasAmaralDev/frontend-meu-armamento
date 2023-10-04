import React, { useContext, useEffect, useRef, useState } from 'react'
import { ToasterContext } from '../../Context/ToasterContext'
import HOST from '../../services/host'

export default function BotaoAcoesRegistro(props) {

    const [open, setOpen] = useState(false)
    const { toast } = useContext(ToasterContext)

    const [openModalVisualizar, setOpenModalVisualizar] = useState(false)
    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [openModalExcluir, setOpenModalExcluir] = useState(false)

    const [registroDados, setRegistroDados] = useState({
        id: props.registro.id,
        numeroSerie: props.registro.arma.numeroSerie,
        modelo: props.registro.arma.model,
        registroMilitar: props.registro.militar.registroMilitar,
        nome: props.registro.militar.nome,
        dataAcautelamento: props.registro.dataAcautelamento,
        dataDevolucao: props.registro.dataDevolucao,
        armeiroResponsavel: props.registro.armeiro.nome,
    })

    // Função para fechar o dropdown quando o usuário clica fora dele
    const dropdownRef = useRef(null);

    const closeDropdown = (e) => {
        setTimeout(() => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
          }
        }, 250)
      };

    useEffect(() => {
        // Adicionar um event listener para cliques no documento inteiro
        document.addEventListener('mousedown', closeDropdown);

        // Remover o event listener quando o componente é desmontado
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);




    async function atualizarRegistro() {

        const toastDevolucao = toast.loading('Registrando devolução...')

        const token = localStorage.getItem('token')

        const response = await fetch(HOST + 'acautelamento/devolucao/' + props.registro.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            mode: 'cors'
        })

        const data = await response.json()

        if (response.ok) {
            toast.success("Devolução registrada",{
                id: toastDevolucao
            })
            props.atualizarDados()
        }

        else {
            toast.error(data.error, {
                id: toastDevolucao
            })
        }

    }


    async function excluirRegistro() {
        const toastExcluir = toast.loading('Excluindo registro...')
        const response = await fetch(HOST + 'acautelamento/delete/' + props.registro.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
        })

        const data = await response.json()

        if (response.ok) {
            toast.success("Registro excluido",{
                id: toastExcluir
            })
            props.atualizarDados()
        }

        else {
            toast.error(data.error, {
                id: toastExcluir
            })
        }

    }


    return (
        <>

            {/* MODAL DE VER AS INFORMAÇÔES DO Registro */}

            {
                openModalVisualizar &&

                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>


                    <section
                        className='min-w-96 min-h-96 py-6 px-4 bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
                    >
                        <header>
                            <h1 className='text-3xl'
                            > Informações do Registro</h1>
                        </header>

                        <main>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Id
                                </h1>
                                <p className='text-xl font-light' >{props.registro.id}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-center items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Informações do Militar
                                </h1>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Registro Militar
                                </h1>
                                <p className='text-xl font-light' >{props.registro.militar.registroMilitar}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Nome
                                </h1>
                                <p className='text-xl font-light' >{props.registro.militar.nome}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-center items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Informações da Arma
                                </h1>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Numero de Serie
                                </h1>
                                <p className='text-xl font-light' >{props.registro.arma.numeroSerie}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Modelo
                                </h1>
                                <p className='text-xl font-light' >{props.registro.arma.modelo}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-center items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Informações complementares
                                </h1>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Data do Registro
                                </h1>
                                <p className='text-xl font-light' >{props.registro.dataAcautelamento}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Data da Devolução
                                </h1>
                                <p className='text-xl font-light' >{
                                    props.registro.dataDevolucao
                                        ? props.registro.dataDevolucao
                                        : 'Ainda não foi devolvido'
                                }</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Armeiro Responsável
                                </h1>
                                <p className='text-xl font-light' >{props.registro.armeiro.nome}</p>
                            </div>

                        </main>

                        <footer>
                            <button
                                onClick={() => setOpenModalVisualizar(!openModalVisualizar)}
                                className='w-40 h-10 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-800 text-white text-xl focus:outline-none'
                            >Fechar</button>
                        </footer>
                    </section>

                </div>

            }


            {/* MODAL DE EDITAR MILITAR */}
            {

                openModalEditar &&

                <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50'>

                    <section
                        className='w-96 min-h-96 py-6 overflow-x-auto bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
                    >

                        <header>
                            <h1 className='text-3xl'
                            >Registrar Devolução</h1>
                        </header>

                        <main
                            className='w-full h-full flex flex-col justify-center items-center gap-4 p-4'
                        >
                            <h1
                                className='text-xl font-light'
                            >
                                Você esta prestes a registrar a devolução da arma "{props.registro.arma.modelo}" do militar "{props.registro.militar.nome}".
                            </h1>

                        </main>

                        <footer
                            className='w-full flex justify-around items-center gap-4'
                        >
                            <button
                                onClick={() => setOpenModalEditar(!openModalEditar)}
                                className='w-40 h-10 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white text-xl focus:outline-none'
                            >Cancelar</button>

                            <button
                                className='w-40 h-10 rounded-md bg-green-500 hover:bg-green-600 active:bg-green-800 text-white text-xl focus:outline-none'
                                onClick={() => {
                                    atualizarRegistro()
                                    setOpenModalEditar(!openModalEditar)
                                }}
                            >Confirmar</button>
                        </footer>

                    </section>

                </div>

            }




            {/* Modal Confirmar Exclusao */}

            {
                openModalExcluir &&

                <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50'>

                    <section
                        className='w-96 min-h-96 py-6 overflow-x-auto bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
                    >

                        <header>
                            <h1 className='text-3xl'
                            >Excluir Registro</h1>
                        </header>

                        <main
                            className='w-full h-full flex flex-col justify-center items-center gap-4 p-4'
                        >
                            <h1
                                className='text-xl font-light'
                            >
                                Você esta prestes a excluir o registro de acautelamento da arma "{props.registro.arma.modelo}" do militar "{props.registro.militar.nome}".
                            </h1>

                        </main>

                        <footer
                            className='w-full flex justify-around items-center gap-4'
                        >
                            <button
                                onClick={() => setOpenModalExcluir(!openModalExcluir)}
                                className='w-40 h-10 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white text-xl focus:outline-none'
                            >Cancelar</button>

                            <button
                                className='w-40 h-10 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-800 text-white text-xl focus:outline-none'
                                onClick={() => {
                                    excluirRegistro()
                                    setOpenModalExcluir(!openModalExcluir)
                                }}
                            >Excluir</button>
                        </footer>

                    </section>

                </div>
            }










            {/* AREA DO BOTAO */}
            <div className='w-full h-full flex justify-center relative'>

                {/* Botao de acoes */}
                <button
                ref={dropdownRef}
                    onClick={() => setOpen(!open)}
                    className='w-20 h-10 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white text-xl focus:outline-none'
                >
                    Ações
                </button>

                

                <div className={`absolute top-10 left-0 w-full z-50 h-40 flex flex-col justify-around items-center bg-white rounded-md shadow-md ${open ? 'block' : 'hidden'}`}>

                    <button
                        onClick={() => {
                            setOpenModalVisualizar(!openModalVisualizar)
                            setOpen(!open)
                        }}
                        className='w-full h-full text-xl text-green-500 focus:outline-none border-2 hover:bg-slate-50'>
                        Ver Mais
                    </button>

                    {
                    registroDados.dataDevolucao === null &&

                    <button
                        onClick={() => {
                            setOpenModalEditar(!openModalEditar)
                            setOpen(!open)
                        }}
                        className='w-full h-full text-xl text-blue-500 focus:outline-none border-2 hover:bg-slate-50'>
                        Registrar Devolução
                    </button>
                    }

                    

                    <button
                        onClick={() => {
                            setOpenModalExcluir(!openModalExcluir)
                            setOpen(!open)
                        }}
                        className='w-full h-full text-xl text-red-500 focus:outline-none border-2 hover:bg-slate-50'>
                        Excluir
                    </button>

                </div>

            </div>

        </>
    )
}
