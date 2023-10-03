import React, { useState } from 'react'
import HOST from '../../services/host'

export default function ModalFabricantes(props) {
  const [open, setOpen] = useState(false)

  const [nome, setNome] = useState('')

  async function adicionarFabricante() {

    if (!nome) {
      alert("Preencha o campo nome")
      return
    }

    const response = await fetch(HOST + 'fabricante', {
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
      props.getFabricantes()
      setNome('')
      alert("Fabricante Adicionado")
      return
    }
    console.log(dataResponse)
    alert(dataResponse.error)
    setNome('')

  }

  async function deletarFabricante(id) {

    const response = await fetch(HOST + 'fabricante/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    })

    const dataResponse = await response.json()

    if (response.ok) {
      props.getFabricantes()
      alert("Fabricante Deletado")
      return
    }

    alert(dataResponse.error)

  }


  return (
    <>

      <span className=' w-2/5 bg-green-600 text-white text-center flex justify-center px-1 py-2 mt-1 rounded-md cursor-pointer' onClick={() => { setOpen(true) }}>Adicionar Fabricante</span>


      {
        open &&
        <>
          <div className='fixed top-0 left-0 bg-black bg-opacity-30 w-screen h-screen'>

            <section className='w-5/12 h-4/5 bg-white rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center gap-4 py-4'>

              <header className='w-full flex justify-center items-center'>
                <h1 className='text-4xl'>Fabricantes</h1>
              </header>

              <main className='w-full h-full flex flex-col items-center gap-4 overflow-auto'>

                <div className='w-full h-1/6 flex justify-center items-center gap-4'>
                  <input type="text" placeholder='Nome do Fabricante' className='w-3/5 h-1/2 border-2 border-stone-700 rounded-md px-2' value={nome} onChange={(e) => setNome(e.target.value)} />
                  <div className='w-1/5 h-1/2 bg-green-600 text-white rounded-md flex items-center justify-center cursor-pointer' onClick={adicionarFabricante}>Adicionar</div>
                </div>
                
                
                <div className='w-full h-full flex flex-col items-center gap-2 overflow-y-auto'>
                  {

                    props.fabricantes.map((fabricante, index) => {
                      return (
                        <div key={index} className='w-full h-10 flex justify-center items-center gap-2'>
                          <p className='w-3/5 h-10 border-2 rounded-md px-2 flex items-center'>{fabricante.nome}</p>
                          <div className='w-auto px-1 h-10 bg-red-600 text-white rounded-md flex items-center cursor-pointer'
                          onClick={() => {deletarFabricante(fabricante.id)}}
                          >Excluir</div>
                        </div>
                      )
                    }

                    )

                  }

                </div>


              </main>

              <footer className='w-full flex justify-center items-center'>
                <button className='w-1/5 h-12 bg-green-600 text-white rounded-md' onClick={() => { setOpen(false) }}>Fechar</button>
              </footer>

            </section>

          </div>
        </>
      }
    </>
  )
}
