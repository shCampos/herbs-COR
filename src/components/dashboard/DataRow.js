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

import DescriptionListItem from '../common/DescriptionListItem'
import EditItemForm from '../forms/EditItemForm'

export default function DataRow(props) {
	const classes = styleObject()
	const { specie } = props
	const [expanded, setExpanded] = useState({edit: false, view: false})

	return (
		<React.Fragment>
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
							<IconButton size="small" disabled>
								<Delete/>
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
		</React.Fragment>
	)
}
