import React, { useContext, useState } from 'react'
import HOST from '../../services/host'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { ToasterContext } from '../../Context/ToasterContext'

export default function ModalBatalhoes(props) {
    const [open, setOpen] = useState(false)

    const [nome, setNome] = useState('')

    const { toast } = useContext(ToasterContext)

    async function adicionarBatalhao() {

        if (!nome) {
            toast.error("Preencha o campo nome")
            return
        }

        const toastAddBatalhao = toast.loading("Adicionando batalhão...")
        const response = await fetch(HOST + 'batalhao', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome
            })
        })

        const dataResponse = await response.json()

        if (response.ok) {
            props.getBatalhoes()
            setNome('')
            toast.success("Batalhão adicionado",{
                id: toastAddBatalhao
            })
            return
        }

        toast.error(dataResponse.error, {
            id: toastAddBatalhao
        })

    }

    async function deletarBatalhao(id) {

        const toastDeletarBatalhao = toast.loading("Deletando batalhão...")
        const response = await fetch(HOST + 'batalhao/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })

        const dataResponse = await response.json()

        if (response.ok) {
            props.getBatalhoes()
            toast.success("Batalhão deletado", {
                id: toastDeletarBatalhao
            })
            return
        }

        toast.error(dataResponse.error, {
            id: toastDeletarBatalhao
        })

    }

    return (
        <>

            <div className='w-full pt-2'>
                <Button variant="contained" color='info' className='w-full' onClick={() => { setOpen(true) }}>Adicionar Batalhão</Button>
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Gerir Batalhões Cadastrados"}
                </DialogTitle>
                <DialogContent>
                    <div className='w-full flex justify-center items-center gap-4 py-2'>
                        <TextField size="small" label="Nome do Batalhão" variant="outlined" className='w-56' value={nome} onChange={(e) => setNome(e.target.value)} />
                        <Button onClick={adicionarBatalhao} variant='contained' size="small">Adicionar</Button>
                    </div>

                    <div className='flex flex-col  gap-1'>
                        {

                            props.batalhoes.map((batalhao, index) => {
                                return (
                                    <div key={index} className='w-full h-10 flex bg-slate-100 justify-between items-center'>
                                        <p className='px-2 flex items-center whitespace-nowrap'>{batalhao.nome}</p>
                                        <Button variant='contained' size="small" color='error' onClick={() => { deletarBatalhao(batalhao.id) }}>Excluir</Button>
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

        </>
    )
}
