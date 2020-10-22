import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Brightness7, ExpandMore, GitHub } from '@material-ui/icons'

import { themeObject } from './assets/themeObject.js'
import { styleObject } from './assets/styleObject.js'

import SearchForm from './components/SearchForm'

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
            <Typography className={classes.heading} variant="overline">
              Pesquisar
            </Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth className={classes.acordionBody}>
            <Grid container direction="column" justify="flex-start">
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                  <InputLabel id="queryItemSelectLabel">O que você quer pesquisar?</InputLabel>
                  <Select labelId="queryItemSelectLabel" id="queryItemSelect" value={queryItem}
                    onChange={handleChangeQueryItemSelect} label="Como você quer pesquisar?" >
                    <MenuItem value={'specie'} selected>Espécie</MenuItem>
                    <MenuItem value={'genre'}>Gênero</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                  <InputLabel id="queryTypeSelectLabel">Como você quer pesquisar?</InputLabel>
                  <Select labelId="queryTypeSelectLabel" id="queryTypeSelect" value={queryType}
                    onChange={handleChangeQueryTypeSelect} label="Como você quer pesquisar?" >
                    <MenuItem value={'name'} selected>Pelo nome</MenuItem>
                    <MenuItem value={'description'}>Pela descrição</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <SearchForm queryType={queryType} queryItem={queryItem}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
    </ThemeProvider>
  )
}