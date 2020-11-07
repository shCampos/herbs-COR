import React, { useState } from 'react'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { getFamilyByKey } from '../../utils/firebase.js'

export default function SingleResult(props) {
  const [specieFamily, setSpecieFamily] = useState({})

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
        subheader={() => {          
          getFamilyByKey(props.specie.familyKey, (dataFromFirebase) => {
            const auxFamily = Object.entries(dataFromFirebase)
            setSpecieFamily(auxFamily[0][1])
            console.log(auxFamily[0][1])
          })
          return(
            <span>{specieFamily.name.toUpperCase()}</span>
          )
        }}
      />
      <CardContent style={{width: '100%'}}>
        <List>
          {
            props.specie.descriptions.map((d) => {
              return(
                <DescriptionItem d={d}/>
              )
            })
          }
        </List>
        <Typography variant="body1" component="p" style={{textAlign: 'justify'}}>
          {props.specie.descriptions[0].description}
        </Typography>
        
      </CardContent>

      <CardActions>
        <Typography variant="caption" style={{textAlign: 'justify', fontWeight: 'bold'}}>
          {props.specie.descriptions[0].reference}
        </Typography>
      </CardActions>
    </Card>
  )
}

function DescriptionItem(props) {
  const [open, setOpen] = useState(false)
  
  return (
    <React.Fragment>
      <ListItem button onClick={setOpen(!open)}>
        <ListItemText primary={props.d.reference}/>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.d.description}
      </Collapse>
    </React.Fragment>
  )
}