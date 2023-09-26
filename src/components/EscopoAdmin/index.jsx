import React, { useState } from 'react'
import styles from './Base.module.css'
import HeaderLogado from '../HeaderLogado/HeaderLogado'
import { Link } from 'react-router-dom'

export default function EscopoAdmin({ children, titulo }) {



    return (
        <div className='flex flex-col w-screen h-screen'>

            <div>
                <HeaderLogado />
                <div className='w-full flex justify-center bg-stone-300'
                >
                    <h1>{titulo}</h1>
                </div>
            </div>

            <div className='w-full h-full flex overflow-clip'>
                <section className={'flex flex-col h-full bg-stone-900 justify-around py-5 items-center gap-4 text-white w-60 max-lg:hidden'}
                >

                    <Link to="/home"
                        className={(window.location.pathname === '/home' ? styles.active : '') + ' w-full + text-2xl px-4 '}
                    >
                        <h1>Inicio</h1>
                    </Link>

                    <Link to="/armas"
                        className={(window.location.pathname === '/armas' ? styles.active : '') + ' w-full + text-2xl px-4 '}
                    >
                        <h1>Armas</h1>
                    </Link>

                    <Link to="/militares"
                        className={(window.location.pathname === '/militares' ? styles.active : '') + ' w-full + text-2xl px-4 '}
                    >
                        <h1>Militares</h1>
                    </Link>

                    <Link to="/registros"
                        className={(window.location.pathname === '/registros' ? styles.active : '') + ' w-full + text-2xl px-4 '}
                    >
                        <h1>Registros</h1>
                    </Link>
                    <Link to="/armeiros"
                        className={(window.location.pathname === '/armeiros' ? styles.active : '') + ' w-full + text-2xl px-4'}
                    >
                        <h1>Armeiros</h1>
                    </Link>



                </section>

                <section
                    className='max-h-full w-full h-full overflow-clip relative max-lg:overflow-x-auto'
                >
                    {children}

                </section>
            </div>


        </ div>
    )
}
