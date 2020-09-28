import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tabs,
  Tab,
  TextField,
  ThemeProvider,
  Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Brightness7, ExpandMore, GitHub } from '@material-ui/icons'

import { 
  getAllFamilies,
  getFamilyByName,
  getFamilyByKey,
  getGenreByFamilyKey,
  getGenreByName,
  getAllSpecies,
  postNewFamily,
  postNewGenre,
  postSpecieDescription,
} from './utils/firebase.js'

import { themeObject } from './assets/themeObject.js'
import { styleObject } from './assets/styleObject.js'

import { compareDescriptions } from './utils/compareDescriptions.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{width: '100%'}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    localStorage.setItem('@lineus/theme', updatedTheme.palette.type)
    setTheme(updatedTheme)
  }
  return [theme, toogleDarkMode]
}

const filter = createFilterOptions()

export default function App() {
  const [theme, toogleDarkMode] = useDarkMode()
  const themeConfig = createMuiTheme(theme)
  useEffect(() => {
    const userTheme = localStorage.getItem('@lineus/theme')
    userTheme==='dark'&&toogleDarkMode()
  }, [])
  const classes = styleObject()

  const [expanded, setExpanded] = useState(false)
  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const [tabValue, setTabValue] = useState(0)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [flagAlert, setFlagAlert] = useState({
    sucessSendDescription:false,
    errorSendDescription: false,
    missingParams: false,
    searched: false,
    specieInDb: false,
  })

  const [families, setFamilies] = useState([])
  useEffect(() => {
    getAllFamilies((dataFromFirebase) => {
      if(typeof dataFromFirebase === 'undefined' || dataFromFirebase === null) {
        setFamilies([])
      } else {
        const familiesList = Object.entries(dataFromFirebase).map((fam) => typeof fam[1].name !== 'undefined'&&{key: fam[0], ...fam[1]})
        const withFirstLetterFamiliesList = familiesList.map((fam) => {
          return {
            ...fam,
            firstLetter: fam.name[0].toUpperCase()
          }
        })
        const sortedFamiliesList = withFirstLetterFamiliesList.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        setFamilies(sortedFamiliesList)
      }
    })
  }, [])
  const [genres, setGenres] = useState([])
  const getGenreList = (familyKey) => {
    getGenreByFamilyKey(familyKey, (dataFromFirebase) => {
      setCurrentGenre({})
      if(typeof dataFromFirebase === 'undefined' || dataFromFirebase === null) {
        setGenres([])
      } else {
        const genreList = Object.entries(dataFromFirebase).map((gen) => typeof gen[1].name !== 'undefined'&&{key: gen[0], ...gen[1]})
        const withFirstLetterGenresList = genreList.map((gen) => {
          return {
            ...gen,
            firstLetter: gen.name[0].toUpperCase()
          }
        })
        const sortedGenresList = withFirstLetterGenresList.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        setGenres(sortedGenresList)
      }
    })
  }
  const [species, setSpecies] = useState([])
  useEffect(() => {
    getAllSpecies((speciesFromDb) => {
      if(typeof speciesFromDb === 'undefined' || speciesFromDb === null) {
        setSpecies([])
      } else {
        const speciesList = Object.entries(speciesFromDb).map((specie) => typeof specie[1].scientificName !== 'undefined'&&specie[1])
        const withFirstLetterSpeciesList = speciesList.map((specie) => {
          return {
            ...specie,
            firstLetter: specie.scientificName[0].toUpperCase()
          }
        })
        const sortedSpeciesList = withFirstLetterSpeciesList.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        setSpecies(sortedSpeciesList)
      }
    })
  }, [])

  const [currentFamily, setCurrentFamily] = useState('')
  const [currentGenre, setCurrentGenre] = useState('')
  const [currentSpecie, setCurrentSpecie] = useState(null)
  const [searchParams, setSearchParams] = useState({ })
  const [specieDescription, setSpecieDescription] = useState({ })
  const [probableSpecies, setProbableSpecies] = useState([{scientificName: 'Carregando', rating: 0}])

  const handleFormSubmit = callback => event => {
    event.preventDefault()
    callback()
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

  const toogleShowForm = () => {
    setFlagAlert({searched: false})
  }

  const searchSpecieByDescription = async () => {
    const auxProbableSpecies = await compareDescriptions(searchParams.plantDescription, species)
    setProbableSpecies(auxProbableSpecies)
    setFlagAlert({searched: true})
  }

  const newDescription = () => {
    let auxSpecieInDb = false
    species.map((specie) => {
      if(specieDescription.scientificName == specie.scientificName) {
        auxSpecieInDb = true
        setFlagAlert({specieInDb: true})
      }
    })
    if(!auxSpecieInDb) {
      postSpecieDescription(currentFamily.key, currentGenre.key, specieDescription)
      .then(() => {
        setFlagAlert({sucessSendDescription: true})
        setTimeout(() => setFlagAlert({sucessSendDescription: false}), 8000)
        setSpecieDescription({})
      }) 
      .catch((err) => {
        setFlagAlert({errorSendDescription: true})
        setTimeout(() => setFlagAlert({errorSendDescription: false}), 8000)
      })
    }
  }  

  return (
    <ThemeProvider theme={themeConfig}>
    <CssBaseline/>
    <Grid container direction="row" justify="flex-start">
      <IconButton variant="contained" onClick={toogleDarkMode} style={{width: 'min-content', height: 'min-content'}}>
        <Brightness7/>
      </IconButton>
      <IconButton variant="contained" href="https://github.com/shCampos/farinaccio" target="_blank" style={{width: 'min-content', height: 'min-content'}}>
        <GitHub/>
      </IconButton>
    </Grid>
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Typography variant="h2" className={classes.siteTitle}>
        Farinaccio
      </Typography>
      <Typography variant="h6" className={classes.siteDescription}>
        apenas um site para ajudar na identificação de espécies das Iniciações Científicas do Herbário-COR
      </Typography>

      <div>      
        <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" className={classes.acordionHeader}>
            {
            !flagAlert.searched?(
              <Typography className={classes.heading} variant="overline">
                Pesquisar uma espécie
              </Typography>
            ):(
              <Typography className={classes.heading} variant="overline">
                Possíveis resultados
              </Typography>
            )
            }
          </AccordionSummary>
          <AccordionDetails fullWidth className={classes.acordionBody}>
            {!flagAlert.searched?(
              <div style={{width: '-webkit-fill-available', minWidth: '100%', maxWidth: 'fit-content'}}>
                <AppBar position="static">
                  <Tabs value={tabValue} onChange={handleTabChange} className={classes.tab} variant="fullWidth" centered style={{width: '100%'}}>
                    <Tab label="PELO NOME" {...a11yProps(0)} />
                    <Tab label="PELA DESCRIÇÃO" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={tabValue} index={0}>
                  <Autocomplete
                    required
                    id="scientificName"
                    name="scientificName"
                    className={classes.input}
                    value={searchParams}
                    options={species}
                    onChange={(event, newValue) => {
                      setCurrentSpecie(newValue)
                      getFamilyByKey(newValue.familyKey, (dataFromFirebase) => {
                        const auxFamily = Object.entries(dataFromFirebase)
                        setCurrentFamily(auxFamily[0][1])
                      })
                    }}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.scientificName
                    }}
                    renderInput={(params) => <TextField {...params} label="Nome da espécie" variant="outlined" />}
                  />
                  {(currentSpecie && currentFamily)&&
                    (
                      <Card variant="outlined" style={{width: '100%'}}>
                        <CardHeader
                          style={{paddingBottom: '0px'}}
                          title={
                            <span>
                              <i>{currentSpecie.scientificName.split(' ').slice(0,2).join(' ')} </i>
                              {currentSpecie.scientificName.split(' ').slice(2).join(' ')}
                            </span>
                          }
                          subheader={currentFamily.name.toUpperCase()}
                        />
                        <CardContent style={{width: '100%'}}>                          
                          <Typography variant="body1" component="p" style={{textAlign: 'justify'}}>
                            {currentSpecie.description}
                          </Typography>
                          
                        </CardContent>
                        <CardActions>
                          <Typography variant="caption" style={{textAlign: 'justify', fontWeight: 'bold'}}>
                            {currentSpecie.reference}
                          </Typography>
                        </CardActions>
                      </Card>
                    )
                  }
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <form item autoComplete="off" style={{width: '100%'}} onSubmit={handleFormSubmit(searchSpecieByDescription)}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Autocomplete
                          required
                          id="family"
                          value={currentFamily}
                          onChange={(event, newValue) => {
                            setCurrentFamily(newValue)
                            getGenreList(newValue.key)
                          }}
                          options={families}
                          groupBy={(option) => option.firstLetter}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Autocomplete
                          required
                          id="genus"
                          disabled={currentFamily?false:true}
                          value={currentGenre}
                          onChange={(event, newValue) => {
                            setCurrentGenre(newValue)
                          }}
                          options={genres}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Gênero" variant="outlined" />}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="overline">Descrição da planta</Typography>
                    <TextField
                      required
                      id="plantDescription"
                      name="plantDescription"
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
                </TabPanel>
              </div>
            ):(
              <div>
                <List style={{paddingTop: '0px'}}>
                  {
                    probableSpecies.map((specie) => {
                      const specieName = specie.scientificName.split(' ').slice(0,2).join(' ')
                      const specieAuthor = specie.scientificName.split(' ').slice(2).join(' ')
                      const specieRating = Math.round(specie.rating*100)
                      return (
                        <div className={classes.listItemResult}>
                          <ListItem style={{width: '100%'}}>
                            <ListItemAvatar>
                              <Avatar className={classes.porcentagem}>{specieRating}%</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<span><font style={{fontStyle: 'italic'}}>{specieName}</font> {specieAuthor}</span>}
                              secondary="LINKS EXTERNOS EM IMPLEMENTAÇÃO"/>
                          </ListItem>
                          <Divider style={{width: '100%'}}/>
                        </div>
                      )
                    })
                  }                
                </List>
                <Button 
                  variant="contained"
                  className={classes.btn}
                  color="primary"
                  onClick={toogleShowForm}>
                  Continuar pesquisando
                </Button>
              </div>
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
                  <Alert variant="outlined" style={{width: '100%'}} severity="success">Descrição enviada ao banco de dados.</Alert>
                )}
                {(flagAlert.errorSendDescription)&&(
                  <Alert variant="outlined" style={{width: '100%'}} severity="error">Erro em enviar descrição ao banco de dados.</Alert>
                )}
                {(flagAlert.missingParams)&&(
                  <Alert variant="outlined" style={{width: '100%'}} severity="error">A família ou o gênero está faltando.</Alert>
                )}
                {(flagAlert.specieInDb)&&(
                  <Alert variant="outlined" style={{width: '100%'}} severity="warning">Essa espécie já foi inclusa no banco de dados.</Alert>
                )}
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
                    id="family"
                    value={currentFamily}
                    onChange={(event, newValue) => {
                      //typeof newValue !== 'undefined'|| newValue !== null&&
                      if(!families.includes(newValue)){
                        (genres[0]==='Banco de dados vazio')?setFamilies([newValue]):setFamilies([...families, newValue])
                        postNewFamily({
                          name: newValue
                        })
                        getFamilyByName(newValue, (dataFromFirebase) => {
                          const auxFamily = Object.entries(dataFromFirebase)
                          setCurrentFamily({key: auxFamily[0][0], ...auxFamily[0][1]})
                        })
                      } else {
                        setCurrentFamily(newValue)
                        getGenreList(newValue.key)
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)
                      params.inputValue!==''&&filtered.push(params.inputValue)
                      return filtered
                    }}
                    options={families}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.name
                    }}
                    renderInput={(params) => <TextField {...params} label="Família" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    className={classes.input}
                    id="genus" 
                    value={currentGenre}
                    disabled={currentFamily?false:true}
                    onChange={(event, newValue) => {
                      if(!genres.includes(newValue)){
                        //setGenres([...genres, {name: newValue}])
                        postNewGenre(currentFamily.key, newValue)     
                        getGenreByName(newValue, (dataFromFirebase) => {
                          const auxGenre = Object.entries(dataFromFirebase)
                          setCurrentGenre({key: auxGenre[0][0], ...auxGenre[0][1]})
                        })
                      } else {
                        setCurrentGenre(newValue)
                      }
                    }}
                    filterOptions={(options, params) => {              
                      const filtered = filter(options, params)
                      params.inputValue!==''&&filtered.push(params.inputValue)
                      return filtered
                    }}
                    options={genres}
                    getOptionLabel={(option) => {
                      if(typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.name
                    }}
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
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                id="reference"
                name="reference"
                onChange={handleFormDescriptionChange}
                className={classes.input}
                label="Referência (coloque nas normas da ABNT)"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.btn}
                color="primary"                
              >
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