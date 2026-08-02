import React from 'react'
import styles from './Features.module.css'

const Features = () => {
    
    return (
       
        <div className={styles.featuresContainer} >
            <div className={styles.paragraph}>
                <h1>
                    Welcome to Malimbus, Journal of West African Ornithological Society
                </h1>
                <hr className={styles.hrLine}/>
                <p> 
                W.A.O.S. has long maintained journal exchanges with institutions that wish to receive Malimbus 
                and can offer a journal of their own. This has two main purposes: to enable institutions to take 
                Malimbus at low cost and to provide the Malimbus editor with access to ornithological journals 
                useful for reference when editing Malimbus. These purposes are now less important, owing to the 
                availability of much scientific literature online and, as more journals have moved away from print 
                publication, the number of exchanges has dwindled. The exchange journal stock has remained with 
                successive editors, despite a number of attempts to donate it to a suitable library. 
                Council recently agreed to send several journals to the A.P. Leventis Ornithological Research 
                Institute in Nigeria, and to sell a few more to a private collector.
                </p>
                 <hr className={styles.hrLine}/>
            </div>
        </div>
    )
}

export default Features
