import React, { useEffect, useState } from 'react'
import EscopoAdmin from '../../../components/EscopoAdmin'
import { useForm } from 'react-hook-form'
import HOST from '../../../services/host'
import ModalResposta from '../../../components/ModalResposta'
import { cssButtonConfirm, cssInput, cssSelect } from '../../../services/utils'
import ModalFabricantes from '../../../components/ModalFabricantes'

export default function CadastrarArma() {

    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [fabricantes, setFabricantes] = useState([])

    async function getFabricantes() {
        const response = await fetch(HOST + 'fabricante', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        const dataResponse = await response.json()
        if (response.ok) {
            setFabricantes(dataResponse)
        }
        console.log(dataResponse)
    }

    useEffect(() => {
        getFabricantes()
    }, [])

    function retornarParaPaginaAnterior() {
        window.location.href = '/armas'
    }

    async function formularioNovaArma(data) {
        const tratamento = {
            ...data,
            capacidadeCarregador: parseInt(data.capacidadeCarregador),
            anoFabricacao: parseInt(data.anoFabricacao)
        }

        console.log(tratamento, data)

        const response = await fetch(HOST + 'arma/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors'
            ,
            body: JSON.stringify(tratamento)
        })

        const dataResponse = await response.json()

        console.log(response)
        console.log(dataResponse)

        if (response.ok) {
            setDataModal({
                titulo: 'Sucesso',
                mensagem: dataResponse.message,
                action: retornarParaPaginaAnterior
            })
            setModal(true)
        }

        else {
            setDataModal({
                titulo: 'Erro',
                mensagem: dataResponse.error
            })
            setModal(true)
        }


    }

    const { register, handleSubmit } = useForm()

    return (
        <EscopoAdmin titulo="CADASTRAR ARMA">

            <ModalResposta modal={modal} setModal={setModal} titulo={dataModal.titulo} mensagem={dataModal.mensagem} action={dataModal.action} />

            <div className='w-full h-full flex flex-col items-center py-4 px-2 gap-6 overflow-auto max-lg:h-auto'>
                <div className='max-lg:hidden'>
                    <h1 className='text-2xl lg:text-6xl'>Cadastrar Arma</h1>
                </div>

                <form
                    onSubmit={handleSubmit(formularioNovaArma)}
                    className='w-full h-full flex flex-col justify-center items-center gap-4'>

                    <input type="text" {
                        ...register('numeroSerie')
                    } placeholder='Numero de Serie' className={cssInput} />
                    
                    
                    <div className='w-full gap-1 flex items-center flex-col'>
                        <select type="text" {
                            ...register('fabricante')
                        } placeholder='Fabricante' className={cssSelect} >
                            <option>Selecione um fabricante</option>
                            {
                                fabricantes.map((fabricante, index) => {
                                    return (
                                        <option key={index} value={fabricante.id}>{fabricante.nome}</option>
                                    )
                                })
                            }
                        </select>
                        <ModalFabricantes fabricantes={fabricantes} getFabricantes={getFabricantes} />
                    </div>

                    <input type="text" {
                        ...register('modelo')
                    } placeholder='Modelo' className={cssInput} />

                    <input type="text" {
                        ...register('calibre')
                    } placeholder='Calibre' className={cssInput} />

                    <input type='number' {
                        ...register('capacidadeCarregador')
                    } placeholder='Capacidade do Carregador' className={cssInput} />

                    <select {
                        ...register('estadoConservacao')
                    } className={cssSelect}>
                        <option value="">Selecione o Estado de Conservação</option>
                        <option value="NOVO">Novo</option>
                        <option value="EXCELENTE">Excelente</option>
                        <option value="BOM">Bom</option>
                        <option value="REGULAR">Regular</option>
                        <option value="BAIXADA">Baixada</option>
                    </select>

                    <select {
                        ...register('tipo')
                    } className={cssSelect}>
                        <option value="">Selecione o Tipo</option>
                        <option value="1">Pistola</option>
                        <option value="2">Revolver</option>
                        <option value="3">Espingarda</option>
                        <option value="4">Fuzil</option>
                        <option value="5">Submetralhadora</option>
                        <option value="6">Carabina</option>
                        <option value="7">Escopeta</option>
                    </select>

                    <input {
                        ...register('anoFabricacao')
                    } type="number" placeholder='Ano de Fabricação' className={cssInput} />

                    <button {
                        ...register('cadastrar')
                    } type='submit' className={cssButtonConfirm}>Cadastrar</button>
                </form>
            </div>
        </EscopoAdmin>
    )
}
