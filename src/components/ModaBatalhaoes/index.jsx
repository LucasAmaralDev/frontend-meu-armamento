import React, { useState } from 'react'
import HOST from '../../services/host'

export default function ModalBatalhoes(props) {
    const [open, setOpen] = useState(false)

    const [nome, setNome] = useState('')

    async function adicionarBatalhao() {

        if (!nome) {
            alert("Preencha o campo nome")
            return
        }

        const response = await fetch(HOST + 'batalhao', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome
            })
        })

        const dataResponse = await response.json()

        if (response.ok) {
            props.getBatalhoes()
            setNome('')
            alert("Batalhão Adicionado")
            return
        }

        alert(dataResponse.error)

    }

    async function deletarBatalhao(id) {

        const response = await fetch(HOST + 'batalhao/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })

        const dataResponse = await response.json()

        if (response.ok) {
            props.getBatalhoes()
            alert("Batalhão Deletado")
            return
        }

        alert(dataResponse.error)
    
    }

    return (
    <>

            <span className='w-2/5 bg-green-600 text-white flex justify-center rounded-md cursor-pointer'
                onClick={() => { setOpen(true) }}
            >Gerir Batalhões</span>


            {
                open &&

                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white w-11/12 max-w-2xl h-5/6 rounded-md p-4 flex flex-col gap-4'>
                        <header className='w-full h-1/6 flex justify-center items-center'>
                            <h1 className='text-2xl'>Batalhões</h1>
                        </header>

                        <main className='w-full h-4/6 flex flex-col items-center gap-4 overflow-auto'>

                            <div className='w-full h-1/6 flex justify-center items-center gap-4'>

                                <input type="text" placeholder='Nome do Batalhão' className='w-2/5 h-1/2 border-2 border-stone-700 rounded-md px-2' value={nome} onChange={(e) => setNome(e.target.value)} />

                                <div className='w-1/5 h-1/2 bg-green-600 text-white rounded-md flex items-center justify-center cursor-pointer'

                                    onClick={adicionarBatalhao}

                                >Adicionar</div>

                            </div>

                            <div className='w-full h-5/6 flex flex-col items-center gap-2 overflow-y-scroll'>

                                {

                                    props.batalhoes.map((batalhao, index) => {
                                        return (
                                            <div key={index} className='w-full h-10 flex justify-center items-center gap-2'>
                                                <p className='w-3/5 h-10 border-2 rounded-md px-2 flex items-center'>{batalhao.nome}</p>
                                                <div className='w-auto px-1 h-10 bg-red-600 text-white rounded-md flex items-center cursor-pointer'
                                                    onClick={() => {deletarBatalhao(batalhao.id) }}
                                                >Excluir</div>
                                            </div>
                                        )
                                    }

                                    )
                                }

                            </div>

                        </main>

                        <footer className='w-full h-1/6 flex justify-center items-center'>

                            <button className='w-1/5 h-1/2 bg-green-600 text-white rounded-md'
                                onClick={() => { setOpen(false) }}
                            >Fechar</button>

                        </footer>

                    </div>

                </div>

            }

                            </>
                            )
}
