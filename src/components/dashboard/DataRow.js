import React from 'react'
import {
  Box,
  Collapse,
	IconButton,
  Grid,
  TableCell,
	TableRow,
  Typography,
} from '@material-ui/core'
import { Delete, Description, Edit } from '@material-ui/icons';

export default function DataRow(props) {
	const { specie } = props;
	const [open, setOpen] = React.useState(false);

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
						<IconButton aria-label="descrição" size="small" onClick={() => setOpen(!open)}>
							<Description style={{color: "#3975B8"}}/>
						</IconButton>
						<IconButton aria-label="editar" size="small" disabled>
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
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="body" gutterBottom component="div">
								{specie.descriptions[0].description}
							</Typography>
							<Typography variant="caption" style={{textAlign: 'justify', fontWeight: 'bold'}}>
								{specie.descriptions[0].reference}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}