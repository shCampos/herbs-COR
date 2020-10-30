import React, { useRef, useState } from 'react'
import {
  Box,
  Collapse,
	IconButton,
	InputAdornment,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
	TableRow,
	TextField,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete, Description, Edit, FilterList } from '@material-ui/icons';

import { styleObject } from '../../assets/styleObject.js'

export default function DashboardTable(props) {
	const classes = styleObject()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
	}
	
	const [currentSpeciesList, setCurrentSpeciesList] = useState(props.speciesList)
	const [currentSpeciesListIsEmpty, setCurrentSpeciesListIsEmpty] = useState(false)

	return (
		<Paper>
			{(currentSpeciesListIsEmpty)&&(
				<Alert severity="warning" variant="filled" style={{width: '100%'}}>Não foi encontrada nenhuma espécie!</Alert>
			)}
			<TableContainer className={classes.tableDashboard}>
				<Table stickyHeader className={classes.table} size="small">
					<TableHead>
						<TableRow style={{width: '100%'}}>
							<TableCell>Espécie</TableCell>
							<TableCell>Família</TableCell>
							<TableCell align="center">Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<FilterRow
							speciesList={props.speciesList}
							familiesList={props.familiesList}
							currentSpeciesList={currentSpeciesList}
							setCurrentSpeciesList={setCurrentSpeciesList}
							setCurrentSpeciesListIsEmpty={setCurrentSpeciesListIsEmpty}
						/>
						{currentSpeciesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((specie) => {
							const family = props.familiesList.filter((family)=>family.key === specie.familyKey)
							return (                
								<DataRow
								specie={{...specie, familyName: family[0].scientificName}}/>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				labelRowsPerPage="Espécies por página:"
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={currentSpeciesList.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

function FilterRow(props) {
	const classes = styleObject()

	const handleSpecieNameChange = (event) => {
		let auxCurrentSpeciesList = []
		props.currentSpeciesList.map((specie) => {
			if(specie.scientificName.includes(event.target.value)) {
				auxCurrentSpeciesList.push(specie)
			}
		})
		if(auxCurrentSpeciesList.length == 0) {
			props.setCurrentSpeciesListIsEmpty(true)
			props.setCurrentSpeciesList(props.speciesList)
		} else {
			props.setCurrentSpeciesListIsEmpty(false)
			props.setCurrentSpeciesList(auxCurrentSpeciesList)
		}
	}

	const handleFamilyNameChangeName = (event) => {
		let auxCurrentSpeciesList = []
		props.familiesList.map((family) => {			
			if(family.name.includes(event.target.value)) {
				auxCurrentSpeciesList = props.currentSpeciesList.filter((specie) => specie.familyKey == family.key)
			}
		})
		if(auxCurrentSpeciesList.length == 0) {
			props.setCurrentSpeciesListIsEmpty(true)
			props.setCurrentSpeciesList(props.speciesList)
		} else {
			props.setCurrentSpeciesListIsEmpty(false)
			props.setCurrentSpeciesList(auxCurrentSpeciesList)
		}
	}

	return (
		<React.Fragment>
			<TableRow>
				<TableCell component="th" scope="row">
					<TextField
						fullWidth id="specieNameFilterParam" name="specieNameFilterParam"
						onChange={handleSpecieNameChange} className={classes.input}
						label="Filtrar pela espécie" size="small"
					/>
				</TableCell>
				<TableCell>
				<TextField
						fullWidth id="familyNameFilterParam" name="familyNameFilterParam"
						onChange={handleFamilyNameChangeName} className={classes.input}
						label="Filtrar pela família" size="small"
					/>
				</TableCell>
				<TableCell></TableCell>
			</TableRow>
		</React.Fragment>
	)
}

function DataRow(props) {
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