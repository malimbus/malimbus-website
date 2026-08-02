import React from 'react'
import styles from './Thumbnail.module.css'
import { useHistory, useLocation } from 'react-router-dom'

const Thumbnails = ({ profiles }) => {

    const history = useHistory()
    const location = useLocation()

    const openUser =(id) => history.push(`/user/${id}`)

    return (
        <div className={styles.featuresContainer} >

            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                   {
                       profiles?.map((profile) => (
                        <li className={styles.listItem} key={profile.name} onClick={profile.userId ? () =>openUser(profile.userId): null}>
                            <div className={styles.imgContainer}>
                                <img  className={styles.imgThumbnail} src={profile.profilePicture ? profile.profilePicture : "https://i.postimg.cc/8zbCw3P7/APLORI-thumbnail.png"} alt="" />
                            </div>
                            <h2>{profile.name}</h2>
                            <h2 style={{marginTop: '-15px', color: 'gray'}}>{profile.title}</h2>
                            <p className={styles.designation}>{location.pathname === '/council' && `${profile.placeOfWork ? `${profile.placeOfWork}` : ''}`}</p>
                            <p className={styles.designation}>{location.pathname === '/council' && `${profile.email}`}</p>
                        </li>
                       ))
                   }
                    
                </ul>

            </div>

        </div>
    )
}

export default Thumbnails
