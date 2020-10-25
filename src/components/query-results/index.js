import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { styleObject } from '../../assets/styleObject.js'
import { getFamilyByKey } from '../../utils/firebase.js'



export default function QueryResults(props) {
  return (
    <div>{(props.queryResultList.length > 1)?(
      <MultipleResults species={props.queryResultList}/>
    ):(
      <SingleResult specie={props.queryResultList[0]}/>
    )}</div>
  )
}

function SingleResult(props) {
  const classes = styleObject()
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

function MultipleResults(props) {
  const classes = styleObject()

  return (
    <List style={{paddingTop: '0px'}}>
      {
        props.species.map((specie) => {
          const specieName = specie.scientificName.split(' ').slice(0,2).join(' ')
          const specieAuthor = specie.scientificName.split(' ').slice(2).join(' ')
          const specieRating = Math.round(specie.rating*100)
          return (
            <div className={classes.listItemResult}>
              <ListItem style={{width: '100%'}}>
                <ListItemAvatar>
                  <Avatar className={classes.porcentagem}>{specieRating}%</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<span><font style={{fontStyle: 'italic'}}>{specieName}</font> {specieAuthor}</span>}
                  secondary="LINKS EXTERNOS EM IMPLEMENTAÇÃO"/>
              </ListItem>
              <Divider style={{width: '100%'}}/>
            </div>
          )
        })
      }
    </List>
  )
}