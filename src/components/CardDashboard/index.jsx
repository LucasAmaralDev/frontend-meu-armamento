import React from 'react'


export default function CardDashboard(props) {
  return (
    <div className='w-3/12 max-lg:w-4/5 flex flex-col justify-around p-2 items-center bg-green-700 m-1 h-56 rounded-xl shadow-stone-500 shadow-md' >
      <h3 className='text-2xl text-center font-bold text-white'>{props.titulo}</h3>
      <h1 className='text-6xl text-white font-semibold'>{props.valor}</h1>
    </div >
  )
}
