import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ThesesDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router'
import parser from 'html-react-parser'
import Spinner from '../../components/Spinner/Spinner'

import { getPost } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
import ReactShare from '../../components/ReactShare'


const PubDetails = () => {

    const history = useHistory()
    const { post, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const { slug } = useParams()

    const isPdf = post?.fileUrl?.split('.').pop()


    const openUser =(id) => history.push(`/user/${id}`)


    useEffect(() => {
        dispatch(getPost(slug))
        dispatch(getProfiles())
        // eslint-disable-next-line
    }, [slug])
  

    if(!post) return null

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
            <h3>Theses & Desertations <span style={{color: '#0daa8b'}}>|</span> {moment(post?.createdAt).format("MMM Do YY")}</h3>
                <h1 style={{padding: '10px', paddingLeft: '0px', fontSize: '30px', lineHeight: '30px'}}>{post?.title}</h1>
                 <hr className={styles.hrLine}/>

                   <h3 style={{marginRight: '5px'}}><span style={{cursor: 'pointer', color: '#0daa8b', paddingLeft: '8px'}}  onClick={() => openUser(post?.userId)}>{post?.author}</span></h3>
                 
                 <hr className={styles.hrLine}/>
                <div className={styles.author} >
                   <a style={{color: 'blue', paddingRight: '8px'}} href={post?.doi}>{post?.doi}</a> 
                </div>

            </div>
            <div className={styles.body}>
                <h2 style={{paddingTop: '20px'}}>Abstract</h2>
                <div>{parser(post.content)}</div>
                <div style={{marginTop: '20px'}}></div>
                <hr className={styles.hrLine}/>
                <div style={{marginTop: '20px'}}></div>
               { isPdf === 'pdf' &&
               <a  className={styles.button} href={post.fileUrl} download>Download PDF</a>
               }
            </div>
            <ReactShare url={`https://aplori.org/theses${post.slug}`} title={post.title} />
        </div>
    )
}

export default PubDetails
