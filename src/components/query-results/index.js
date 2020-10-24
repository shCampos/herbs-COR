import React, { useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'

import { getFamilyByKey } from '../../utils/firebase.js'

export default function QueryResults(props) {
  return (
    <div>{(props.queryResultList.length > 1)?(
      <MultipleResults/>
    ):(
      <SingleResult specie={props.queryResultList[0]}/>
    )}</div>
  )
}

function SingleResult(props) {
  const [specieFamily, setSpecieFamily] = useState({})
  useEffect(() => {
    getFamilyByKey(props.specie.familyKey, (dataFromFirebase) => {
      const auxFamily = Object.entries(dataFromFirebase)
      setSpecieFamily(auxFamily[0][1])
    })
  }, [])

  return (
    <Card variant="outlined" style={{width: '100%'}}>
      <CardHeader
        style={{paddingBottom: '0px'}}
        title={
          <span>
            <i>{props.specie.scientificName.split(' ').slice(0,2).join(' ')} </i>
            {props.specie.scientificName.split(' ').slice(2).join(' ')}
          </span>
        }
        subheader={specieFamily.name.toUpperCase()}
      />
      <CardContent style={{width: '100%'}}>                          
        <Typography variant="body1" component="p" style={{textAlign: 'justify'}}>
          {props.specie.description}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Typography variant="caption" style={{textAlign: 'justify', fontWeight: 'bold'}}>
          {props.specie.reference}
        </Typography>
      </CardActions>
    </Card>
  )
}

function MultipleResults() {
  return (
    <div>b</div>
  )
}