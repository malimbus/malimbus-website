import React, { useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './UserCard.module.css'


import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
  
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));



const UserCard = ({ logout, setOpenUserCard, profile }) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const node = useRef();

    const handleClick = e => {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      setOpenUserCard(false);
    };
  
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
  
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    });

    


    return (
        <div className={styles.cardLayout}>
            {/* <div className={styles.userCard} ref={ref}> */}
            <div ref={node} className={styles.userCard}>
                <div className={styles.userMenu}>
                    <div className={styles.avater}>
                        <Link to="/profile"><Avatar onClick={() => setOpenUserCard((prevState) => !prevState)} className={classes.large} alt={profile.name} src={profile?.profilePicture ? profile?.profilePicture :"https://i.postimg.cc/W4z4Xtck/avatar.png"} /></Link>
                    </div>
                    <h2>{user?.result?.name}</h2>
                    <p>{user?.result?.email}</p>
                    <button onClick={()=> logout()} className={styles.profileButton}>Logout</button>
                </div>
                <hr className={styles.line} />
                  <Link to='/profile'onClick={() => setOpenUserCard((prevState) => !prevState)}><div style={{textAlign: 'center', padding: '13px'}}>Visit your Profile</div></Link>
            </div>
        </div>
    )
}

export default UserCard