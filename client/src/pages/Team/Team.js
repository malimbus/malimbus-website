import React from 'react'
import Thumbnails from '../../components/Thumbnails/Thumbnails'
import styles from './Team.module.css'

const Team = () => {
    return (
        <div className={styles.featuresContainer} >
            <div className={styles.paragraph}>
                <h1 style={{paddingBottom: '30px'}}>Board<span style={{color: '#1ABC9C'}}> Members</span> </h1>
                {/* <hr className={styles.hrLine}/> */}
                <p> 
                It is a long established fact that a reader will be distracted by the readable content of a 
                page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                normal distribution of letters, as opposed to using 'Content here, content here', making it look 
                like readable English.
                </p>
            </div>

            <Thumbnails />
        </div>
    )
}

export default Team