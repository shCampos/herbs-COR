import React from 'react'
import {
	Card,
	Grid,
	TextField,
} from '@material-ui/core'
import { FilterList } from '@material-ui/icons'

import { styleObject } from '../../assets/styleObject.js'

export default function FilterCard(props) {
	const { speciesList, familiesList, currentSpeciesList, setCurrentSpeciesList, setCurrentSpeciesListIsEmpty } = props
	const classes = styleObject()

	const handleSpecieNameChange = (event) => {
		let auxCurrentSpeciesList = []
		if(event.target.value === '') {
			setCurrentSpeciesList(speciesList)
		} else {
			currentSpeciesList.map((specie) => specie.scientificName.includes(event.target.value)&&auxCurrentSpeciesList.push(specie))
			if(auxCurrentSpeciesList.length === 0) {
				setCurrentSpeciesListIsEmpty(true)
				setCurrentSpeciesList(speciesList)
			} else {
				setCurrentSpeciesListIsEmpty(false)
				setCurrentSpeciesList(auxCurrentSpeciesList)
			}
		}
	}

	const handleFamilyNameChangeName = (event) => {
		let auxCurrentSpeciesList = []
		if(event.target.value === '') {
			setCurrentSpeciesList(speciesList)
		} else {
			familiesList.map((family) => {			
				if(family.scientificName.includes(event.target.value)) {
					auxCurrentSpeciesList = currentSpeciesList.filter((specie) => specie.familyKey === family.key)
				}
			})
			if(auxCurrentSpeciesList.length === 0) {
				setCurrentSpeciesListIsEmpty(true)
				setCurrentSpeciesList(speciesList)
			} else {
				setCurrentSpeciesListIsEmpty(false)
				setCurrentSpeciesList(auxCurrentSpeciesList)
			}
		}
	}

	return (
		<Card className={classes.filterCard}>
			<Grid style={{marginLeft: 0}} container direction="row" justify="flex-start" alignItems="center" spacing={6}>
				<Grid item style={{padding: '15px 15px', height: '65px'}}>
					<FilterList className={classes.filterIcon}/>
				</Grid>
				<Grid item>
					<TextField
						variant="outlined" fullWidth id="specieNameFilterParam" name="specieNameFilterParam"
						onChange={handleSpecieNameChange} className={classes.input}
						label="Filtrar pela espécie" size="small" autoComplete="off"
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="outlined" fullWidth id="familyNameFilterParam" name="familyNameFilterParam"
						onChange={handleFamilyNameChangeName} className={classes.input}
						label="Filtrar pela família" size="small"autoComplete="off"
					/>
				</Grid>
			</Grid>
		</Card>
	)
}