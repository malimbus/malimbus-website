import React from 'react'
import styles from './StaticPage.module.css'
import parser from 'html-react-parser'



const PostDetails = ({title, content, image}) => {

    
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <img className={styles.featuredImage} src={image} alt={title}></img>
            </div>
            <div className={styles.body}>
            <h1 style={{padding: '40px 0px'}}>{title}</h1>
                <div>{parser(content)}</div>
            </div>
        </div>
    )
}

export default PostDetails
