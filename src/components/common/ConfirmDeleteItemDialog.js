import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

import { deleteItem, getItemByName } from '../../utils/firebase.js'

export default function ConfirmDeleteItemDialog(props) {
  const {open, handleClose, itemName, setFlag} = props

  const confirmed = () => {
    handleClose()
    getItemByName('species', itemName, (dataFromFirebase) => {
      const firebaseKey = Object.keys(dataFromFirebase)
      
      deleteItem('species', firebaseKey[0])
      .then(() => setFlag({open: true, severity: 'success', alertTitle: 'Item excluído com sucesso!'}))
      .catch((err) => setFlag({open: true, severity: 'error', alertTitle: 'Ocorreu um erro.', alertText: err.message}))
    })
    
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Excluir {itemName}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Todos os dados referentes a esse item serão deletados permanentemente.
          Não será possível recuperá-los.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={confirmed} style={{borderColor: '#B82114', color: '#B82114'}}>
          Excluir
        </Button>
        <Button variant="contained" onClick={handleClose} color="secondary" autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}