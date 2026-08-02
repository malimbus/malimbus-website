import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Grid, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import axios from 'axios'
import styles from '../../pages/Password/Password.module.css'

const Contact = () => {
  const history = useHistory()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '', subject: '' });
  const [step, setStep] = useState(0)
  const classes = useStyles();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/contact', form)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setForm({ firstName: '', lastName: '', email: '', message: '', subject: '' })
    setStep(1)
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={0}>
        <div>
        <h1 style={{ paddingBottom: '20px', textAlign: 'center'}}>Malimbus</h1>
        <hr />
          <p style={{ margin: '20px 0px', textAlign: 'center'}}>
            West African Ornithological Society,  <br />
            Phone: +234 803 7648 <br />
            Email: admin@malimbus.org
          </p>
         
        </div>
        
        <form className={classes.form} onSubmit={handleSubmit}>
        
           {step === 0 && (
              <div>
                 <h2 style={{textAlign: 'center', paddingBottom: '30px'}} >Send a message</h2>
              <Grid container spacing={2}>
              <Input name="firstName" label="First Name" handleChange={handleChange} half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="subject" label="Subject" handleChange={handleChange} type="text" />
              <Input name="message" label="Message" handleChange={handleChange} type="text" multiline
          rows="7"/>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Send Message
          </Button>
          </div>
           )}
        
          
          {step === 1 && (
                  <div>
                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <i class="fas fa-check-circle" style={{fontSize: '55px', color: '#3e6947'}}></i></div>
                    <br/>
                    <p>Your message was sent successfully. We'll get intouch with you shortly</p>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() =>history.push('/')}>Back to home</button>
                        {/* <button className={styles.button} onClick={()=>setStep(0)}>Resend message</button> */}
                      </div>
                  </div>
                )}

        </form>
        <h2 style={{padding: '15px'}}>Follow us</h2>
        <div>
            <a href="https://web.facebook.com/aplori1" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com/aploritwit1" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
        </div>
      </Paper>
    </Container>
  );
};

export default Contact;
