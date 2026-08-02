import React from 'react'
import styles from './PostType.module.css'

const PostType = ({ postType, value, handleChange, checked }) => {
    return (
        <label className={styles.container}><p>{postType}</p>
            <input type="radio" name="postType" value={value} onChange={handleChange} checked={checked}/>
            <span className={styles.checkmark} />
        </label>
    )
}

export default PostType
