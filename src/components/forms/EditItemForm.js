import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  IconButton,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import SnackAlert from '../common/SnackAlert'

import { getItemByName, setItemDetails } from '../../utils/firebase.js'
import { styleObject } from '../../assets/styleObject.js'

export default function(props) {
  const classes = styleObject()
  const { specie } = props
  const [auxSpecie, setAuxSpecie] = useState(specie)
  const [index, setIndex] = useState(0)

  const [flag, setFlag] = useState({})

  const handleEditFormChange = (event) => {
    const auxValues = { ...auxSpecie }
    auxValues[event.target.name] = event.target.value

    if(auxValues.auxDescription && !auxValues.auxReference) {
      auxValues.descriptions[index] = {
        description: auxValues.auxDescription,
        reference: auxValues.descriptions[index].reference
      }
    } else if(!auxValues.auxDescription && auxValues.auxReference) {
      auxValues.descriptions[index] = {
        description: auxValues.descriptions[index].description,
        reference: auxValues.auxReference
      }
    }

    delete auxValues['itemDescription']
    delete auxValues['itemReference']
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
    getItemByName('species', auxSpecie.scientificName, (dataFromFirebase) => {
      const firebaseKey = Object.keys(dataFromFirebase)

      setItemDetails('species', firebaseKey[0], auxSpecie)
      .then(() => setFlag({open: true, severity: 'success', alertTitle: 'Dados modificados com sucesso!'}))
      .catch((err) => setFlag({open: true, severity: 'error', alertTitle: 'Ocorreu um erro.', alertText: err.message}))
    })
  }

  return (
    <form onSubmit={handleFormSubmit(saveChanges)} autoComplete="off">
      <SnackAlert flag={flag}/>

      <TextField
        required id="scientificName" name="scientificName"
        defaultValue={auxSpecie.scientificName} value={auxSpecie.scientificName}
        onChange={handleEditFormChange}
        className={classes.input} variant="outlined"
        label="Nome científico"
      />

      <Divider/>

      <Grid container justify="space-between" alignItems="center" style={{marginTop: '10px'}}>
        <Grid item>
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
        id="auxDescription" name="auxDescription" defaultValue={auxSpecie.descriptions[index].description}
        value={auxSpecie.descriptions[index].description}
        className={classes.input} onChange={handleEditFormChange}
        label="Descrição" variant="outlined"
      />

      <TextField
        fullWidth required multiline rows={3}
        id="auxReference" name="auxReference" defaultValue={auxSpecie.descriptions[index].reference}
        value={auxSpecie.descriptions[index].reference}
        className={classes.input} onChange={handleEditFormChange}
        label="Referência (coloque nas normas da ABNT)" variant="outlined"
      />

      <Button type="submit" variant="contained" className={classes.btn} color="primary">
        Salvar alterações
      </Button>
    </form>
  )
}