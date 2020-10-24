import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Search } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'

import ByDescriptionForm from './ByDescriptionForm.js'
import ByNameForm from './ByNameForm.js'

const filter = createFilterOptions()

const handleFormSubmit = callback => event => {
  event.preventDefault()
  callback()
}

export function SearchForm(props) {
  return (
    <div>
      {(props.queryType == 'name')?(
        <ByNameForm queryItem={props.queryItem} speciesList={props.speciesList}/>
      ):(
        <ByDescriptionForm queryItem={props.queryItem} familiesList={props.familiesList}/>
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
    <form onSubmit={handleFormSubmit(addFormSubmit)} autoComplete="off" style={{width: '100%'}}>
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
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth required id="itemFamily" name="itemFamily"
            onChange={handleAddFormChange} value={newItem.itemFamily}
            className={classes.input} label="Nome da espécie com autor" variant="outlined"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth required id="itemName" name="itemName"
            onChange={handleAddFormChange} value={newItem.itemName}
            className={classes.input} variant="outlined"
            label={props.queryItem=='specie'?"Nome da espécie com autor":"Nome do gênero com autor"}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton variant="contained" onClick={searchNames} style={{width: 'min-content', height: 'min-content'}}>
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
      <Button type="submit" variant="contained" className={classes.btn} color="primary">
        Enviar
      </Button>
    </form>
  )
}