

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Armas from './pages/Armas'
import Militares from './pages/Militares'
import Registros from './pages/Registros'
import Armeiros from './pages/Armeiros'
import EditarPerfil from './pages/EditarPerfil'
import AlterarSenha from './pages/AlterarSenha'
import CadastrarArma from './pages/Armas/Cadastrar'
import CadastrarMilitar from './pages/Militares/Cadastrar'
import CadastrarRegistro from './pages/Registros/Cadastrar'
import LoginNew from './pages/LoginNew'

function VerificarLogado({ children }) {
  const token = window.localStorage.getItem('token')
  if (token) {
    return children
  } else {
    window.location.href = '/'
    return null
  }
}


export function Navigations() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginNew />} />

        <Route path="/home" element={
          <VerificarLogado>
            <Home />
          </VerificarLogado>
        } />

        <Route path="/armas" element={
          <VerificarLogado>
            <Armas />
          </VerificarLogado>
        } />

        <Route path='/armas/cadastrar' element={
          <VerificarLogado>
            <CadastrarArma />
          </VerificarLogado>
        } />

        <Route path="/militares" element={
          <VerificarLogado>
            <Militares />
          </VerificarLogado>
        } />

        <Route path="/militares/cadastrar" element={
          <VerificarLogado>
            <CadastrarMilitar />
          </VerificarLogado>
        } />

        <Route path="/registros" element={
          <VerificarLogado>
            <Registros />
          </VerificarLogado>
        } />

        <Route path="/registros/cadastrar" element={
          <VerificarLogado>
            <CadastrarRegistro />
          </VerificarLogado>
        } />

        <Route path="/armeiros" element={
          <VerificarLogado>
            <Armeiros />
          </VerificarLogado>
        } />

        <Route path='/editar-perfil' element={
          <VerificarLogado>
            <EditarPerfil />
          </VerificarLogado>
        } />

        <Route path="/alterar-senha" element={
          <VerificarLogado>
            <AlterarSenha />
          </VerificarLogado>
        } />

        <Route path="*" element={<div>404</div>} />

      </Routes>

    </BrowserRouter>
  )
}
