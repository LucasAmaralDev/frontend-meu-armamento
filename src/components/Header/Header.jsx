import React from 'react'

import logo from '../../assets/LOGO-GA.svg'

export default function Header() {
  return (
    <header className='w-screen bg-stone-900 flex justify-center'>
      <div
        className='w-11/12 flex justify-center'
      >
        <img src={logo} alt="Logo Gestão de Armas" className='w-4/5 p-6 md:w-6/12'
        />
      </div>
    </header>
  )
}
