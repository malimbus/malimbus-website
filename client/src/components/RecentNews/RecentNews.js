import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner'
import styles from './RecentNews.module.css'
import { getNews } from '../../actions/posts'


const RecentNews = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { posts, isLoading } = useSelector((state) => state.posts);
 

  useEffect(() => {
      dispatch(getNews());
       // eslint-disable-next-line 
  }, []);

  const openPost =(slug) => history.push(`/news/${slug}`)

      if(!posts) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
      <div className={styles.featuresContainer} >

            <div className={styles.items}>
                <ul className={styles.autoGrid}>
                    {
                      posts.slice(0, 8).map((post) => (
                        <li key={post._id} className={styles.listItem}>
                        <img onClick={() => openPost(post.slug)} className={styles.imgThumbnail} src={post.fileUrl} alt={post.title} />
                        <h2 style={{cursor: 'pointer'}} onClick={() => openPost(post.slug)}>{post.title}</h2>
                    </li>
                      ))
                    }
                </ul>

                <div className={styles.loadMore}>
                <button className={styles.loadMoreBtn}
                  onClick={()=> history.push('/news')} style={{}}>
                      Read more News
                </button>
                </div>
            </div>

        </div>
    )
}

export default RecentNews
