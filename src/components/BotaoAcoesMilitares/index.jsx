import React, { useEffect, useRef, useState } from 'react'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'

export default function BotaoAcoesMilitares(props) {

    const [batalhoes, setBatalhoes] = useState([])
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [dadosModal, setDadosModal] = useState({})

    const [openModalVisualizar, setOpenModalVisualizar] = useState(false)
    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [openModalExcluir, setOpenModalExcluir] = useState(false)

    const [militarDados, setMilitarDados] = useState({
        id: props.militar.id,
        registroMilitar: props.militar.registroMilitar,
        nome: props.militar.nome,
        batalhao: props.militar.batalhao,
        dataCadastro: props.militar.dataCadastro

    })

    // Função para fechar o dropdown quando o usuário clica fora dele
    const dropdownRef = useRef(null);

    const closeDropdown = (e) => {
        setTimeout(() => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
          }
        }, 100)
      };
    useEffect(() => {
        // Adicionar um event listener para cliques no documento inteiro
        document.addEventListener('mousedown', closeDropdown);
    
        // Remover o event listener quando o componente é desmontado
        return () => {
          document.removeEventListener('mousedown', closeDropdown);
        };
      }, []);

    
    async function getBatalhoes() {
        const response = await fetch(HOST + 'batalhao', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setBatalhoes(dataResponse)
        }
        console.log(dataResponse)
    }

    useEffect(() => {
        getBatalhoes()
    }, [])





    async function atualizarMilitar() {

        const token = localStorage.getItem('token')

        const response = await fetch(HOST + 'militares/update/' + props.militar.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            mode: 'cors',
            body: JSON.stringify({
                ...militarDados
            })

        })

        const data = await response.json()

        if (response.ok) {
            setDadosModal({
                titulo: 'Sucesso',
                mensagem: 'Militar atualizado com sucesso'
            })
            setModal(true)
        }

        else {
            setDadosModal({
                titulo: 'Erro',
                mensagem: data.error
            })
            setModal(true)
        }

    }


    async function excluirMilitar() {

        const response = await fetch(HOST + 'militares/delete/' + props.militar.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
        })

        const data = await response.json()

        if (response.ok) {
            setDadosModal({
                titulo: 'Sucesso',
                mensagem: 'Militar deletado com sucesso',
            })
            setModal(true)
        }

        else {
            setDadosModal({
                titulo: 'Erro ao deletar militar',
                mensagem: data.error
            })
            setModal(true)
        }

    }


    return (
        <>

            <ModalResposta modal={modal} action={props.atualizarDados} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem} />

            {/* MODAL DE VER AS INFORMAÇÔES DO MILITAR */}

            {
                openModalVisualizar &&

                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>


                    <section
                        className='min-w-96 min-h-96 py-6 bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
                    >
                        <header>
                            <h1 className='text-3xl'
                            >Informações do Militar</h1>
                        </header>

                        <main>



                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Id
                                </h1>
                                <p className='text-xl font-light' >{props.militar.id}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Registro Militar
                                </h1>
                                <p className='text-xl font-light' >{props.militar.registroMilitar}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Nome
                                </h1>
                                <p className='text-xl font-light' >{props.militar.nome}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Batalhão
                                </h1>
                                <p className='text-xl font-light' >{props.militar.batalhaoMilitar.nome}</p>
                            </div>

                            <div
                                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'>
                                <h1 className='text-xl font-bold' >
                                    Data de Cadastro
                                </h1>
                                <p className='text-xl font-light' >{props.militar.dataCadastro}</p>
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
                            >Editar Militar</h1>
                        </header>

                        <main
                            className='w-full h-full flex flex-col justify-center items-center gap-4'
                        >

                            <div className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'>

                                <label htmlFor="registroMilitar" className='text-xl font-bold'>
                                    Registro Militar
                                </label>

                                <input type="text" id='registroMilitar' disabled={true} className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                                    value={militarDados.registroMilitar}
                                />

                            </div>

                            <div className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'>

                                <label htmlFor="nome" className='text-xl font-bold'>
                                    Nome
                                </label>

                                <input type="text" id='nome' className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                                    value={militarDados.nome}
                                    onChange={e => setMilitarDados({ ...militarDados, nome: e.target.value })}
                                />

                            </div>

                            <div className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'>

                                <label htmlFor="batalhao" className='text-xl font-bold'>
                                    Batalhão
                                </label>

                                <select type="text" id='batalhao' className='w-60 text-center h-10 rounded-md border-2 focus:outline-none px-4'
                                    value={militarDados.batalhao}
                                    onChange={e => setMilitarDados({ ...militarDados, batalhao: e.target.value })}
                                >
                                    {
                                        batalhoes.map((batalhao, index) => {
                                            return (
                                                <option key={index} value={batalhao.id}>{batalhao.nome}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>

                            <div className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'>

                                <label htmlFor="dataCadastro" className='text-xl font-bold'>
                                    Data de Cadastro
                                </label>

                                <input type="text" id='dataCadastro' disabled={true} className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                                    value={militarDados.dataCadastro}
                                />

                            </div>

                        </main>

                        <footer

                            className='w-full flex justify-around items-center gap-4'
                        >
                            <button
                                onClick={() => setOpenModalEditar(!openModalEditar)}
                                className='w-40 h-10 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-800 text-white text-xl focus:outline-none'
                            >Cancelar</button>

                            <button
                                onClick={() => {
                                    atualizarMilitar()
                                    setOpenModalEditar(!openModalEditar)
                                }}
                                className='w-40 h-10 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white text-xl focus:outline-none'
                            >Salvar</button>
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
                            >Excluir Militar</h1>
                        </header>

                        <main
                            className='w-full h-full flex flex-col justify-center items-center gap-4 p-4'
                        >
                            <h1
                                className='text-xl font-light'
                            >
                                Deseja mesmo excluir o militar "{props.militar.nome}"?
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
                                    excluirMilitar()
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

                    <button
                        onClick={() => {
                            setOpenModalEditar(!openModalEditar)
                            setOpen(!open)
                        }}
                        className='w-full h-full text-xl text-blue-500 focus:outline-none border-2 hover:bg-slate-50'>
                        Editar
                    </button>

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
