import React, { useEffect, useRef, useState } from 'react'
import HOST from '../../services/host'
import ModalResposta from '../ModalResposta'

export default function BotaoAcoes(props) {

  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [dadosModal, setDadosModal] = useState({})






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




  const [openModalVisualizar, setOpenModalVisualizar] = useState(false)
  const [openModalEditar, setOpenModalEditar] = useState(false)
  const [openModalExcluir, setOpenModalExcluir] = useState(false)

  const [armaDados, setArmaDados] = useState({
    id: props.arma.id,
    numeroSerie: props.arma.numeroSerie,
    fabricante: props.arma.fabricante,
    modelo: props.arma.modelo,
    calibre: props.arma.calibre,
    capacidadeCarregador: props.arma.capacidadeCarregador,
    estadoConservacao: props.arma.estadoConservacao,
    tipo: props.arma.tipo,
    anoFabricacao: props.arma.anoFabricacao,
    dataCadastro: props.arma.dataCadastro,
  })

  async function atualizarArma() {

    const token = localStorage.getItem('token')

    const response = await fetch(HOST + 'arma/update/' + props.arma.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      mode: 'cors',
      body: JSON.stringify({
        ...armaDados
      })

    })

    const data = await response.json()

    if (response.ok) {
      
      setDadosModal({
        titulo: 'Sucesso',
        mensagem: 'Arma atualizada com sucesso'
      })
      setTimeout(() => {
        props.atualizarDados()
      }, 2000)
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


  async function excluirArma() {

    const response = await fetch(HOST + 'arma/delete/' + props.arma.id, {
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
        mensagem: 'Arma excluida com sucesso',
      })
      setModal(true)
      setTimeout(() => {
        props.atualizarDados()
      }, 2000)
    }
      
      else {
        setDadosModal({
          titulo: 'Erro',
          mensagem: data.error
        })
        setModal(true)
      }

  }


  return (
    <>

      <ModalResposta modal={modal} setModal={setModal} titulo={dadosModal.titulo} mensagem={dadosModal.mensagem}  />

      {/* MODAL DE VER AS INFORMAÇÔES DA ARMA */}

      {
        openModalVisualizar &&


        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>


          <section
            className='w-96 min-h-96 py-6 bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
          >
            <header>
              <h1 className='text-3xl'
              >Informações da Arma</h1>
            </header>

            <main>
              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Id</h1>
                <p
                  className='text-xl font-light'
                >{props.arma.id}</p>
              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Numero de Serie</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.numeroSerie}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Fabricante</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.fabricante}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Modelo</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.modelo}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Calibre</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.calibre}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Capacidade</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.capacidadeCarregador} Munições</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Conservação</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.estadoConservacao}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Tipo</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.tipo}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Fabricação</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.anoFabricacao}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Cadastro</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.dataCadastro}</p>

              </div>

              <div
                className='w-full h-10 flex justify-between items-center px-4 gap-6 rounded-md'
              >
                <h1
                  className='text-xl font-bold'
                >Armeiro</h1>

                <p
                  className='text-xl font-light'
                >{props.arma.armeiro.nome}</p>

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


      {/* MODAL DE EDITAR A ARMA */}
      {

        openModalEditar &&

        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50'>

          <section
            className='w-96 min-h-96 py-6 overflow-x-auto bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
          >
            <header>
              <h1 className='text-3xl'
              >Editar Arma</h1>
            </header>

            <main
              className='w-full h-full flex flex-col justify-center items-center gap-4'
            >

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'
              >
                <label
                  htmlFor="numeroSerie"
                  className='text-xl font-bold'
                >Numero de Serie</label>

                <input
                  type="text"
                  id='numeroSerie'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.numeroSerie}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'
              >
                <label
                  htmlFor="fabricante"
                  className='text-xl font-bold'
                >Fabricante</label>

                <input
                  type="text"
                  id='fabricante'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.fabricante}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'
              >
                <label
                  htmlFor="modelo"
                  className='text-xl font-bold'
                >Modelo</label>

                <input
                  type="text"
                  id='modelo'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.modelo}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md max-lg:hidden'
              >
                <label
                  htmlFor="calibre"
                  className='text-xl font-bold'
                >Calibre</label>

                <input
                  type="text"
                  id='calibre'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.calibre}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md max-lg:hidden'
              >
                <label
                  htmlFor="capacidadeCarregador"
                  className='text-xl font-bold'
                >Capacidade</label>

                <input
                  type="text"
                  id='capacidadeCarregador'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.capacidadeCarregador + ' Munições'}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md'
              >
                <label
                  htmlFor="estadoConservacao"
                  className='text-xl font-bold'
                >Estado de Conservação</label>

                <select
                  id='estadoConservacao'
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.estadoConservacao}
                  onChange={(e) => setArmaDados({ ...armaDados, estadoConservacao: e.target.value })}
                >
                  <option value="NOVO">Novo</option>
                  <option value="EXELENTE">Excelente</option>
                  <option value="BOM">Bom</option>
                  <option value="REGULAR">Regular</option>
                  <option value="BAIXADA">Baixada</option>
                </select>

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md max-lg:hidden'
              >
                <label
                  htmlFor="tipo"
                  className='text-xl font-bold'
                >Tipo</label>

                <input
                  type="text"
                  id='tipo'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.tipo}
                />

              </div>

              <div
                className='w-full flex-col flex justify-between items-center px-4 gap-1 rounded-md max-lg:hidden'
              >
                <label
                  htmlFor="anoFabricacao"
                  className='text-xl font-bold'
                >Fabricação</label>

                <input
                  type="text"
                  id='anoFabricacao'
                  disabled={true}
                  className='w-60 text-center h-10 rounded-md border-2 border-gray-300 focus:outline-none px-4'
                  value={armaDados.anoFabricacao}
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
                  atualizarArma()
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
              >Excluir Arma</h1>
            </header>

            <main
              className='w-full h-full flex flex-col justify-center items-center gap-4 p-4'
            >
              <h1
                className='text-xl font-light'
              >
                Deseja mesmo excluir a arma "{props.arma.modelo}"?
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
                  excluirArma()
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
