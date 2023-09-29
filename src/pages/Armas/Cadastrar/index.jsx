import React, { useState } from 'react'
import EscopoAdmin from '../../../components/EscopoAdmin'
import { useForm } from 'react-hook-form'
import HOST from '../../../services/host'
import ModalResposta from '../../../components/ModalResposta'
import { cssButtonConfirm, cssInput, cssSelect } from '../../../services/utils'

export default function CadastrarArma() {

    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

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

                    <input type="text" {
                        ...register('fabricante')
                    } placeholder='Fabricante' className={cssInput} />

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
                        <option value="PISTOLA">Pistola</option>
                        <option value="REVOLVER">Revolver</option>
                        <option value="ESPINGARDA">Espingarda</option>
                        <option value="FUZIL">Fuzil</option>
                        <option value="SUBMETRALHADORA">Submetralhadora</option>
                        <option value="CARABINA">Carabina</option>
                        <option value="ESCOPETA">Escopeta</option>
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
