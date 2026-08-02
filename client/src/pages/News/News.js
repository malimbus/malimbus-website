import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './News.module.css'
import { getNews } from '../../actions/posts'
import Spinner from '../../components/Spinner/Spinner';

const News = () => {


  const dispatch = useDispatch()
  const history = useHistory()
  const { posts, isLoading, numberOfPages } = useSelector((state) => state.posts);

 
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);
 

  useEffect(() => {
      dispatch(getNews(pageNumber));
      // eslint-disable-next-line
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const openPost =(slug) => history.push(`/news/${slug}`)

      if(!posts) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
      <div className={styles.featuresContainer} >
            <div className={styles.paragraph}>
                <h1 style={{paddingBottom: '30px'}}>News</h1>
                <p> 
                Recent news from the West African Ornithological Society
                </p>
            </div>

            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                    {
                      posts.map((post) => (
                        <li key={post._id} className={styles.listItem}>
                        <img onClick={() => openPost(post.slug)} className={styles.imgThumbnail} src={post.fileUrl ? post.fileUrl : "https://i.postimg.cc/QMR5fZtQ/Amurum.jpg"} alt={post.title} />
                        <h2 style={{cursor: 'pointer'}} onClick={() => openPost(post.slug)}>{post.title}</h2>
                    </li>
                      ))
                    }
                </ul>
            </div>

            <div className={styles.pagination}>
              <IconButton onClick={gotoPrevious}>
                <FirstPageIcon />
              </IconButton>
              {pages.map((pageIndex) => (
                <button className={`${styles.pageNum}` } key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                  {pageIndex + 1}
                </button>
              ))}
              <IconButton onClick={gotoNext}>
                <LastPageIcon />
              </IconButton>
              </div>

        </div>
    )
}

export default News
