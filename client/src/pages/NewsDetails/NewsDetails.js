import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './NewsDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Spinner from '../../components/Spinner/Spinner'
import ReactShare from '../../components/ReactShare'
import parser from 'html-react-parser'
import { getPost } from '../../actions/posts'


const PostDetails = () => {

    const { post, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const { slug } = useParams()


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
            <h3>News <span style={{color: '#0daa8b'}}>|</span> {moment(post.createdAt).format("MMM Do YY")}</h3>
                <h1 style={{padding: '20px'}}>{post.title}</h1>
            </div>
            <div className={styles.body}>
                <img className={styles.featuredImage} src={post.fileUrl ? post.fileUrl : "https://i.postimg.cc/QMR5fZtQ/Amurum.jpg"} alt={post.title}></img>
                <p>{parser(post.content)}</p>
            </div>
            
            <ReactShare url={`https://aplori.org/news/${post.slug}`} title={post.title}/>
        </div>
    )
}

export default PostDetails
