import React, { useState } from 'react'
import {
  Button,
  TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { styleObject } from '../../assets/styleObject.js'
import { compareDescriptions } from '../../utils/compareDescriptions.js'

export default function ByDescriptionForm(props) {
  const classes = styleObject()

  const [specieFamily, setSpecieFamily] = useState({})

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }

  const [itemDescription, setItemDescription] = useState('')
  const handleAddFormChange = (event) => {
    setItemDescription(event.target.value)
  }

  const searchSpecie = async () => {
    const auxQueryResultList = await compareDescriptions(itemDescription, props.speciesList)
    props.setQueryResultList(auxQueryResultList)
  }

  return (
    <form onSubmit={handleFormSubmit(searchSpecie)} autoComplete="off" style={{width: '100%'}}>
      <Autocomplete
        required
        id="family"
        value={specieFamily}
        onChange={(event, newValue) => {
          setSpecieFamily(newValue)
        }}
        options={props.familiesList}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.scientificName}
        renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
      />

      <TextField
        fullWidth required multiline rows={10}
        id="itemDescription" name="itemDescription" value={itemDescription}
        onChange={handleAddFormChange} className={classes.input}
        label="Descrição" variant="outlined"
      />

      <Button type="submit" variant="contained" className={classes.btn} color="primary">
        Enviar
      </Button>
    </form>
  )
}