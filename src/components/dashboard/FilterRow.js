import React from 'react'
import {
  TableCell,
	TableRow,
	TextField,
} from '@material-ui/core'

import { styleObject } from '../../assets/styleObject.js'

export default function FilterRow(props) {
	const classes = styleObject()

	const handleSpecieNameChange = (event) => {
		let auxCurrentSpeciesList = []
		if(event.target.value === '') {
			props.setCurrentSpeciesList(props.speciesList)
		} else {
			props.currentSpeciesList.map((specie) => specie.scientificName.includes(event.target.value)&&auxCurrentSpeciesList.push(specie))
			if(auxCurrentSpeciesList.length === 0) {
				props.setCurrentSpeciesListIsEmpty(true)
				props.setCurrentSpeciesList(props.speciesList)
			} else {
				props.setCurrentSpeciesListIsEmpty(false)
				props.setCurrentSpeciesList(auxCurrentSpeciesList)
			}
		}
	}

	const handleFamilyNameChangeName = (event) => {
		let auxCurrentSpeciesList = []
		if(event.target.value === '') {
			props.setCurrentSpeciesList(props.speciesList)
		} else {
			props.familiesList.map((family) => {			
				if(family.scientificName.includes(event.target.value)) {
					auxCurrentSpeciesList = props.currentSpeciesList.filter((specie) => specie.familyKey === family.key)
				}
			})
			if(auxCurrentSpeciesList.length === 0) {
				props.setCurrentSpeciesListIsEmpty(true)
				props.setCurrentSpeciesList(props.speciesList)
			} else {
				props.setCurrentSpeciesListIsEmpty(false)
				props.setCurrentSpeciesList(auxCurrentSpeciesList)
			}
		}
	}

	return (
		<React.Fragment>
			<TableRow>
				<TableCell component="th" scope="row">
					<TextField
						fullWidth id="specieNameFilterParam" name="specieNameFilterParam"
						onChange={handleSpecieNameChange} className={classes.input}
						label="Filtrar pela espécie" size="small" autoComplete="off"
					/>
				</TableCell>
				<TableCell>
					<TextField
						fullWidth id="familyNameFilterParam" name="familyNameFilterParam"
						onChange={handleFamilyNameChangeName} className={classes.input}
						label="Filtrar pela família" size="small"autoComplete="off"
					/>
				</TableCell>
				<TableCell></TableCell>
			</TableRow>
		</React.Fragment>
	)
}