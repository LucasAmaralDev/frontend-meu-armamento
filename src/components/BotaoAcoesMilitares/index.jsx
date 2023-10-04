import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useEffect, useState } from 'react';
import { ToasterContext } from '../../Context/ToasterContext';
import HOST from '../../services/host';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BotaoAcoesMilitares(props) {

    const [anchorEl, setAnchorEl] = useState(null)
    const boOpen = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    const { toast } = useContext(ToasterContext)

    const [batalhoes, setBatalhoes] = useState([])

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
        const toastMilitar = toast.loading('Atualizando militar...')
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
            toast.success('Militar atualizado com sucesso', {
                id: toastMilitar
            })
            props.atualizarDados()
        }

        else {
            toast.error(data.error, {
                id: toastMilitar
            })
        }

    }


    async function excluirMilitar() {
        const toastExcluirMilitar = toast.loading("Excluindo militar...")
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
            toast.success("Militar excluido com sucesso", {
                id: toastExcluirMilitar
            })
            props.atualizarDados()
        }

        else {
            toast.error(data.error, {
                id: toastExcluirMilitar
            })
        }

    }


    return (
        <>


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

                <div className='fixed top-0 left-0 w-full flex flex-col h-screen bg-black bg-opacity-50 justify-center items-center z-50'>

                    <section
                        className='w-96 min-h-96 py-6 overflow-x-auto bg-white rounded-md shadow-md flex flex-col justify-around items-center gap-4 overflow-auto'
                    >
                        <header>
                            <h1 className='text-3xl'
                            >Editar Militar</h1>
                        </header>

                        <main
                            className='w-full h-full flex flex-col justify-center items-center gap-4 px-2'
                        >

                            <div className='w-full flex-col flex justify-between items-center py-2 gap-1 rounded-md' >

                                <TextField label="Registro Militar" defaultValue={militarDados.registroMilitar} disabled variant="outlined" className='w-full' />

                            </div>

                            <div className='w-full flex-col flex justify-between items-center py-2 gap-1 rounded-md' >

                                <TextField label="Nome" defaultValue={militarDados.nome} variant="outlined" className='w-full' onChange={() => {
                                    setMilitarDados({
                                        ...militarDados,
                                        nome: militarDados.nome
                                    })
                                }} />

                            </div>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Batalhão</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={militarDados.batalhao}
                                    label="Batalhão"
                                    onChange={(e) => {
                                        setMilitarDados({
                                            ...militarDados,
                                            batalhao: e.target.value
                                        })
                                    }}
                                >
                                    {
                                        batalhoes && batalhoes.map((batalhao, index) => {
                                            return (
                                                <MenuItem key={index} value={batalhao.id}>{batalhao.nome}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <div className='w-full flex-col flex justify-between items-center py-2 gap-1 rounded-md' >

                                <TextField label="Data de Cadastro" defaultValue={militarDados.dataCadastro} disabled variant="outlined" className='w-full' />

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
                            }}>
                            <ManageSearchIcon>
                            </ManageSearchIcon>
                            Ver Mais
                        </MenuItem>

                        <MenuItem onClick={() => {
                            handleClose()
                            setOpenModalEditar(!openModalEditar)
                        }}>
                            <EditIcon>
                            </EditIcon>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            setOpenModalExcluir(!openModalExcluir)
                        }}>
                            <DeleteIcon>
                            </DeleteIcon>
                            Excluir
                        </MenuItem>
                    </Menu>
                </div>

            </div>

        </>
    )
}
