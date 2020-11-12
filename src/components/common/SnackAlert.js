import React, { useState } from 'react'
import {
  Snackbar
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'


export default function SnackAlert(props) {
  const { flag } = props

  return (
    <Snackbar open={flag.open} autoHideDuration={1000}>
      <Alert severity={flag.severity}>
        <AlertTitle>{flag.alertTitle}</AlertTitle>
        {flag.alertText}
      </Alert>
    </Snackbar>
  )
}