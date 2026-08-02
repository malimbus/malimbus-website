/* eslint-disable */
import React from 'react'
import styles from './Events.module.css'

const Events = () => {
    return (
        <div className={styles.layout} >
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FLagos&src=YXBsb3JpLmV2ZW50c0BnbWFpbC5jb20&color=%23039BE5&showTitle=0&showDate=1" style={{borderWidth:0}} width="1200" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
    )
}

export default Events
