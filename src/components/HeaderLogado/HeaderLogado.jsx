import React, { useEffect, useState } from 'react'

import userLogo from '../../assets/userLogo.png'

import logo from '../../assets/LOGO-GA.svg'

import { Link } from 'react-router-dom'
import HOST from '../../services/host'

export default function HeaderLogado(props) {

  const [meusDados, setMeusDados] = useState({
    nome: localStorage.getItem('nome'),
    registroMilitar: localStorage.getItem('registroMilitar')
  })


  async function minhasInformacoes() {

    const response = await fetch(HOST + 'get-my-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })

    const dataResponse = await response.json()
    if (response.ok) {
      setMeusDados(dataResponse)
      localStorage.setItem('nome', dataResponse.nome)
      localStorage.setItem('registroMilitar', dataResponse.registroMilitar)
    }

    else {
      handleLogout()
    }

  }

  useEffect(() => {
      minhasInformacoes()
  }, [])


    async function handleLogout() {
      localStorage.clear()
      window.location.href = '/'
    }

    const [open, setOpen] = useState(false);

    return (
      <header>
        <div className='flex w-full justify-around bg-stone-900 h-24 max-lg:flex-col max-lg:justify-center items-center p-6 max-sm:h-32'
        >
          <div className='max-lg:flex max-lg:justify-center'>
            <img src={logo} alt="Logo Gestão Armas" className='w-4/5 md:w-4/12'
            />
          </div>

          <div className='flex items-center'>
            <div className='flex flex-col justify-center items-center gap-2 p-2 '
            >
              <h1
                className='text-white text-xs'
              >{meusDados.registroMilitar} | {meusDados.nome}</h1>
              <div>
                <div className=''>
                  <div className=''>
                    <button className='text-white border-2 border-stone-700 rounded-md px-2 text-sm'
                      onClick={
                        () => setOpen(!open)
                      }>{open ? 'Fechar Menu' : 'Abrir Menu'}</button>
                    <div className='sm:relative top-0 left-0'
                    >
                      <div
                        style={{
                          zIndex: 100
                        }}
                        className={
                          open ? 'absolute top-0 max-sm:top-40 left-0 bg-stone-900 rounded-md p-3 flex flex-col gap-2 max-sm:gap-8 transition-all border-2 manual-left border-stone-700 max-sm:w-full max-sm:text-center max-sm:text-2xl '
                            : 'absolute w-0 top-0 max-sm:top-40 overflow-hidden transition-all left-0 flex flex-col gap-2'
                        }>
                        <Link to='/home'
                          className='cursor-pointer text-white whitespace-nowrap sm:hidden'
                        >Inicio</Link>

                        <Link to='/armas'
                          className='cursor-pointer text-white whitespace-nowrap sm:hidden'
                        >Armas</Link>

                        <Link to='/militares'
                          className='cursor-pointer text-white whitespace-nowrap sm:hidden'
                        >Militares</Link>

                        <Link to='/registros'
                          className='cursor-pointer text-white whitespace-nowrap sm:hidden'
                        >Registros</Link>

                        <Link to='/armeiros'
                          className='cursor-pointer text-white whitespace-nowrap sm:hidden'
                        >Armeiros</Link>


                        <Link to='/editar-perfil'
                          className='cursor-pointer text-white whitespace-nowrap '
                        >Editar Perfil</Link>


                        <Link to='/alterar-senha'
                          className='cursor-pointer text-white whitespace-nowrap '
                        >Alterar Senha</Link>


                        <a className='cursor-pointer text-white whitespace-nowrap '
                          onClick={handleLogout}
                        >Sair</a>
                      </div>
                    </div>





                  </div>
                </div>


              </div>
            </div>

            <img src={userLogo} className='w-16 max-lg:hidden' />
          </div>




        </div>
      </header>
    )
  }
