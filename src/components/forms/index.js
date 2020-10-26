import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'

import ByDescriptionForm from './ByDescriptionForm.js'
import ByNameForm from './ByNameForm.js'

const handleFormSubmit = callback => event => {
  event.preventDefault()
  callback()
}

export function SearchForm(props) {
  return (
    <div style={{width: '100%'}}>
      {(props.queryType === 'name' && props.speciesList.length)?(
        <ByNameForm
          queryItem={props.queryItem}
          speciesList={props.speciesList}
          setQueryResultList={props.setQueryResultList}
        />
      ):(
        <ByDescriptionForm
          queryItem={props.queryItem}
          familiesList={props.familiesList}
          speciesList={props.speciesList}
          setQueryResultList={props.setQueryResultList}
        />
      )}
    </div>
  )
}

export function AddForm(props) {
  const classes = styleObject()

  const [newItem, setNewItem] = useState({})
  const handleAddFormChange = (event) => {
    const auxValues = { ...newItem }
    auxValues[event.target.name] = event.target.value
    setNewItem(auxValues)
  }

  const addFormSubmit = () => {
    console.log('foi')
  }

  const [searchFlags, setSearchFlags] = useState({
    nameSearched: false
  })

  const searchNames = () => {
    console.log('newItem', newItem)
    //search on bd
      //search on gbif
    setSearchFlags({nameSearched: true})
  }
  
  return (
    <form onSubmit={handleFormSubmit(addFormSubmit)} autoComplete="off">
      {/* <Grid container fullWidth style={{marginBottom: '10px'}}>
        {(flagAlert.sucessSendDescription)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="success">Descrição enviada ao banco de dados.</Alert>
        )}
        {(flagAlert.errorSendDescription)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="error">Erro em enviar descrição ao banco de dados.</Alert>
        )}
        {(flagAlert.missingParams)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="error">A família ou o gênero está faltando.</Alert>
        )}
        {(flagAlert.withoutAuthor)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="warning">Coloque o autor.</Alert>
        )}
        {(flagAlert.specieInDb)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="warning">Essa espécie já foi inclusa no banco de dados.</Alert>
        )}
      </Grid> */}
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            required id="itemFamily" name="itemFamily"
            onChange={handleAddFormChange} value={newItem.itemFamily}
            className={classes.input} label="Nome da família" variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            required id="itemName" name="itemName"
            onChange={handleAddFormChange} value={newItem.itemName}
            className={classes.input} variant="outlined"
            label={props.queryItem==='specie'?"Nome da espécie":"Nome do gênero"}
          />
        </Grid>
        <Grid item>
          <IconButton variant="contained" color="primary" onClick={searchNames} style={{width: 'min-content', height: 'min-content'}}>
            <Search/>
          </IconButton>
        </Grid>
      </Grid>

      <TextField
        fullWidth required multiline rows={10} disabled={!searchFlags.nameSearched}
        id="itemDescription" name="itemDescription" value={newItem.itemDescription}
        onChange={handleAddFormChange} className={classes.input}
        label="Descrição" variant="outlined"
      />
      <TextField
        fullWidth required multiline rows={3} disabled={!searchFlags.nameSearched}
        id="itemReference" name="itemReference" value={newItem.itemReference}
        onChange={handleAddFormChange} className={classes.input}
        label="Referência (coloque nas normas da ABNT)" variant="outlined"
      />
      <Button type="submit" variant="contained" className={classes.btn} color="primary"
        disabled={!searchFlags.nameSearched}>
        Enviar
      </Button>
    </form>
  )
}