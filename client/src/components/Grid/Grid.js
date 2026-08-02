import React from 'react'
import styles from './Grid.module.css'
import { useHistory, useLocation } from 'react-router-dom'

const Grid = ({ profiles }) => {

    const history = useHistory()
    const location = useLocation()

    const openUser =(id) => history.push(`/user/${id}`)


    return (
        <div className={styles.featuresContainer} >

            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                   {
                       profiles.map((profile) => (
                        <li className={styles.listItem} key={profile.name} onClick={profile.userId ? () =>openUser(profile.userId) : null}>
                            <div className={styles.imgContainer}>
                                <img  className={styles.imgThumbnail} src={profile.profilePicture ? profile.profilePicture : "https://i.postimg.cc/8zbCw3P7/APLORI-thumbnail.png"} alt="" />
                            </div>
                            <div className={styles.text}>
                                <h2 >{profile.name}</h2>
                                <p>{location.pathname === '/people/staff'? profile.designation : profile.yearOfGraduation}</p>
                            </div>
                        </li>
                       ))
                   }
                    
                </ul>

            </div>

        </div>
    )
}

export default Grid
