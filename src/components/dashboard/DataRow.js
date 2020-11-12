import React, { useState } from 'react'
import {
	Collapse,
	IconButton,
	Grid,
	List,
  TableCell,
	TableRow,
	Tooltip,
} from '@material-ui/core'
import { Delete, Description, Edit } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'

import ConfirmDeleteItemDialog from '../common/ConfirmDeleteItemDialog'

import DescriptionListItem from '../common/DescriptionListItem'
import EditItemForm from '../forms/EditItemForm'
import SnackAlert from '../common/SnackAlert'

export default function DataRow(props) {
	const classes = styleObject()
	const { specie } = props
	const [expanded, setExpanded] = useState({edit: false, view: false})
	const [flag, setFlag] = useState({})

	const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
	}
	
	return (
		<React.Fragment>
			<SnackAlert flag={flag} />

			<TableRow>
				<TableCell component="th" scope="row">
					{specie.scientificName}
				</TableCell>
				<TableCell component="th" scope="row">
					{specie.familyName}
				</TableCell> 
				<TableCell component="th" scope="row">
					<Grid container direction="row" justify="center" alignItems="center">
						<Tooltip title="Mostrar a descrição">
							<IconButton size="small" color="secondary" onClick={() => setExpanded({edit: false, view: !expanded.view})}>
								<Description />
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar">
							<IconButton size="small" color="secondary" onClick={() => setExpanded({edit: !expanded.edit, view: false})} disabled>
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip time="Excluir">
							<IconButton size="small" color="error" onClick={handleClickOpen} disabled>
								<Delete />
							</IconButton>
						</Tooltip>
					</Grid>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={expanded.view} timeout="auto" unmountOnExit className={classes.collapse}>
						<List>
							{
								specie.descriptions.map((d) => {
									return(
										<DescriptionListItem d={d}/>
									)
								})
							}
						</List>
					</Collapse>
				</TableCell>
			</TableRow>
			
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={expanded.edit} timeout="auto" unmountOnExit className={classes.collapse}>
						<EditItemForm specie={specie}/>
					</Collapse>
				</TableCell>
			</TableRow>

			<ConfirmDeleteItemDialog
				open={open}
				handleClose={handleClose}
				itemName={specie.scientificName}
				setFlag={setFlag}
			/>
		</React.Fragment>
	)
}