import React from 'react'
import styles from './Card.module.css'
import { useHistory } from 'react-router-dom';
import moment from 'moment'

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

  const isPdf = pub.fileUrl.split('.').pop()

    const classes = useStyles();
    const history = useHistory()
    // const openUser =(id) => history.push(`/user/${id}`)
    const openPost =(slug) => history.push(`/theses/${slug}`)

    return (
        <div className={styles.card}>
            {/* <div className={styles.Avatar}>
            <Avatar src={pub.avatar} style={{cursor: 'pointer'}} onClick={() => openUser(pub.userId)}  alt={pub.author} />
            </div> */}
            <div>
                <h2  onClick={() => openPost(pub.slug)} className={styles.title}>{pub.title} </h2>
                <div>
                    <p className={styles.year}><span>Year: {pub.year}</span> posted {moment(pub.createdAt).fromNow()}</p>
                </div>
                
                <div className={styles.toolbar}>
                  <div className={classes.root}>{pub.authors.map((a) => <div onClick={() => history.push(`/user/${a.userId}`)} className={styles.user} key={a.name} >{<Avatar className={classes.small}  src={a?.profilePicture} />} <span style={{fontSize: '14px', paddingLeft: '5px'}}>{a.name}</span></div>)}</div>
                  {isPdf === 'pdf' &&
                    <a  className={styles.button} href={pub.fileUrl} download>Download PDF</a>
                    }
                </div>
            </div>
        </div>
    )
    
}

export default Card
