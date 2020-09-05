import React, { useState } from 'react';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography } from '@material-ui/core';
import {
  Autocomplete
  } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons'

import useWindowDimensions from './utils/useWindowDimensions';
import leafForms from './utils/leafForms.json'

export default function App() {
  const { height, width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: width,
      backgroundColor: '#fefefe'
    },
    input: {
      marginBottom: '10px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = useState('panel1');
  const [searched, setSearched] = useState(false)
  const [hasInflorescence, setHasInflorescence] = useState(false)
  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Typography variant="h2">
        Lineus
      </Typography>
      <Typography>
        Apenas um site para ajudar na identificação de plantas
      </Typography>

      <div>
        <Accordion>
          <AccordionSummary expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}
          expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Pesquisar uma espécie</Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth>
            {!searched?(
              <form item autoComplete="off" style={{width: '100%'}}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Autocomplete
                      id="familly"
                      options={["balba", "blabla"]}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                    />
                  </Grid>
                  <Grid>
                    <Autocomplete
                      id="genus"
                      options={["balba", "blabla"]}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Gênero" variant="outlined" />}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.input}>
                      <InputLabel id="habitoLabel">Hábito</InputLabel>
                      <Select labelId="habitoLabel" id="habito"
                      /**value={age} onChange={handleChange}**/ >
                        <MenuItem value={'Árvore'}>Árvore</MenuItem>
                        <MenuItem value={'Volúvel'}>Volúvel</MenuItem>
                        <MenuItem value={'Erva'}>Erva</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.input}>
                      <InputLabel id="alturaLabel">Altura</InputLabel>
                      <OutlinedInput                  
                        id="altura"
                        labelId="alturaLabel"
                        //value={values.amount}
                        //onChange={handleChange('amount')}
                        endAdornment={<InputAdornment position="start">m</InputAdornment>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Typography variant="overline">Folha</Typography>
                <TextField fullWidth multiline rows={5} id="newSpecieDescription" className={classes.input} label="Descrição" variant="outlined"/>

                <Typography variant="overline">Flor e inflorescência (se tiver)</Typography>
                <TextField fullWidth multiline rows={5} id="newSpecieDescription" className={classes.input} label="Descrição" variant="outlined"/>

                <Button variant="contained" color="primary">
                  Pesquisar
                </Button>
              </form>
            ):(
              <Typography>Possíveis espécies: </Typography>
            )}            
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expanded={expanded === 'panel2'} onChange={handlePanelChange('panel2')}
          expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Adicionar uma espécie</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form item autoComplete="off">            
              <TextField fullWidth id="newSpecieName" className={classes.input} label="Nome da espécie" variant="outlined"/>
              <TextField fullWidth multiline rows={10} id="newSpecieDescription" className={classes.input} label="Descrição" variant="outlined"/>
              <Button variant="contained" color="primary">
                Enviar
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
}