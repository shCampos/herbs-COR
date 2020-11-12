import React, { useState } from 'react'
import {
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Grid,
	List,
  TableCell,
	TableRow,
	Tooltip,
} from '@material-ui/core'
import { Delete, Description, Edit } from '@material-ui/icons'
import { styleObject } from '../../assets/styleObject.js'
import { deleteItem, getItemByName } from '../../utils/firebase.js'

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
							<IconButton size="small" onClick={() => setExpanded({edit: false, view: !expanded.view})}>
								<Description style={{color: "#3975B8"}}/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar">
							<IconButton size="small" onClick={() => setExpanded({edit: !expanded.edit, view: false})}>
								<Edit style={{color: "#B85014"}}/>
							</IconButton>
						</Tooltip>
						<Tooltip time="Excluir">
							<IconButton size="small" onClick={handleClickOpen}>
								<Delete color="error"/>
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

function ConfirmDeleteItemDialog(props) {
	const {open, handleClose, itemName, setFlag} = props

	const confirmed = () => {
		handleClose()
		getItemByName('species', itemName, (dataFromFirebase) => {
			const firebaseKey = Object.keys(dataFromFirebase)
			
      deleteItem('species', firebaseKey[0])
      .then(() => setFlag({open: true, severity: 'success', alertTitle: 'Item excluído com sucesso!'}))
      .catch((err) => setFlag({open: true, severity: 'error', alertTitle: 'Ocorreu um erro.', alertText: err.message}))
		})
		
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Deletar {itemName}?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Todos os dados referentes a esse item serão deletados permanentemente.
					Não será possível recuperá-los.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={confirmed} style={{borderColor: '#B82114', color: '#B82114'}}>
					Deletar
				</Button>
				<Button variant="contained" onClick={handleClose} color="secondary" autoFocus>
					Cancelar
				</Button>
			</DialogActions>
		</Dialog>
	)
}