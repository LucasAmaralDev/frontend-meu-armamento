import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import HOST from '../../services/host';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';


export default function BotaoAcoes(props) {

  const [anchorEl, setAnchorEl] = useState(null)
  const boOpen = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };




  const [openModalVisualizar, setOpenModalVisualizar] = useState(false)
  const [openModalEditar, setOpenModalEditar] = useState(false)
  const [openModalExcluir, setOpenModalExcluir] = useState(false)

  const [armaDados, setArmaDados] = useState({
    id: props.arma.id,
    numeroSerie: props.arma.numeroSerie,
    fabricante: props.arma.fabricanteArma.nome,
    modelo: props.arma.modelo,
    calibre: props.arma.calibre,
    capacidadeCarregador: props.arma.capacidadeCarregador,
    estadoConservacao: props.arma.estadoConservacao,
    tipo: props.arma.tipoArma.tipo,
    anoFabricacao: props.arma.anoFabricacao,
    dataCadastro: props.arma.dataCadastro,
  })

  async function atualizarArma() {
    const toastId = props.toast.loading('Atualizando a arma...');

    const token = localStorage.getItem('token')

    const response = await fetch(HOST + 'arma/update/' + props.arma.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      mode: 'cors',
      body: JSON.stringify({
        estadoConservacao: armaDados.estadoConservacao
      })

    })

    const data = await response.json()

    if (response.ok) {
      props.toast.success('Arma atualizada com sucesso', {
        id: toastId,
      });
      props.atualizarDados()
    }

    else {
      props.toast.error(data.error, {
        id: toastId,
      });
    }

  }


  async function excluirArma() {
    const toastId = props.toast.loading('Deletando a arma...');

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
      props.toast.success('Arma deletada com sucesso', {
        id: toastId,
      });
      props.atualizarDados()
    }

    else {
      props.toast.error(data.error, {
        id: toastId,
      });
    }

  }


  return (
    <>


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
                >{props.arma.fabricanteArma.nome}</p>

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
                >{props.arma.tipoArma.tipo}</p>

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

        <div className='fixed top-0 left-0 flex-col w-full h-screen max-h-screen max-w-full bg-black bg-opacity-50 flex justify-center items-center z-50 py-10'>

          <section
            style={{
              maxHeight: '90vh'
            }}
            className='w-96 min-h-96 my-3 py-6 overflow-x-auto bg-white rounded-md shadow-md flex flex-col justify-between items-center gap-4 overflow-hidden'
          >
            <header>
              <h1 className='text-3xl'
              >Editar Arma</h1>
            </header>

            <main
              className='w-full h-5/6 overflow-y-auto flex flex-col items-center gap-4'
            >

              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Numero de Serie" defaultValue={armaDados.numeroSerie} disabled variant="outlined" className='w-full' />

              </div>

              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Fabricante" defaultValue={armaDados.fabricante} disabled variant="outlined" className='w-full' />

              </div>


              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Modelo" defaultValue={armaDados.modelo} disabled variant="outlined" className='w-full' />

              </div>

              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Calibre" defaultValue={armaDados.calibre} disabled variant="outlined" className='w-full' />

              </div>

              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Capacidade" defaultValue={armaDados.capacidadeCarregador + ' Munições'} disabled variant="outlined" className='w-full' />

              </div>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estado de Conservação</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={armaDados.estadoConservacao}
                  label="Estado de Conservação"
                  onChange={(e) => {
                    setArmaDados({
                      ...armaDados,
                      estadoConservacao: e.target.value
                    })
                  }}
                >
                  <MenuItem value=''>Todos</MenuItem>
                  <MenuItem value="NOVO">Novo</MenuItem>
                  <MenuItem value="EXCELENTE">Excelente</MenuItem>
                  <MenuItem value="BOM">Bom</MenuItem>
                  <MenuItem value="REGULAR">Regular</MenuItem>
                  <MenuItem value="BAIXADA">Baixada</MenuItem>
                </Select>
              </FormControl>

              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Tipo" defaultValue={armaDados.tipo} disabled variant="outlined" className='w-full' />

              </div>


              <div className='w-full flex-col flex justify-between items-center p-2 gap-1 rounded-md' >

                <TextField label="Ano de Fabricação" defaultValue={armaDados.anoFabricacao} disabled variant="outlined" className='w-full' />

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




        <div>
          <Button
            id="basic-button"
            aria-controls={boOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={boOpen ? 'true' : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Ações
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={boOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem

              onClick={() => {
                handleClose()
                setOpenModalVisualizar(!openModalVisualizar)
              }}>Ver Mais</MenuItem>

            <MenuItem onClick={() => {
              handleClose()
              setOpenModalEditar(!openModalEditar)
            }}>Editar</MenuItem>
            <MenuItem onClick={() => {
              handleClose()
              setOpenModalExcluir(!openModalExcluir)
            }}>Excluir</MenuItem>
          </Menu>
        </div>

      </div>

    </>
  )
}
