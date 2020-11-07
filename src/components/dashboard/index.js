import React, { useState } from 'react'
import {
	Box,
	Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
	TableRow,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { styleObject } from '../../assets/styleObject.js'

import DataRow from './DataRow'
import FilterCard from './FilterCard'
import DashboardTable from './DashboardTable'
/*
	<FilterRow
		speciesList={props.speciesList}
		familiesList={props.familiesList}
		currentSpeciesList={currentSpeciesList}
		setCurrentSpeciesList={setCurrentSpeciesList}
		setCurrentSpeciesListIsEmpty={setCurrentSpeciesListIsEmpty}
	/>
*/
export default function Dashboard(props) {
	const { speciesList, familiesList } = props
	const classes = styleObject()

	const [currentSpeciesList, setCurrentSpeciesList] = useState(props.speciesList)
  const [currentSpeciesListIsEmpty, setCurrentSpeciesListIsEmpty] = useState(false)

  return (
    <Grid container direction="column">
			<Grid item>
				<FilterCard
					speciesList={speciesList}
					familiesList={familiesList}
					currentSpeciesList={currentSpeciesList}
					setCurrentSpeciesList={setCurrentSpeciesList}
					setCurrentSpeciesListIsEmpty={setCurrentSpeciesListIsEmpty}
				/>
			</Grid>
			<Grid item>
				<DashboardTable
					speciesList={speciesList}
					familiesList={familiesList}
					currentSpeciesList={currentSpeciesList}
					currentSpeciesListIsEmpty={currentSpeciesListIsEmpty}
				/>
			</Grid>
		</Grid>			
  )
}