import React from 'react'
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { styleObject } from '../../assets/styleObject.js'

export default function MultipleResults(props) {
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
                  <Avatar className={classes.avatar}>{specieRating}%</Avatar>
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