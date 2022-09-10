import React, { useEffect, useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Tooltip,
  Typography } from '@material-ui/core'
import { Add, Brightness7, ExpandMore, AccountCircle, GitHub, Search, } from '@material-ui/icons'
import { Alert, AlertTitle, ToggleButton, ToggleButtonGroup, } from '@material-ui/lab';

import { themeObject } from './assets/themeObject.js'
import { styleObject } from './assets/styleObject.js'
import { getAllFamilies, getAllSpecies } from './utils/firebase.js'

import About from './components/about'
import Dashboard from './components/dashboard'
import { SearchForm, AddForm } from './components/forms'
import QueryResults from './components/query-results'

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

  const [queryType, setQueryType] = useState('name')
  const handleChangeQueryTypeSelect = (event) => {
    setQueryType(event.target.value)
    clearQueryResultList()
  }
  const [queryItem, setQueryItem] = useState('specie')
  const handleChangeQueryItemSelect = (event) => {
    setQueryItem(event.target.value)
    clearQueryResultList()
  }

  const [postOrGetSwitch, setPostOrGetSwitch] = useState('pesquisar')
  const handlePostOrGetSwitchChange = (event, newValue) => {
    clearQueryResultList()
    setPostOrGetSwitch(newValue)
  }

  const [familiesList, setFamiliesList] = useState([])
  useEffect(() => {
    getAllFamilies((dataFromFirebase) => {
      if(typeof dataFromFirebase === 'undefined' || dataFromFirebase === null) {
        setFamiliesList([])
      } else {
        const auxFamiliesList = Object.entries(dataFromFirebase).map((fam) => typeof fam[1].scientificName !== 'undefined'&&{key: fam[0], ...fam[1]})
        const withFirstLetterFamiliesList = auxFamiliesList.map((fam) => {
          return {
            ...fam,
            firstLetter: fam.scientificName[0].toUpperCase()
          }
        })
        const sortedFamiliesList = withFirstLetterFamiliesList.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        setFamiliesList(sortedFamiliesList)
      }
    })
  }, [])

  const [speciesList, setSpeciesList] = useState([])
  useEffect(() => {
    getAllSpecies((speciesFromDb) => {
      if(typeof speciesFromDb === 'undefined' || speciesFromDb === null) {
        setSpeciesList([])
      } else {
        const auxSpeciesList = Object.entries(speciesFromDb).map((specie) => typeof specie[1].scientificName !== 'undefined'&&specie[1])

        const withFirstLetterSpeciesList = auxSpeciesList.map((specie) => {
          return {
            ...specie,
            firstLetter: specie.scientificName[0].toUpperCase()
          }
        })
        const sortedSpeciesList = withFirstLetterSpeciesList.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        setSpeciesList(sortedSpeciesList)
        setBackdropVisible(false)
      }
    })
  }, [])

  const [queryResultList, setQueryResultList] = useState([])
  const clearQueryResultList = () => {
    setQueryResultList([])
  }
  const [backdropVisible, setBackdropVisible] = useState(true)

  return (
    <ThemeProvider theme={themeConfig}>
    <CssBaseline/>
    <Backdrop className={classes.backdrop} open={backdropVisible}>
      <Grid container direction="column" justify="center" alignItems= "center">
        <CircularProgress color="inherit" />
        <Typography variant="h6">Carregando dados...</Typography>
      </Grid>
    </Backdrop>

    <Grid container direction="row">
      <Grid item xs={11}>
        <IconButton variant="contained" onClick={toogleDarkMode} style={{width: 'min-content', height: 'min-content'}}>
          <Brightness7/>
        </IconButton>
        <IconButton variant="contained" href="https://github.com/shCampos/farinaccio" target="_blank" style={{width: 'min-content', height: 'min-content'}}>
          <GitHub/>
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton disabled variant="contained" style={{width: 'min-content', height: 'min-content', float: 'right'}}>
          <AccountCircle/>
        </IconButton>
      </Grid>
    </Grid>
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Typography variant="h2" className={classes.siteTitle}>
        Herbs <b>COR</b>
      </Typography>
      <Typography variant="h6" className={classes.siteDescription}>
        apenas um site para ajudar na identificação de espécies das Iniciações Científicas do Herbário-COR
      </Typography>
        
      <div style={{width: '684px'}}>
        <Accordion expanded={expanded === 'about'} onChange={handlePanelChange('about')}>
          <AccordionSummary expandIcon={<ExpandMore />} className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Sobre
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.acordionBody}>
            <About />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'actions'} onChange={handlePanelChange('actions')}>
          <AccordionSummary expandIcon={<ExpandMore />} className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Ações rápidas
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.acordionBody}>
            <Grid container direction="column">
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                <Grid item xs={2}>
                  <ToggleButtonGroup value={postOrGetSwitch} exclusive onChange={handlePostOrGetSwitchChange}>
                    <ToggleButton value="pesquisar">
                      <Tooltip title="Pesquisar">
                        <Search color="primary"/>
                      </Tooltip>                      
                    </ToggleButton>
                    <ToggleButton value="adicionar">
                      <Tooltip title="Adicionar">
                        <Add color="primary"/>
                      </Tooltip>                      
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={5}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="queryItemSelectLabel">O que {postOrGetSwitch}?</InputLabel>
                    <Select labelId="queryItemSelectLabel" id="queryItemSelect" value={queryItem}
                      onChange={handleChangeQueryItemSelect} className={classes.input}
                      disabled={(postOrGetSwitch==='pesquisar')?false:true}>
                      <MenuItem value={'specie'} selected>Espécie</MenuItem>
                      <MenuItem value={'genus'}>Gênero</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="queryTypeSelectLabel">Como pesquisar?</InputLabel>
                    <Select labelId="queryTypeSelectLabel" id="queryTypeSelect" value={queryType}
                      onChange={handleChangeQueryTypeSelect} className={classes.input}
                      disabled={(postOrGetSwitch==='pesquisar')?false:true}>
                      <MenuItem value={'name'} selected>Pelo nome</MenuItem>
                      <MenuItem value={'description'}>Pela descrição</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {(speciesList.length > 0 && familiesList.length > 0 && queryResultList.length === 0)&&(
                <Grid item>
                  {(postOrGetSwitch=='adicionar')?(
                    <AddForm />
                  ):(
                    <SearchForm
                      queryType={queryType}
                      queryItem={queryItem}
                      speciesList={speciesList}
                      familiesList={familiesList}
                      setQueryResultList={setQueryResultList}
                    />
                  )}
                </Grid>
              )}
              {(queryResultList.length >= 1)&&(
                <Grid item>
                  <QueryResults queryResultList={queryResultList}/>
                  <Button variant="contained" className={classes.btn} color="primary" 
                    onClick={clearQueryResultList}>
                    Continuar pesquisando
                  </Button>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'dashboard'} onChange={handlePanelChange('dashboard')}>
          <AccordionSummary expandIcon={<ExpandMore />} className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Dashboard completo
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.acordionBody}>
            {(speciesList.length > 0 && familiesList.length > 0)&&(
              <Dashboard
                speciesList={speciesList}
                familiesList={familiesList}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
    </ThemeProvider>
  )
}