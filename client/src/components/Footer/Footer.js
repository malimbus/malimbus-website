import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'


const Footer = () => {


    var newDate = new Date();
    var thisYear = newDate.getFullYear();
    
    return (
        <div className={styles.featuresContainer} >
             {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} id="google_translate_element"></div> */}
            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                    {/* <li className={`${styles.listItem} ${styles.logoContainer}`}>
                        <img className={styles.imgThumbnail} src="https://i.postimg.cc/htZXT0xG/logo-removebg-preview.png" alt="aplori-logo" />
                    </li> */}

                    {/* <li className={styles.listItem}>
                        <h2>Contact us</h2>
                        <ul>
                            <li>
                                P.O.Box 13404, Laminga,
                                Jos-East LGA,
                                Plateau State, 930001, Nigeria.<br/>
                                Phone: +234 903 365 5620  <br/>
                                Email: admin@malimbus.org 
                            </li>
                        </ul>
                    </li> */}

                    <li className={styles.listItem}>
                        <h2>Quick Links</h2>
                        <ul>
                            <li><Link to="/publications">Publications</Link></li>
                            <li><Link to="/region">Publications by Region</Link></li>
                            <li><Link to="/instruction-to-authors">Instruction to Authors</Link></li>
                            <li><Link to="/fulltext">Accessing Full Text</Link></li>
                            <li><Link to="/news">News</Link></li>
                        </ul>
                    </li>

                    <li className={styles.listItem}>
                        <h2>Quick links</h2>
                        <ul>
                            <li><Link to="/about">Overview</Link></li>
                            <li><Link to="/council">Council Members</Link></li>
                            <li><Link to="/membership">Join WAOS </Link></li>
                            <li><Link to="/instruction-to-authors">Submit Manuscript </Link></li>
                            <li><Link to="/contact">Contact us </Link></li>
                        </ul>
                       
                    </li>

                    <li className={styles.listItem}>
                        <h2>Follow us</h2>
                        <ul>
                            {/* <li><Link to="/"><img style={{width: '140px', cursor: 'pointer'}} src="https://i.postimg.cc/8PcQfW3g/playstore.png" alt="bird-id-app" /></Link></li>
                            <li><Link to="/"><img style={{width: '140px', cursor: 'pointer'}} src="https://i.postimg.cc/ZKfzs0rx/Apple-badge.png" alt="bird-id-app" /></Link></li> */}
                            
                            <li>
                            <div>
                                <a href="#" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                                <a href="https://twitter.com/WAOS_malimbus" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                            </li>

                            {/* <li>
                                 <div id="google_translate_element"></div>
                            </li> */}

                        </ul>
                       
                    </li>
                    
                </ul>
            </div>

            <div className={styles.footerBottom}>
               
                <div className={styles.hrLine}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p>{`Copyright ${thisYear}, Malimbus, Journal of West African Ornithological Society`}</p>
                   
                    </div>
                </div>
            </div>

        </div>
      
    )
}

export default Footer
