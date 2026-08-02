import React from 'react';
import { TextField, Grid } from '@material-ui/core';


const Input = ({ name, handleChange, label, inputProps, half, autoFocus, type, required, value, multiline, rows, disabled }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required={required}
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      multiline={multiline}
      rows={rows}
      inputProps={inputProps}
      disabled={disabled}
    />
  </Grid>
);

export default Input;
