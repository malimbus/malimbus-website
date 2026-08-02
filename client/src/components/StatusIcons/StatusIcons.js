import React from 'react'
import styles from './StatusIcons.module.css'

export const ApprovedIcon = () => {
    return (
        <label className={styles.container}><p>Approved</p>
            <input type="radio"  checked={true} disabled/>
            <span className={styles.checkmark} />
        </label>
    )
}


export const PendingIcon = () => {
    return (
        <label className={styles.container}><p>Pending</p>
            <input type="radio" checked={true} disabled/>
            <span className={styles.checkmark2} />
        </label>
    )
}