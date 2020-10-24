import React, { useEffect } from 'react'
import {
  TextField
} from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { styleObject } from '../../assets/styleObject.js'

const filter = createFilterOptions()

export default function ByNameForm(props) {
  const classes = styleObject()
  let queryResultList;

  useEffect(() => {
    console.log('props', props)
  }, [])
  return (
    <div>
      <Autocomplete
        required id="itemName" name="itemName" className={classes.input}
        value={queryResultList} options={props.specieList}
        onChange={(event, newValue) => {
          console.log(newValue)
          //props.setQueryResultList([newValue])
        }}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.scientificName
        }}
        renderInput={(params) => <TextField {...params} label="Nome da espécie" variant="outlined" />}
      />
    </div>
  )
}