
import React, { useState } from 'react';
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

export default function SearchByYear({
  year,
  setYear,
  searchPost
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');

  // Generate publication years from 1964 to the current year
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1964 + 1 },
    (_, index) => currentYear - index
  );

  // Open dialog with the currently selected year
  const handleClickOpen = () => {
    setSelectedYear(String(year || ''));
    setOpen(true);
  };

  // Update temporary selection
  const handleChange = (event) => {
    setSelectedYear(String(event.target.value));
  };

  // Cancel without applying changes
  const handleCancel = () => {
    setSelectedYear(String(year || ''));
    setOpen(false);
  };

  // Apply year and run search
  const handleSearch = () => {
    setYear(selectedYear);
    setOpen(false);

    // Pass selected year directly to avoid stale React state
    searchPost(selectedYear);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        style={{
          border: '1px solid #3e6947',
          padding: '20px 30px',
          borderRadius: '50px',
          fontSize: '18px',
          cursor: 'pointer',
          backgroundColor: 'white',
          marginTop: '20px'
        }}
      >
        Publications by Year
        {year ? `: ${year}` : ''}
      </button>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="publication-year-dialog-title"
      >
        <DialogTitle id="publication-year-dialog-title">
          Select publication year
        </DialogTitle>

        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="publication-year-label">
              Select year
            </InputLabel>

            <Select
              labelId="publication-year-label"
              id="publication-year-select"
              value={selectedYear}
              onChange={handleChange}
              input={<Input />}
            >
              <MenuItem value="">
                <em>All years</em>
              </MenuItem>

              {years.map((publicationYear) => (
                <MenuItem
                  key={publicationYear}
                  value={String(publicationYear)}
                >
                  {publicationYear}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCancel}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSearch}
            color="primary"
            variant="contained"
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
