import React from 'react'
import styles from './Card.module.css'
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';



const Card = ({ pub }) => {


    const history = useHistory()
    const openUser =(id) => history.push(`/user/${id}`)
    const openPost =(slug) => history.push(`/documents/${slug}`)

    return (
        <div className={styles.card}>
            <div className={styles.Avatar}>
            <Avatar style={{cursor: 'pointer'}} src={pub.avatar} onClick={() => openUser(pub.userId)}  alt={pub.author}  />
            </div>
            <div>
                <h2  onClick={() => openPost(pub.slug)} className={styles.title}>{pub.title} </h2>
                {/* <div>
                    <p className={styles.year}>Year: {pub.year} . DOI: {pub.doi} </p>
                </div> */}
                {/* <p className={styles.authors}>{pub.authors}</p> */}
            </div>
        </div>
    )
}

export default Card
