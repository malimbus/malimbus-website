import React from 'react'
import styles from './Card.module.css'
import { useHistory } from 'react-router-dom';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import { ApprovedIcon, PendingIcon } from '../../components/StatusIcons/StatusIcons';
import { useDispatch } from 'react-redux';
import moment from 'moment'

const Card = ({ pub, handleEdit, deletePost }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const openUser =(id) => history.push(`/user/${id}`)
    // const openPost =(slug) => history.push(`/publications/${slug}`)

    // function capitalize(string) {
    //   return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    return (
        <div className={styles.card}>
            <div>
                <p  onClick={() => {handleEdit(pub?._id)}} className={styles.title}>{pub?.title} </p>
                <div className={styles.toolBox}>
                    
                    <div>
                      <p style={{fontSize: '14px', color: 'gray', lineHeight: '12px', paddingRight: '7px'}}>{pub?.postType}</p>
                    </div>

                    <div>
                      <p style={{fontSize: '14px', color: 'gray', lineHeight: '12px', paddingRight: '7px'}}>posted {moment(pub?.createdAt).fromNow()}</p>
                    </div>
                   <div>
                      <p style={{fontSize: '14px', color: 'gray', lineHeight: '12px', cursor: 'pointer', paddingRight: '7px'}} onClick={() => openUser(pub?.userId)}> by {pub?.author}</p>
                   </div>
                   <div style={{cursor: 'pointer', width: '100px'}} onClick={() => {handleEdit(pub?._id)}} >{pub?.isApproved ? <ApprovedIcon /> : <PendingIcon /> }</div>
                   <div>
                      <IconButton onClick={() => dispatch(deletePost(pub?._id))} >
                        <DeleteOutlineRoundedIcon style={{fontSize: '20px'}} />
                      </IconButton>
                   </div>


                </div>
            </div>
        </div>
    )
    
}

export default Card
