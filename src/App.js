import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  ThemeProvider,
  Typography } from '@material-ui/core'
import { Add, Brightness7, ExpandMore, GitHub, Search, } from '@material-ui/icons'

import { 
  getAllFamilies,
  getAllSpecies,
} from './utils/firebase.js'

import { themeObject } from './assets/themeObject.js'
import { styleObject } from './assets/styleObject.js'

import { SearchForm, AddForm } from './components/forms'
import Dashboard from './components/dashboard'
import QueryResults from './components/query-results'

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
  }
  const [queryItem, setQueryItem] = useState('specie')
  const handleChangeQueryItemSelect = (event) => {
    setQueryItem(event.target.value)
  }

  const [postOrGetSwitch, setPostOrGetSwitch] = useState(false)
  const handlePostOrGetSwitchChange = (event) => {
    setPostOrGetSwitch(!postOrGetSwitch)
  }

  const [familiesList, setFamiliesList] = useState([])
  useEffect(() => {
    getAllFamilies((dataFromFirebase) => {
      if(typeof dataFromFirebase === 'undefined' || dataFromFirebase === null) {
        setFamiliesList([])
      } else {
        const auxFamiliesList = Object.entries(dataFromFirebase).map((fam) => typeof fam[1].name !== 'undefined'&&{key: fam[0], ...fam[1]})
        const withFirstLetterFamiliesList = auxFamiliesList.map((fam) => {
          return {
            ...fam,
            firstLetter: fam.name[0].toUpperCase()
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
      <Grid container direction="column" justify="center" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="h6">Carregando dados...</Typography>
      </Grid>
    </Backdrop>
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
      <div style={{width: 'fit-content'}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handlePanelChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Ações rápidas
            </Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth className={classes.acordionBody}>
            <Grid container direction="column">
              <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={0}>
                      <Grid item>
                        <Search/>
                      </Grid>
                      <Grid item>
                        <Switch onChange={handlePostOrGetSwitchChange} name="postOrGetSwitch" />
                      </Grid>
                      <Grid item>
                        <Add/>
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="queryItemSelectLabel">O que {(postOrGetSwitch)?'adicionar':'pesquisar'}?</InputLabel>
                    <Select labelId="queryItemSelectLabel" id="queryItemSelect" value={queryItem}
                      onChange={handleChangeQueryItemSelect} className={classes.input}>
                      <MenuItem value={'specie'} selected>Espécie</MenuItem>
                      <MenuItem value={'genre'}>Gênero</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {(!postOrGetSwitch)&&(
                  <Grid item xs={4}>                  
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="queryTypeSelectLabel">Como pesquisar?</InputLabel>
                      <Select labelId="queryTypeSelectLabel" id="queryTypeSelect" value={queryType}
                        onChange={handleChangeQueryTypeSelect} className={classes.input}>
                        <MenuItem value={'name'} selected>Pelo nome</MenuItem>
                        <MenuItem value={'description'}>Pela descrição</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              {(speciesList.length > 0 && familiesList.length > 0 && queryResultList.length == 0)&&(
                <Grid item>
                  {(postOrGetSwitch)?(
                    <AddForm queryItem={queryItem}/>
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
        <Accordion expanded={expanded === 'panel2'} onChange={handlePanelChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" className={classes.acordionHeader}>
            <Typography className={classes.heading} variant="overline">
              Dashboard completo
            </Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth className={classes.acordionBody}>
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