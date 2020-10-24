<Typography variant="overline">Folhas</Typography>                
<Grid container spacing={2}>
  <Grid item xs={4}>
    <Autocomplete
      id="limboType"
      options={leafForms.filotaxia}
      getOptionLabel={(option) => option}
      renderInput={(params) => 
        <TextField {...params} label="Forma" variant="outlined" />
      }
     />
  </Grid>
  <Grid item xs={4}>
    <Autocomplete
      id="apiceType"
      options={leafForms.apice}
      getOptionLabel={(option) => option}
      renderInput={(params) => 
        <TextField {...params} label="Apice" variant="outlined" />
      }
    />
  </Grid>
  <Grid item xs={4}>
    <Autocomplete
      id="limboType"
      options={leafForms.base}
      getOptionLabel={(option) => option}
      renderInput={(params) => 
        <TextField {...params} label="Base" variant="outlined" />
      }
    />
  </Grid>
</Grid>