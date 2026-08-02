import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Regions.module.css'

import benin from './flags/benin.png'
import burkinaFaso from './flags/burkina-faso.png'
import burundi from './flags/burundi.png'
import cameroun from './flags/cameroun.png'
import capeVerde from './flags/cape-verde.png'
import centralAfricanRepublic from './flags/central-fricanrepublic.png'
import angola from './flags/angola.png'
import congo from './flags/angola.png'
import drc from './flags/drc.png'
import chad from './flags/chad.png'
import equatorialGuinea from './flags/equatorial-guinea.png'
import gabon from './flags/gabon.png'
import gambia from './flags/gambia.png'
import ghana from './flags/ghana.png'
import guineaBissau from './flags/guinea-bissau.png'
import guinea from './flags/guinea.png'
import ivoryCoast from './flags/ivory-coast.png'
import liberia from './flags/liberia.png'
import mali from './flags/mali.png'
import mauritania from './flags/mauritania.png'
import niger from './flags/niger.png'
import nigeria from './flags/nigeria.png'
import rwanda from './flags/rwanda.png'
import saotome from './flags/saotome.png'
import senegal from './flags/senegal.png'
import sierraLeone from './flags/sierra-leone.png'
import togo from './flags/togo.png'
import westernSahara from './flags/western-sahara.png'



const Region = () => {

    const history = useHistory()
    const openRegion =(url, title) => history.push({
        pathname: `/region/${url}`,
        region: title
    })

    const regions = [
        { title: 'Benin', flag: benin, url: 'benin'},
        { title: 'Burkina Faso', flag: burkinaFaso, url: 'burkina-faso'},
        { title: 'Burundi', flag: burundi, url: 'burundi'},
        { title: 'Chad', flag: chad, url: 'chad'},
        { title: 'Cameroun', flag: cameroun, url: 'cameroun'},
        { title: 'Cape Verde', flag: capeVerde, url: 'cape-verde'},
        { title: 'Central African Republic', flag: centralAfricanRepublic, url: 'central-african-republic'},
        { title: 'Angola', flag: angola, url: 'angola'},
        { title: 'Congo', flag: congo, url: 'congo'},
        { title: 'DRC', flag: drc, url: 'drc'},
        { title: 'Equatorial Guinea', flag: equatorialGuinea, url: 'equitorial-guinea'},
        { title: 'Gabon', flag: gabon, url: 'gabon'},
        { title: 'The Gambia', flag: gambia, url: 'gambia'},
        { title: 'Ghana', flag: ghana, url: 'ghana'},
        { title: 'Guinea Bissau', flag: guineaBissau, url: 'guinea-bissau'},
        { title: 'Guinea', flag: guinea, url: 'guinea'},
        { title: 'Ivory Coast', flag: ivoryCoast, url: 'ivory-coast'},
        { title: 'Liberia', flag:  liberia, url: 'liberia'},
        { title: 'Mali', flag: mali, url: 'mali'},
        { title: 'Mauritania', flag: mauritania, url: 'mauritania'},
        { title: 'Niger', flag: niger, url: 'niger'},
        { title: 'Nigeria', flag: nigeria, url: 'nigeria'},
        { title: 'Rwanda', flag: rwanda, url: 'rwanda'},
        { title: 'São Tomé and Príncipe', flag: saotome, url: 'saotome-and-principe'},
        { title: 'Senegal', flag: senegal, url: 'senegal'},
        { title: 'Sierra Leone', flag: sierraLeone, url: 'sierra-leone'},
        { title: 'Togo', flag: togo, url: 'togo'},
        { title: 'Western Sahara', flag: westernSahara, url: 'western-sahara'},
      ]

  return (
    <div className={styles.featuresContainer} >

            <div className={styles.items}>
                <h1 style={{padding: '40px', textAlign: 'center'}}>View publications by region</h1>
                <ul className={styles.autoGrid}>
                   {
                       regions.map((region) => (
                        <li className={styles.listItem} key={region.title} onClick={() =>openRegion(region.url, region.title)}>
                            <div className={styles.imgContainer}>
                                <img  className={styles.imgThumbnail} src={region.flag ? region.flag : "https://i.postimg.cc/8zbCw3P7/APLORI-thumbnail.png"} alt="" />
                            </div>
                            <div className={styles.text}>
                                <h2 >{region.title}</h2>
                                <p></p>
                            </div>
                        </li>
                       ))
                   }
                    
                </ul>

            </div>

        </div>
  )
}

export default Region