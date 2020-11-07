import React, { useState } from 'react'
import {
  Button,
  TextField,
} from '@material-ui/core'
import { styleObject } from '../../assets/styleObject.js'

export default function(props) {
  const classes = styleObject()
  const { specie } = props
  const [auxSpecie, setAuxSpecie] = useState(specie)

  const handleAddFormChange = (event) => {
    const auxValues = { ...auxSpecie }
    auxValues[event.target.name] = event.target.value
    setAuxSpecie(auxValues)
  }

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }

  const saveChanges = () => {
    console.log('works')
  })

  return (
    <form onSubmit={handleFormSubmit(saveChanges)} autoComplete="off">
      <TextField
        required id="scientificName" name="scientificName"
        onChange={handleAddFormChange} value={auxSpecie.scientificName}
        className={classes.input} variant="outlined"
        label="Nome científico"
      />

      <Button type="submit" variant="contained" className={classes.btn} color="primary">
        Salvar alterações
      </Button>
    </form>
  )
}