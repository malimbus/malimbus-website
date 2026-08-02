import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function SearchByYear({ year, setYear, searchPost }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  

  const handleChange = (event) => {
    setYear((event.target.value).toString());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    searchPost()
    setOpen(false);
  };

//Create an array of years and map till you get to the current year
var d = new Date();
var currentYear = d.getFullYear();
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
var years = range(2002, currentYear); // [2002, 2003, 2004, ...Current year]


  return (
    <div>
      {/* <Button onClick={handleClickOpen}>Search by Year</Button> */}
      <button 
      onClick={handleClickOpen} 
      style={{border: '1px solid #3e6947', 
      padding: '20px 30px',
      borderRadius: '50px',
      fontSize: '18px',
      cursor: 'pointer',
      backgroundColor: 'white',
      marginTop: '20px',
      // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
    }
      }>
          Search by Set
    </button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select year</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Select year</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={year}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                    years.map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))
                }
                
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
