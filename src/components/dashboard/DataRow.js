import React, { useState } from 'react'
import {
  Box,
	Collapse,
	IconButton,
	Grid,
	List,
  TableCell,
	TableRow,
  Typography,
} from '@material-ui/core'
import { Delete, Description, Edit } from '@material-ui/icons'
import DescriptionListItem from '../common/DescriptionListItem'
import EditItemForm from '../forms/EditItemForm'

export default function DataRow(props) {
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
					<Grid container direction="row">            
						<IconButton aria-label="descrição" size="small" onClick={() => setExpanded({edit: false, view: !expanded.view})}>
							<Description style={{color: "#3975B8"}}/>
						</IconButton>
						<IconButton aria-label="editar" size="small" onClick={() => setExpanded({edit: !expanded.edit, view: false})}>
							<Edit style={{color: "#B85014"}}/>
						</IconButton>
						<IconButton aria-label="excluir" size="small" disabled>
							<Delete color="error"/>
						</IconButton>
					</Grid>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={expanded.view} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<List>
								{
									props.specie.descriptions.map((d) => {
										return(
											<DescriptionListItem d={d}/>
										)
									})
								}
							</List>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={expanded.edit} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<EditItemForm specie={specie}/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}
