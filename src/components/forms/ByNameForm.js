import React from 'react'
import {
  TextField
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { styleObject } from '../../assets/styleObject.js'

export default function ByNameForm(props) {
  const classes = styleObject()

  return (
    <div>
      <Autocomplete
        fullWidth required id="itemName" name="itemName"
        className={classes.input} options={props.speciesList}
        onChange={(event, newValue) => {
          (newValue == null)?props.setQueryResultList([]):props.setQueryResultList([newValue])
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