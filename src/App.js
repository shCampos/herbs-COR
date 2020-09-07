import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
  Typography } from '@material-ui/core'

import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab'
import { ExpandMore } from '@material-ui/icons'

import useWindowDimensions from './utils/useWindowDimensions'
import { postDescription } from './services/firebase.js'

export default function App() {
  const { height, width } = useWindowDimensions()
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: width,
      minHeight: height,
      backgroundColor: '#fefefe',
      color: '#2e2b2b'
    },
    siteDescription: {
      backgroundColor: '#199900',
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
      marginBottom: '15px'
    },
    input: {
      marginBottom: '10px',
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    btn: {
      backgroundColor: '#199900',
      color: 'white',
      fontWeight: 'bold'
    }
  }))

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [searched, setSearched] = useState(false)
  const [familly, setFamilly] = useState('')
  const [genus, setGenus] = useState('')
  const [searchParams, setSearchParams] = useState({ })
  const [specieDescription, setSpecieDescription] = useState({ })

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleFormSearchChange = (event) => {
    const auxSearchValues = { ...searchParams }
    auxSearchValues[event.target.name] = event.target.value
    setSearchParams(auxSearchValues)
  }
  const handleFormDescriptionChange = (event) => {
    const auxDescriptionValues = { ...specieDescription }
    auxDescriptionValues[event.target.name] = event.target.value
    setSpecieDescription(auxDescriptionValues)
  }
  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
  }
  const searchSpecie = () => {
    //setSearched(true)
    console.log(searchParams)
  }
  const newDescription = () => {
    postDescription({
      familly: familly,
      genus: genus,
      scientificName: specieDescription,
      description: specieDescription.description
    })
    console.log(specieDescription)
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Typography variant="h2">
        Lineus
      </Typography>
      <Typography variant="h6" className={classes.siteDescription}>
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
              <form item autoComplete="off" style={{width: '100%'}} onSubmit={handleFormSubmit(searchSpecie)}>
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
                    <FormControl variant="outlined" className={classes.input}>
                      <InputLabel id="habitLabel">Hábito</InputLabel>
                      <Select
                        required
                        labelId="habitLabel"
                        id="plantHabit"
                        name="plantHabit"
                        onChange={handleFormSearchChange}>
                        <MenuItem value={'Árvore'}>Árvore</MenuItem>
                        <MenuItem value={'Volúvel'}>Volúvel</MenuItem>
                        <MenuItem value={'Erva'}>Erva</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.input}>
                      <InputLabel id="heightLabel">Altura</InputLabel>
                      <OutlinedInput
                        required
                        id="plantHeight"
                        name="plantHeight"
                        onChange={handleFormSearchChange}
                        labelId="heightLabel"
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
                  id="leafDescription"
                  name="leafDescription"
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
                  id="flowerDescription"
                  name="flowerDescription"
                  onChange={handleFormSearchChange}
                  fullWidth
                  multiline
                  rows={5}                  
                  className={classes.input}
                  label="Descrição"
                  variant="outlined"
                />

                <Button type="submit" variant="contained" className={classes.btn}>
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
            <form onSubmit={handleFormSubmit(newDescription)} autoComplete="off" style={{width: '100%'}}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
                    id="familly"
                    value={familly}
                    onChange={(event, newValue) => {
                      setFamilly(newValue);
                    }}
                    options={["balba", "blabla"]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
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
              <TextField
                fullWidth
                required
                id="scientificName"
                name="scientificName"
                onChange={handleFormDescriptionChange}
                className={classes.input}
                label="Nome da espécie com autor"
                variant="outlined"
              />
              <TextField
                fullWidth
                required
                multiline
                rows={10}
                id="description"
                name="description"
                onChange={handleFormDescriptionChange}
                className={classes.input}
                label="Descrição"
                variant="outlined"
              />
              <Button type="submit" variant="contained" className={classes.btn}>
                Enviar
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
}