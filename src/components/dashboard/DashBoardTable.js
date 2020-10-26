import React from 'react'
import {
  Box,
  Collapse,
  IconButton,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core'

import { Delete, Description, Edit } from '@material-ui/icons';
import { styleObject, useRowStyles } from '../../assets/styleObject.js'

export default function DashboardTable(props) {
	const classes = styleObject()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
	}
	
	return (
		<Paper>
			<TableContainer className={classes.tableDashboard}>
				<Table stickyHeader className={classes.table} small>
					<TableHead>
						<TableRow>
							<TableCell>Espécie</TableCell>
							<TableCell>Família</TableCell>
							<TableCell align="center">Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.speciesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((specie) => {
							const family = props.familiesList.filter((family)=>family.key === specie.familyKey)
							return (                
								<Row specie={{...specie, familyName: family[0].name}}/>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={props.speciesList.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}
function Row(props) {
	const { specie } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell component="th" scope="row">
					{specie.scientificName}
				</TableCell>
				<TableCell>{specie.familyName}</TableCell> 
				<TableCell>
					<Grid container direction="row">            
						<IconButton aria-label="descrição" size="small" onClick={() => setOpen(!open)}>
							<Description style={{color: "#3975B8"}}/>
						</IconButton>
						<IconButton aria-label="editar" size="small" onClick={() => setOpen(!open)}>
							<Edit style={{color: "#B85014"}}/>
						</IconButton>
						<IconButton aria-label="excluir" size="small" onClick={() => setOpen(!open)}>
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
								{specie.description}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}