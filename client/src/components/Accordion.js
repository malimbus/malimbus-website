import React from 'react'
import { curriculum } from '../curriculum'
import parser from 'html-react-parser'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import Container from '@material-ui/core/Container';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0px auto',
    marginTop: '-70px',
    marginBottom: '40px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding: '5px'
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div style={{marginTop: '-60px'}} >
      <Container component="main" maxWidth="md">
      {curriculum.map((c, index) => (
        <Accordion key={c.title} expanded={expanded === index } onChange={handleChange(index)} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{c.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{textAlign: 'left', paddingLeft: '20px'}}>
          {parser(c.text)}
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))}
     </Container>
    </div>
  );
}

