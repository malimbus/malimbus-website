import React from 'react';
import { TextField, Grid } from '@material-ui/core';


const Input = ({ name, handleChange, label, half, autoFocus, type, rows, multiline}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      multiline={multiline}
      rows={rows}
      label={label}
      autoFocus={autoFocus}
      type={type}
     
    />
  </Grid>
);

export default Input;
