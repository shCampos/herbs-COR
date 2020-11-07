import React, { useState } from 'react'
import {
  Collapse,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export default function DescriptionListItem(props) {
  const { d } = props
  const [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={d.reference}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {d.description}
      </Collapse>
    </React.Fragment>
  )
}