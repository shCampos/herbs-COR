import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Grid,
  LinearProgress,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Search } from '@material-ui/icons'

import { styleObject } from '../../assets/styleObject.js'
import { compareTwoStrings } from 'string-similarity'
import { searchSpecieName } from '../../utils/gbif.js'

import ByDescriptionForm from './ByDescriptionForm.js'
import ByNameForm from './ByNameForm.js'

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
  const [searchFlags, setSearchFlags] = useState({})

  const [newItem, setNewItem] = useState({})
  const handleAddFormChange = (event) => {
    setSearchFlags({nameSearched: false, withoutAuthor: false})

    const auxValues = { ...newItem }
    auxValues[event.target.name] = event.target.value
    setNewItem(auxValues)
    
    if(!/(\w+\s){2}.{1,}/.test(auxValues.itemName)) {
      setSearchFlags({withoutAuthor: true})
    } else {
      props.speciesList.map((specie) => {
        if(compareTwoStrings(auxValues.itemName, specie.scientificName) > 0.9) {
          setSearchFlags({specieInDb: true})
          console.log(specie)
        }
      })
    }
  }

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }

  const addFormSubmit = () => {
    console.log('foi')
  }

  //const [queryResponse, setQueryResponse] = useState({})
  const searchNames = () => {
    if(!searchFlags.specieInDb) {
      setSearchFlags({willSearch: true})
      searchSpecieName(newItem.itemName, (response) => {
        if(response.usageKey === 6) {
          setSearchFlags({specieNotFoundInGBIF: true})
        } else if (response.synonym) {
          setSearchFlags({isSynonymous: true})
        } else {
          setSearchFlags({willSearch: false, nameSearched: true})
          setNewItem({itemName: response.scientificName, gbifKey: response.usageKey})
        }
      })
    }
  }
  
  return (
    <form onSubmit={handleFormSubmit(addFormSubmit)} autoComplete="off">
      <Grid container style={{marginBottom: '10px'}}>
        {(searchFlags.specieNotFoundInGBIF)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity="error">
            Espécie não existente. Digite o nome corretamente ou use o nome aceito.
          </Alert>
        )}
        {(searchFlags.withoutAuthor)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity="warning">
            A pesquisa funcionará melhor se você colocar a autoridade.
          </Alert>
        )}
        {(searchFlags.specieInDb)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity="info">
            Essa espécie já foi inclusa no banco de dados, mas você pode adicionar uma nova descrição.
          </Alert>
        )}
        {(searchFlags.willSearch)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity="info">
            <AlertTitle>Pesquisando espécie no GBIF...</AlertTitle>
            <LinearProgress color="secondary"/> 
          </Alert>
        )}
        {(searchFlags.isSynonymous)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity="warning">
            Você digitou um sinônimo. Dê uma olhada em <a href="https://www.tropicos.org/" target="_blank" className={classes.link}>Trópicos</a> e use o nome aceito.
          </Alert>
        )}
        {(searchFlags.sucessSendDescription)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="success">
            Descrição enviada ao banco de dados.
          </Alert>
        )}
        {(searchFlags.errorSendDescription)&&(
          <Alert variant="filled" style={{width: '100%'}} severity="error">
            Erro em enviar descrição ao banco de dados.
          </Alert>
        )}
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={11}>
          <TextField
            required id="itemName" name="itemName"
            onChange={handleAddFormChange} value={newItem.itemName}
            className={classes.input} variant="outlined"
            label="Nome científico"
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Pesquisar o nome correto">
            <IconButton color="primary" onClick={searchNames} style={{width: 'min-content', height: 'min-content'}}>
              <Search/>
            </IconButton>
          </Tooltip>
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