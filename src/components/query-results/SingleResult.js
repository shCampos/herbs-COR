import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'
import { getFamilyByKey } from '../../utils/firebase.js'

import DescriptionListItem from '../common/DescriptionListItem'

export default function SingleResult(props) {
  const classes = styleObject()
  const { specie } = props
  const [specieFamily, setSpecieFamily] = useState({})

  useEffect(() => {
    getFamilyByKey(specie.familyKey, (dataFromFirebase) => {
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
            <i>{specie.scientificName.split(' ').slice(0,2).join(' ')} </i>
            {specie.scientificName.split(' ').slice(2).join(' ')}
          </span>
        }
        subheader={
          <React.Fragment>
            {(specieFamily.scientificName)&&(
              <span>{specieFamily.scientificName.toUpperCase()}</span>
            )}              
          </React.Fragment>
        }
      />
      <CardContent style={{width: '100%'}}>
        <List>
          {
            specie.descriptions.map((d) => {
              return(
                <DescriptionListItem d={d}/>
              )
            })
          }
        </List>
      </CardContent>
    </Card>
  )
}
