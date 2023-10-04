import React, { useContext, useState } from 'react'
import HOST from '../../services/host'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { ToasterContext } from '../../Context/ToasterContext'

export default function ModalFabricantes(props) {

  const { toast } = useContext(ToasterContext)

  const [open, setOpen] = useState(false)

  const [nome, setNome] = useState('')

  async function adicionarFabricante() {

    if (!nome) {
      toast.error('Preencha o campo nome')
      return
    }

    const toastAddFabricante = toast.loading('Adicionando fabricante...')    
    const response = await fetch(HOST + 'fabricante', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome
      })
    })

    setNome('')

    const dataResponse = await response.json()

    if (response.ok) {
      props.getFabricantes()
      toast.success("Fabricante Adicionado", {
        id: toastAddFabricante
      })
      return
    }

    toast.error(dataResponse.error, {
      id: toastAddFabricante
    })

    

  }

  async function deletarFabricante(id) {

    const toastDeleteFabricante = toast.loading("Deletando fabricante...")

    const response = await fetch(HOST + 'fabricante/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    })

    const dataResponse = await response.json()

    if (response.ok) {
      props.getFabricantes()
      toast.success("Fabricante excluido",{
        id: toastDeleteFabricante
      })
      return
    }

    toast.error(dataResponse.error,{
      id: toastDeleteFabricante
    })

  }


  return (
    <>
      <div className='w-full pt-2'>
        <Button variant="contained" color='info' className='w-full' onClick={() => { setOpen(true) }}>Adicionar Fabricante</Button>
      </div>


      {

        open &&

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Gerir Fabricantes Cadastrados"}
          </DialogTitle>
          <DialogContent>
            <div className='w-full flex justify-center items-center gap-4 py-2'>
              <TextField size="small" label="Nome do Fabricante" variant="outlined" className='w-56' value={nome} onChange={(e) => setNome(e.target.value)} />
              <Button onClick={adicionarFabricante} variant='contained' size="small">Adicionar</Button>
            </div>

            <div className='flex flex-col  gap-1'>
              {

                props.fabricantes.map((fabricante, index) => {
                  return (
                    <div key={index} className='w-full h-10 flex bg-slate-100 justify-center items-center'>
                      <p className='w-3/5  px-2 flex items-center'>{fabricante.nome}</p>
                      <Button variant='contained' size="small" color='error' onClick={() => { deletarFabricante(fabricante.id)}}>Excluir</Button>
                    </div>
                  )
                }
                )}

            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      }


    </>
  )
}
