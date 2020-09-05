import React, { useState } from 'react';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  Grid,
  InputLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography } from '@material-ui/core';

import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons'

import useWindowDimensions from './utils/useWindowDimensions'

export default function App() {
  const { height, width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: '50px',
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
  const [expanded, setExpanded] = useState(false)
  const [searched, setSearched] = useState(false)
  const [familly, setFamilly] = useState('')
  const [genus, setGenus] = useState('')
  const [searchParams, setSearchParams] = useState({ })

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFormSearchChange = (event) => {
    const auxValues = { ...searchParams };
    auxValues[event.target.name] = event.target.value;
    setSearchParams(auxValues);
  };

  const handleSearchSubmit = callback => event => {
    event.preventDefault();
    callback();
  };

  const searchSpecie = () => {
    setSearched(true)
  }


  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Typography variant="h2">
        Lineus
      </Typography>
      <Typography variant="h6">
        Apenas um site para ajudar na identificação de plantas
      </Typography>

      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading} variant="overline">
              Pesquisar uma espécie
            </Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth>
            {!searched?(
              <form item autoComplete="off" style={{width: '100%'}} onSubmit={handleSearchSubmit(searchSpecie)}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Autocomplete
                      required
                      id="familly"
                      value={familly}
                      onChange={(event, newValue) => {
                        setFamilly(newValue);
                      }}
                      options={["balba", "blabla"]}
                      renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      required
                      id="genus"
                      value={genus}
                      onChange={(event, newValue) => {
                        setGenus(newValue)
                      }}
                      options={["balba", "blabla"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => <TextField {...params} label="Gênero" variant="outlined" />}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.input}>
                      <InputLabel id="habitoLabel">Hábito</InputLabel>
                      <Select
                        required
                        labelId="habitoLabel"
                        id="habito"
                        name="habito"
                        onChange={handleFormSearchChange}>
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
                        required
                        id="altura"
                        name="altura"
                        onChange={handleFormSearchChange}
                        labelId="alturaLabel"
                        type="number"
                        //value={values.amount}
                        //onChange={handleChange('amount')}
                        endAdornment={<InputAdornment position="start">m</InputAdornment>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Typography variant="overline">Folha</Typography>
                <TextField 
                  required
                  id="descricaoFolha"
                  name="descricaoFolha"
                  onChange={handleFormSearchChange}
                  fullWidth
                  multiline
                  rows={5}                  
                  className={classes.input}
                  label="Descrição"
                  variant="outlined"
                />

                <Typography variant="overline">Flor e inflorescência (se tiver)</Typography>
                <TextField
                  required
                  id="descricaoFlor"
                  name="descricaoFlor"
                  onChange={handleFormSearchChange}
                  fullWidth
                  multiline
                  rows={5}                  
                  className={classes.input}
                  label="Descrição"
                  variant="outlined"
                />

                <Button variant="contained" color="primary" type="submit">
                  Pesquisar
                </Button>
              </form>
            ):(
              <Alert severity="info" style={{width: '100%'}}>
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
              </Alert>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handlePanelChange('panel2')}>
          <AccordionSummary
          expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading} variant="overline">
              Adicionar uma espécie
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form autoComplete="off" style={{width: '100%'}}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
                    id="familly"
                    options={["balba", "blabla"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
                    id="genus"
                    options={["balba", "blabla"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Gênero" variant="outlined" />}
                  />
                </Grid>
              </Grid>
              <TextField fullWidth id="newSpecieName" className={classes.input} label="Nome da espécie com autor" variant="outlined"/>
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