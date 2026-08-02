import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PaystackPop from '@paystack/inline-js'




const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(15, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));



const Subscribe = () => {

    const location = useLocation()
    const history = useHistory()
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const paystack = new PaystackPop();
      
    const handlePayment = (e) => {
      e.preventDefault()
      paystack.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_KEY,
        email: user?.result?.email,
        amount: 500000,
        firstname: user?.result?.name,

        onSuccess: (transaction) => { 
          // history.push('/publications')
          // Payment complete! Reference: transaction.reference 
        },
        onCancel: () => {
          // user closed popup
          // alert("Transaction not successful")
        }
    });
    }

    useEffect(() => {

      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])




  return (
    <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            {/* <Typography component="h1" variant="h2" align="center" color="textPrimary">
              Subscribe for more access
            </Typography> */}
            <div style={{paddingTop: '20px'}}>
            </div>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{paddingBottom: '20px'}}>
            The Society's policy is to put on the website the full text of all issues of Malimbus five or 
            more years old as well as all issues of the Bulletin of the Nigerian Ornithologists' Society (Bull NOS).  
            Bull NOS was published from 1964 to 1978.  
            To access recent publications not more than 5 years old, a subscription is required
            </Typography>
            <div className={classes.heroButtons}>
                  <Button onClick={(e) => handlePayment(e)} variant="contained" style={{backgroundColor: 'green', color: 'white'}} size='large'>
                    Subscribe Now
                  </Button>
            </div>
          </Container>
        </div>
      </main>
  )
}

export default Subscribe