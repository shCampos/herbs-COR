import React, {useState, useEffect} from 'react'
import {
  Button
} from '@material-ui/core'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import ByDescriptionForm from './ByDescriptionForm.js'
import ByNameForm from './ByNameForm.js'

const filter = createFilterOptions()

export function SearchForm(props) {
  return (
    <div>
      {(props.queryType == 'name')?(
        <ByNameForm queryItem={props.queryItem}/>
      ):(
        <ByDescriptionForm queryItem={props.queryItem}/>
      )}
    </div>
  )
}

export function AddForm(props) {
  return (
    <div>
      add {props.queryType}
    </div>
  )
}