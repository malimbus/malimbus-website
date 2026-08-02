import React from 'react'
import styles from './Grid.module.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import { deleteProfile } from '../../../actions/profile';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'react-simple-snackbar'
import { useHistory } from 'react-router-dom'



const Grid = ({ profiles, setCurrentId, setOpen }) => {

    // eslint-disable-next-line 
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClickOpen = (id) => {
        setCurrentId(id)
        setOpen(true)
    }


    const confirmDelete =(id, name) => {
        if(window.confirm(`Are you really sure you want to delete ${name} from the database?`)) {
            dispatch(deleteProfile(id, openSnackbar))
        } else {
            return null
        }
      }


    const openUser =(id) => history.push(`/user/${id}`)

    return (
        <div className={styles.featuresContainer} >

            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                   {
                       profiles.map((profile) => (
                          
                            <li className={styles.listItem} key={profile.name}>
                                <div className={styles.imgContainer}>
                                    <img  className={styles.imgThumbnail} src={profile.profilePicture ? profile.profilePicture : "https://i.postimg.cc/8zbCw3P7/APLORI-thumbnail.png"} alt="" />
                                </div>
                                <div className={styles.text} onClick={profile.userId ? () =>openUser(profile.userId) : null}>
                                    <h2 style={{paddingBottom: '10px'}}>{profile.name}</h2>
                                    {/* <p>{location.pathname === '/people/staff'? profile.designation : profile.yearOfGraduation}</p> */}
                                </div>
                                <div>
                                    <IconButton  onClick={()=>handleClickOpen(profile._id, openSnackbar)}>
                                        <EditIcon style={{height: '15px', width: '15px'}} />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(profile._id, profile.name)}>
                                        <DeleteOutlineIcon style={{height: '15px', width: '15px'}}  />
                                    </IconButton>
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
