import React from 'react'
import {
  Grid,
} from '@material-ui/core'

import DashBoardTable from './DashBoardTable.js'

export default function Dashboard(props) {
  /*
    ações de filtro
    Tabela
      especie, fam, acoes (ver descricao, editar, excluir)
      div com descrição que fica visivel depois que clica no botao

  */
  return (
    <Grid container direction="column">
      <Grid item>
        <DashBoardTable speciesList={props.speciesList} familiesList={props.familiesList}/>
      </Grid>
    </Grid>
  )
}