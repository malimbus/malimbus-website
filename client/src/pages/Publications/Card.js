import React from 'react'
import styles from './Card.module.css'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

    const openPost =(slug) => history.push(`/publications/${slug}`)
    const user = JSON.parse(localStorage.getItem('profile'))
    // const isPdf = pub?.fileUrl?.split('.').pop()

    //Get date of the next 5 years from when paper is published
    var d = new Date(pub.createdAt);
    var year = d.getFullYear()
    var month = d.getMonth()
    var day = d.getDate()
    var releaseDate = new Date(year + 5, month, day)
 
    //Check if date is in the past
    function isDateBeforeToday(date) {
      return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }
  
  const dateIsPast = isDateBeforeToday(releaseDate)
  console.log(pub.fileUrl)



    return (
        <div className={styles.card}>
            {/* <div className={styles.Avatar}>
            <Avatar src={pub.avatar} style={{cursor: 'pointer'}} onClick={() => openUser(pub.userId)}  alt={pub.author} />
            </div> */}
            <div>
                <div>
                    <div className={styles.year}>{pub.volume} &nbsp;|&nbsp; Pages {pub.page} &nbsp; 
                      {(user && user?.result?.isSubscriber ? user && user?.result?.isSubscriber : dateIsPast) && (
                        <span style={{color: '#1976d2'}}>
                        <a href={pub.fileUrl}  download> |  &nbsp; {`${pub.fileUrl.length > 0 ? 'Download PDF  ' : ' No file'}`}<i style={{color: '#e75a2f', fontSize: '15px'}} className={pub.fileUrl.length > 0 ? "far fa-file-pdf" : ""}></i></a>
                      </span>
                      )}
              
                    </div>
                </div>
              <h2  onClick={() => openPost(pub.slug)} className={styles.title}>{pub.title} </h2>
                <div className={classes.root}>{pub.authors.map((a) => <div onClick={a.userId ? () => history.push(`/user/${a.userId}`) : null } className={styles.user} key={a.name} > <span style={{fontSize: '14px', paddingLeft: '0px'}}>{a.name}</span></div>)}</div>
            </div>
        </div>
    )
    
}

export default Card
