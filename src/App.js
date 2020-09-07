import React, { useState } from 'react'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  MenuItem,
  ThemeProvider,
  OutlinedInput,
  Select,
  TextField,
  Typography } from '@material-ui/core'

import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab'
import { ExpandMore, Brightness7 } from '@material-ui/icons'

import useWindowDimensions from './utils/useWindowDimensions'
import { postDescription } from './services/firebase.js'

const themeObject = {
  palette: {
    primary: {
      main: '#3eb827',
    },
    secondary: {
      main: '#4D216B',
    },
    type: 'light'
  },
  typography: {
    fontFamily: 'Roboto'
  }
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject)
  const { 
    palette: { type }
  } = theme
  const toogleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light'?'dark':'light'
      }
    }
    setTheme(updatedTheme)
  }
  return [theme, toogleDarkMode]
}

export default function App() {
  const [theme, toogleDarkMode] = useDarkMode()
  const themeConfig = createMuiTheme(theme)

  const { height, width } = useWindowDimensions()
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: width,
      minHeight: height-48,
      backgroundColor: theme.palette.background
    },
    siteDescription: {
      backgroundColor: '#3eb827',
      color: theme.palette.text,
      paddingLeft: '5px',
      paddingRight: '5px',
      marginBottom: '15px',
      textTransform: 'lowercase'
    },
    input: {
      marginBottom: '10px',
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    btn: {
      fontWeight: 'bold',
      color: '#fff',  
    }
  }))
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [familly, setFamilly] = useState('')
  const [genus, setGenus] = useState('')
  const [searchParams, setSearchParams] = useState({ })
  const [specieDescription, setSpecieDescription] = useState({ })
  const [flagAlert, setFlagAlert] = useState({
    sucessSendDescription:false,
    errorSendDescription: false,
    searched: false,
  })
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
    setFlagAlert({searched: true})
  }
  const newDescription = () => {
    postDescription({
      familly: familly,
      genus: genus,
      scientificName: specieDescription.scientificName,
      description: specieDescription.description
    })
    .then((res)=>setFlagAlert({sucessSendDescription: true})) 
    .catch((err)=>setFlagAlert({errorSendDescription: true}))
  }

  return (
    <ThemeProvider theme={themeConfig}>
    <CssBaseline/>
    <Grid container direction="column">
      <IconButton variant="contained" onClick={toogleDarkMode} style={{width: 'min-content', height: 'min-content'}}>
        <Brightness7/>
      </IconButton>
    </Grid>
    <Grid container direction="column" justify="center" alignItems="center"className={classes.root}>
      <Typography variant="h2">
        Lineus
      </Typography>
      <Typography variant="h6" className={classes.siteDescription}>
        Apenas um site para ajudar na identificação de plantas
      </Typography>

      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Pesquisar uma espécie
            </Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth className={classes.acordionBody}>
            {!flagAlert.searched?(
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

                <Button type="submit" variant="contained" className={classes.btn} color="primary">
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
          expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Adicionar uma espécie
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.acordionBody}>
            <form onSubmit={handleFormSubmit(newDescription)} autoComplete="off" style={{width: '100%'}}>
              <Grid container fullWidth style={{marginBottom: '10px'}}>
                {(flagAlert.sucessSendDescription)&&(
                  <Alert style={{width: '100%'}} severity="success">Descrição enviada ao banco de dados!</Alert>
                )}
                {(flagAlert.errorSendDescription)&&(
                  <Alert style={{width: '100%'}} severity="error">Erro em enviar descrição ao banco de dados.</Alert>
                )}
              </Grid>
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
              <Button type="submit" variant="contained" className={classes.btn} color="primary">
                Enviar
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
    </ThemeProvider>
  );
}