import React, { useEffect, useState } from 'react'
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
import { searchByName } from '../../utils/gbif.js'
import { getItemByName, postOtherItemDescription } from '../../utils/firebase.js'
import { sendNewItemToDB } from '../../utils/crossroads.js'

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

export function AddForm() {
  const classes = styleObject()
  const [searchFlags, setSearchFlags] = useState({})

  const [commsDbFlag, setCommsDbFlag] = useState({})
  useEffect(() => {
    if(commsDbFlag.situation == 'success') {
      setSearchFlags({firebaseFeedback: true})
      setTimeout(() => setSearchFlags({firebaseFeedback: false}), 8000)
    }
    if(commsDbFlag.situation == 'error') {
      setSearchFlags({firebaseFeedback: true})
      setTimeout(() => setSearchFlags({firebaseFeedback: false}), 8000)
    }
  }, [commsDbFlag])

  const [newItem, setNewItem] = useState({})
  const handleAddFormChange = (event) => {
    setSearchFlags({...searchFlags, withoutAuthor: false, isSynonymous: false})

    const auxValues = { ...newItem }
    auxValues[event.target.name] = event.target.value
    setNewItem(auxValues)

    if(!/(\w+\s){2}.{1,}/.test(auxValues.scientificName)) {
      setSearchFlags({...searchFlags, withoutAuthor: true})
    }
  }

  const searchName = () => {
    setSearchFlags({...searchFlags, willSearch: true})
    searchInGBIF()
  }

  const searchInGBIF = () => {
    searchByName(newItem.scientificName, async (response) => {
      if(response.usageKey === 6) {
        setSearchFlags({...searchFlags, specieNotFoundInGBIF: true})
      } else if (response.synonym) {
        setSearchFlags({...searchFlags, isSynonymous: true})
      } else {
        setSearchFlags({...searchFlags, willSearch: false, nameSearched: true, isSynonymous: false})
        switch (response.rank) {
          case 'FAMILY':
            setNewItem({
              ...newItem,
              scientificName: response.scientificName,
              gbifKey: response.usageKey,
              rank: response.rank,
              databasePath: 'families'
            })
            break
          case 'GENUS':
            setNewItem({
              ...newItem,
              scientificName: response.scientificName,
              gbifKey: response.usageKey,
              rank: response.rank,
              familyName: response.family,
              familyGBIFKey: response.familyKey,
              databasePath: 'genera'
            })
            break
          case 'SPECIES':
            setNewItem({
              ...newItem,
              scientificName: response.scientificName,
              gbifKey: response.usageKey,
              rank: response.rank,
              familyName: response.family,
              familyGBIFKey: response.familyKey,
              genusName: response.genus,
              genusGBIFKey: response.genusKey,
              databasePath: 'species'
            })
            break
        }
      }
    })      
  }

  useEffect(() => {
    (newItem.gbifKey && !newItem.alreadySearched)&&
    getItemByName(newItem.databasePath, newItem.scientificName, (dataFromFirebase) => {
      if(dataFromFirebase === null || dataFromFirebase === undefined) {
        setSearchFlags({...searchFlags, specieInDb: false, nameSearched: true})
        setNewItem({...newItem, alreadySearched: true})
      } else {
        const firebaseKey = Object.keys(dataFromFirebase)
        setNewItem({...newItem, firebaseKey: firebaseKey[0], alreadySearched: true})
        setSearchFlags({...searchFlags, specieInDb: true, nameSearched: true})
      }
    })
  }, [newItem])

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }

  const formAddSubmit = () => {
    if(searchFlags.specieInDb) {
      postOtherItemDescription(newItem.databasePath, newItem.firebaseKey, {
        description: newItem.itemDescription,
        reference: newItem.itemReference
      })
      .then(() => setCommsDbFlag({
        situation: 'success',
        alertTitle: 'Descrição enviada para o banco de dados.'
      }))
      .catch((err) => setCommsDbFlag({
        situation: 'error',
        alertTitle: 'Ocorreu um erro.',
        alertText: err.message
      }))
    } else {
      sendNewItemToDB(newItem, (feedback) => {
        setCommsDbFlag(feedback)
      })
    }
  }
  
  return (
    <form onSubmit={handleFormSubmit(formAddSubmit)} autoComplete="off">
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
            Essa espécie já foi inclusa no banco de dados.
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
        {(searchFlags.firebaseFeedback)&&(
          <Alert variant="outlined" style={{width: '100%'}} severity={commsDbFlag.situation}>
            <AlertTitle>{commsDbFlag.alertTitle}</AlertTitle>
            {(commsDbFlag.alertText)&&(commsDbFlag.alertText)}
          </Alert>
        )}
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={11}>
          <TextField
            required id="scientificName" name="scientificName"
            onChange={handleAddFormChange} value={newItem.scientificName}
            className={classes.input} variant="outlined"
            label="Nome científico"
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Pesquisar o nome correto">
            <IconButton color="primary" onClick={searchName} style={{width: 'min-content', height: 'min-content'}}>
              <Search/>
            </IconButton>
         </Tooltip>
        </Grid>
      </Grid>

      <TextField
        fullWidth required multiline rows={10}
        id="itemDescription" name="itemDescription" value={newItem.itemDescription}
        onChange={handleAddFormChange} className={classes.input}
        label="Descrição" variant="outlined"
      />
      <TextField
        fullWidth required multiline rows={3}
        id="itemReference" name="itemReference" value={newItem.itemReference}
        onChange={handleAddFormChange} className={classes.input}
        label="Referência (coloque nas normas da ABNT)" variant="outlined"
      />
      <Button type="submit" variant="contained" className={classes.btn} color="primary"
        disabled={!searchFlags.nameSearched||searchFlags.specieNotFoundInGBIF}>
        Enviar
      </Button>
    </form>
  )
}