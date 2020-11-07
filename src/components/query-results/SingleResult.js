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

export default function SingleResult(props) {
  const classes = styleObject()
  const [specieFamily, setSpecieFamily] = useState({})

  useEffect(() => {
    console.log(props.specie, specieFamily)
    getFamilyByKey(props.specie.familyKey, (dataFromFirebase) => {
      console.log('dataFromFirebase', dataFromFirebase)
      const auxFamily = Object.entries(dataFromFirebase)
      setSpecieFamily(auxFamily[0][1])
      console.log(auxFamily[0][1])
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
            props.specie.descriptions.map((d) => {
              return(
                <DescriptionItem d={d}/>
              )
            })
          }
        </List>        
      </CardContent>
    </Card>
  )
}

function DescriptionItem(props) {
  const [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.d.reference}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.d.description}
      </Collapse>
    </React.Fragment>
  )
}