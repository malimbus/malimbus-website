import React from 'react'
import styles from './Card.module.css'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));



const Card = ({ pub }) => {

    const classes = useStyles();
    const history = useHistory()
    // const openUser =(id) => history.push(`/user/${id}`)
    const openPost =(slug) => history.push(`/publications/${slug}`)

    return (
        <div className={styles.card}>
            {/* <div className={styles.Avatar}>
              <Avatar style={{cursor: 'pointer'}} onClick={() => openUser(pub.userId)}  alt={pub.author} src={pub.avatar} />
            </div> */}
            <div>
                <h2  onClick={() => openPost(pub.slug)} className={styles.title}>{pub.title} </h2>
                <div>
                    <p className={styles.year}>Year: {pub.year} . DOI: {pub.doi} </p>
                </div>
                <div 
                  className={classes.root}>
                  {pub.authors.map((a) => 
                  <div onClick={a.userId ? () => history.push(`/user/${a.userId}`): null} 
                    className={styles.user} 
                    key={a.name} 
                  >
                    {
                    <Avatar 
                    className={classes.small}  
                    src={a?.profilePicture} 
                    />
                    } 
                    <span style={{fontSize: '14px', paddingLeft: '5px'}}>
                      {a.name}</span></div>)}
                  </div>
            </div>
        </div>
    )
    
}

export default Card
