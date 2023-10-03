import React, { useEffect, useState } from 'react'
import Logo from '../../assets/LOGO-GA.svg'
import FormLogin from '../../components/FormLogin'
import FormRegistro from '../../components/FormRegistro'

export default function LoginNew() {

    const [pagina, setPagina] = useState('Login')


    useEffect(() => {
        console.log(pagina)
    }, [pagina])

    return (
        <div
            className='w-full h-screen flex justify-center items-center bg-gray-900'
        >
            {/* SESSAO COM IMAGEM */}
            <section
                className='h-full w-7/12 bg-white flex flex-col justify-center items-center gap-4 overflow-hidden relative'
            >
                <img src="https://classic.exame.com/wp-content/uploads/2020/11/taurus_producao_armas_eua.jpg?quality=70&strip=info&w=960"
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
