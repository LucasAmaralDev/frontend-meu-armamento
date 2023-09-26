import React from 'react'

export default function ModalResposta(props) {

    const modal = props.modal

    const setModal = props.setModal

    const mensagem = props.mensagem

    const titulo = props.titulo

    const action = props.action



    return (
        <>

            {

                modal &&

                <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 z-50'>

                    <section
                        className='w-1/2 h-1/2 max-lg:w-11/12 bg-white flex flex-col justify-center items-center rounded-lg'
                    >

                        <header>
                            <h1 className='text-2xl font-medium'>
                                {titulo}
                            </h1>
                        </header>

                        <main className='w-full h-full flex justify-center items-center'>

                            <p className='text-lg font-normal text-center'>{mensagem}</p>

                        </main>

                        <footer className='w-full h-2/6 flex justify-center items-center'>

                            <button
                                className='w-1/2 h-10 bg-blue-500 text-white rounded-lg'
                                onClick={() => {
                                    setModal(false)
                                    if (action) {
                                        action()
                                    }
                                }}
                            >
                                Ok
                            </button>

                        </footer>

                    </section>


                </div>

            }



        </>
    )
}
