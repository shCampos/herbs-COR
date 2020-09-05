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
import useWindowDimensions from './utils/useWindowDimensions';
import { ExpandMore } from '@material-ui/icons'

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
  const handleChange = (panel) => (event, isExpanded) => {
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
          <AccordionSummary expanded={true} onChange={handleChange('panel1')}
          expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Pesquisar uma espécie</Typography>
          </AccordionSummary>
          <AccordionDetails fullWidth>
            {!searched?(
              <form item autoComplete="off" fullWidth>
                <FormControl variant="outlined" style={{width: '50%'}} className={classes.input}>
                  <InputLabel id="habitoLabel">Hábito</InputLabel>
                  <Select labelId="habitoLabel" id="habito"
                  /**value={age} onChange={handleChange}**/ >
                    <MenuItem value={'Árvore'}>Árvore</MenuItem>
                    <MenuItem value={'Volúvel'}>Volúvel</MenuItem>
                    <MenuItem value={'Erva'}>Erva</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{width: '50%'}} className={classes.input}>
                  <InputLabel id="alturaLabel">Altura</InputLabel>
                  <OutlinedInput                  
                    id="altura"
                    labelId="alturaLabel"
                    //value={values.amount}
                    //onChange={handleChange('amount')}
                    endAdornment={<InputAdornment position="start">m</InputAdornment>}
                  />
                </FormControl>

                ADICIONAR autoComplete


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
          <AccordionSummary expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
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