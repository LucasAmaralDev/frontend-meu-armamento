import React from 'react'
import Header from './components/Header/Header'



export function App() {
  return (
    <div className='min-w-full h-screen flex flex-col bg-slate-100'>
      <Header />
      <main className='flex flex-col sm:flex-row justify-center gap-10 items-center p-3 w-full h-full' >

        <section
          className='flex flex-col justify-center items-center h-full p-10 gap-10'
          style={{}}
        >
          <h1 className='text-5xl text-center max-[800px]:hidden'>Gerindo com maestria e garantindo a ordem</h1>
          <h1 className='text-5xl text-center'>Selecione a opção desejada</h1>

          <div className='flex gap-14 flex-col'>
            <button onClick={() => window.location.href = '/login'}
              className='bg-green-600 hover:bg-green-700 focus:bg-green-900 text-white p-2 rounded-md w-40'
            >FAZER LOGIN</button>
            <button onClick={() => window.location.href = '/register'}
              className='bg-green-600 hover:bg-green-700 focus:bg-green-900 text-white p-2 rounded-md w-40'
            >CADASTRAR</button>
          </div>


        </section>



      </main>
    </div>
  )
}
