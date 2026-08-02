import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ResearchDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

import parser from 'html-react-parser'

import { getPost } from '../../actions/posts'


const PostDetails = () => {

    const { post, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const { slug } = useParams()
    // const openUser =(id) => history.push(`/user/${id}`)


    useEffect(() => {
        dispatch(getPost(slug))
        // eslint-disable-next-line 
    }, [slug])

    if(!post) return null

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
            <h3>Research</h3>
                <h1 style={{padding: '10px'}}>{post.title}</h1>

            </div>
            <div className={styles.body}>
                <img className={styles.featuredImage} src={post.fileUrl ? post.fileUrl : "https://i.postimg.cc/QMR5fZtQ/Amurum.jpg"} alt={post.title}></img>
                <p>{parser(post.content)}</p>
            </div>
            
        </div>
    )
}

export default PostDetails
