import React, { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  IconButton,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'

export default function(props) {
  const classes = styleObject()
  const { specie } = props
  const [auxSpecie, setAuxSpecie] = useState(specie)
  const [index, setIndex] = useState(0)

  const handleAddFormChange = (event) => {
    const auxValues = { ...auxSpecie }
    auxValues[event.target.name] = event.target.value
    setAuxSpecie(auxValues)
  }

  const handleArrowBack = () => {
    setIndex(index-1)
  }

  const handleArrowForward = () => {
    setIndex(index+1)
  }

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }

  const saveChanges = () => {
    console.log('works')
  }

  return (
    <form onSubmit={handleFormSubmit(saveChanges)} autoComplete="off">
      <TextField
        required id="scientificName" name="scientificName"
        onChange={handleAddFormChange} value={auxSpecie.scientificName}
        className={classes.input} variant="outlined"
        label="Nome científico"
      />

      <Divider/>

      <Grid container justify="space-between" alignItems="center" style={{marginTop: '10px'}}>
        <Grid item style={{float: 'left'}}>
          <Typography variant="overline">
            <strong>Descrição Nº {index+1}</strong>
          </Typography>
        </Grid>
        <Grid container style={{width: 'fit-content'}}>
          <Grid item>
            <IconButton className={classes.descriptionsArrow} onClick={handleArrowBack}
              disabled={(index-1 < 0)?true:false}>
              <ArrowBackIos />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton className={classes.descriptionsArrow} onClick={handleArrowForward}
            disabled={(index+1 >= specie.descriptions.length)?true:false}>
              <ArrowForwardIos />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <TextField
        fullWidth required multiline rows={10}
        id="itemDescription" name="itemDescription" value={auxSpecie.descriptions[index].description}
        onChange={handleAddFormChange} className={classes.input}
        label="Descrição" variant="outlined"
      />

      <TextField
        fullWidth required multiline rows={3}
        id="itemReference" name="itemReference" value={auxSpecie.descriptions[index].reference}
        onChange={handleAddFormChange} className={classes.input}
        label="Referência (coloque nas normas da ABNT)" variant="outlined"
      />

      <Button type="submit" variant="contained" className={classes.btn} color="primary">
        Salvar alterações
      </Button>
    </form>
  )
}