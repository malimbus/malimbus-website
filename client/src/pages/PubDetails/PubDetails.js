import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './PubDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import parser from 'html-react-parser'
import Spinner from '../../components/Spinner/Spinner'

import { getPost } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
import ReactShare from '../../components/ReactShare'



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
     
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }));


const PubDetails = () => {

  const history = useHistory()
  const classes = useStyles()
  let currentPost = []
  const { post, isLoading } = useSelector((state) => state?.posts)
  currentPost = [post]
  const { profiles } = useSelector((state) => state.profiles)
  const dispatch = useDispatch()
  const { slug } = useParams()
  console.log(currentPost)


    const user = JSON.parse(localStorage.getItem('profile'))

    //Get date of the next 5 years from when paper is published
    var d = new Date(post?.createdAt);
    var year = d.getFullYear()
    var month = d.getMonth()
    var day = d.getDate()
    var releaseDate = new Date(year + 5, month, day)
 
    //Check if date is in the past
    function isDateBeforeToday(date) {
      return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }
  
  const dateIsPast = isDateBeforeToday(releaseDate)
   

    useEffect(() => {
        dispatch(getPost(slug))
        dispatch(getProfiles())
        // eslint-disable-next-line
    }, [slug, dispatch])

    // MATCH PUBLICATIONS WITH THEIR CONTENTS
  const nameEmailMap = profiles?.reduce((acc, {
    name,
    email,
    userId,
    profilePicture
  }) => {
    acc[email] = {
      name,
      userId,
      profilePicture
    };
    return acc;
  }, {})
  
  const currentArticle = currentPost?.map(({
    title,
    content,
    volume,
    page,
    year,
    _id,
    slug,
    authors,
    fileUrl,
    createdAt,
  }) => ({
    title,
    content,
    volume,
    page,
    _id,
    year,
    slug,
    fileUrl,
    createdAt,
    authors: authors.map(entry => (nameEmailMap[entry] ? { ...nameEmailMap[entry]
    } : {
      name: entry
    }))
  }));
  
  
  // const isPdf = currentArticle[0]?.fileUrl?.split('.').pop()
  // const openUser =(id) => history.push(`/user/${id}`)
  // https://www.npmjs.com/package/react-sidebar?activeTab=versions

    if(!post) return <div>Please</div>

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
            <div style={{textAlign: 'left', fontSize: '14px'}}>Publication | {moment(currentArticle[0]?.createdAt).format("MMM Do YY")}</div>
            <h2 style={{paddingTop: '20px', fontSize: '16px', textAlign: 'left'}}>{currentArticle[0]?.volume} <span>[Page {currentArticle[0]?.page}]</span></h2>
                <h1 style={{padding: '10px', paddingLeft: '0px', fontSize: '30px', lineHeight: '30px'}}>{currentArticle[0]?.title}</h1>
                 <hr className={styles.hrLine}/>

                 <div className={classes.root}>
                      {currentArticle[0]?.authors.map((a) => 
                      <div onClick={ a.userId ? () => history.push(`/user/${a.userId}`)
                          : null } 
                            className={styles.user} 
                            key={a.name} >
                              <span style={{fontSize: '14px', color: '#1976d2', lineHeight: '12px'}}>
                                {a.name},
                              </span>
                          </div>)}
                    </div>
                 
                 <hr className={styles.hrLine}/>
                {/* <div className={styles.author} >
                    <p style={{paddingRight: '8px'}} >Year: {currentArticle[0]?.year} </p>
                   <div>DOI: <a style={{color: 'blue', paddingRight: '8px'}} href={currentArticle[0]?.doi}>{currentArticle[0]?.doi}</a> </div>
                   
                    <h3 style={{marginRight: '5px'}}> | <span style={{cursor: 'pointer', color: '#0daa8b', paddingLeft: '8px'}}  onClick={() => openUser(post?.userId)}>{post?.author}</span></h3>
                </div> */}

            </div>
            <div className={styles.body}>
                <div>{parser(currentArticle[0]?.content)}</div>
                
            </div>
            {(user && user?.result?.isSubscriber ? user && user?.result?.isSubscriber : dateIsPast) && (
                <div style={{padding: '40px 0px'}}>               
                <a  className={post.fileUrl.length > 0  ? styles.button : styles.button2} href={post.fileUrl} download>{`${post.fileUrl.length > 0 ? 'Download PDF  ' : 'PDF not available'}`}</a>
              </div>
            )}
            {/* {(user && user?.result?.isSubscriber) && (
                <div style={{padding: '40px 0px'}}>               
                <a  className={styles.button} href={post.fileUrl} download>Download PDF</a>
              </div>
            )} */}
          
            <ReactShare url={`https://aplori.org/plublications/${currentArticle[0]?.slug}`} title={currentArticle[0]?.title} />
        </div>
    )
}

export default PubDetails
