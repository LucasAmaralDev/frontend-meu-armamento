import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigations } from './Routes'
import './global.css'
import { ToasterContextProvider } from './Context/ToasterContext'
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToasterContextProvider>
            <Navigations />
        </ToasterContextProvider>
    </>
)
