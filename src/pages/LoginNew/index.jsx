import React, { useState } from 'react'
import Logo from '../../assets/LOGO-GA.svg'
import FormLogin from '../../components/FormLogin'
import FormRegistro from '../../components/FormRegistro'
import IMGBG from '../../assets/gestao_arma_imgbg.webp'

export default function LoginNew() {

    const [pagina, setPagina] = useState('Login')

    return (
        <div
            className='w-full h-screen flex justify-center items-center bg-gray-900 max-lg:flex-col max-lg:bg-white'
        >
            <h1 className='justify-items-start text-3xl pt-4 lg:hidden max-lg:font-black'>Gestão de armas</h1>
            {/* SESSAO COM IMAGEM */}
            <section
                className='h-full w-7/12 bg-white flex flex-col justify-center items-center gap-4 overflow-hidden relative max-lg:hidden'
            >
                <img src={IMGBG}
                    className='h-full' />

                <div className='absolute w-full h-screen flex items-center bg-neutral-900 bg-opacity-70 px-12'>
                    <img src={Logo} alt="" />

                </div>

            </section>

            {(pagina === 'Login') && <FormLogin setPagina={setPagina} />}
            {(pagina === 'Registro') && <FormRegistro setPagina={setPagina} />}






        </div>
    )
}
