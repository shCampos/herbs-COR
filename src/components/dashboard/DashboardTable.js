import React, { useState } from 'react'
import {
  Box,
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

export default function DashboardTable(props) {
  const { speciesList, familiesList, currentSpeciesList, currentSpeciesListIsEmpty } = props
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
  
  return (
    <Box style={{width: '100%'}}>
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
						{currentSpeciesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((specie) => {
							const family = familiesList.filter((family)=>family.key === specie.familyKey)
							return (
								<DataRow
									specie={{...specie, familyName: family[0].scientificName}}
								/>
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
		</Box>
  )
}