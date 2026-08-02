import React, { useState, useEffect } from 'react'
import ImageIcon from '@material-ui/icons/Image';
import styles from './ProfileImage.module.css'
import { IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const ProfileImage = ({profile, setProfile}) => {

    const [image, setImage] = useState('')
    const [toggleUpload, setToggleUpload ] = useState(true)

    const imageDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","aplori")
        data.append("cloud_name", "wabis")
        fetch("https://api.cloudinary.com/v1_1/wabis/image/upload", {
          method: "post",
          body: data
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.secure_url !== undefined) {
            setProfile({...profile, profilePicture: data.secure_url })
          }
        })
        .catch(error => {
          console.log(error)
        })
      }

    
    useEffect(() => {
      imageDetails()
       // eslint-disable-next-line 
    },[image])


    return (
      <div className={styles.uploads}>
      {toggleUpload && (
        <div className={styles.fileUpload}>
        <input type="file" id="upload"  hidden onChange={(e)=> setImage(e.target.files[0])} />
        <div className={styles.profilePicture}>
            <label htmlFor="upload">Upload profile picture <ImageIcon /></label>
        </div>
        </div>
      )}

     
        <div className={styles.profilePicContainer} style={profile.profilePicture ? {display: "flex"} : {display: "none"}} >
          <img className={styles.profilePic} src={profile.profilePicture} alt="Panshak"/>
          <IconButton onClick={(() => setToggleUpload((prevState) => !prevState))}><HighlightOffIcon /> </IconButton>
        </div>
      
     </div>
    )
}

export default ProfileImage
