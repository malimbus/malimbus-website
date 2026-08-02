import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Research.module.css'
import { getResearch } from '../../actions/posts'
import Spinner from '../../components/Spinner/Spinner';
import parser from 'html-react-parser'


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }


const Research = () => {

  // const query = useQuery();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { posts, isLoading } = useSelector((state) => state.posts);

  // const [pageNumber, setPageNumber] = useState()
  // const pages = new Array(numberOfPages).fill(0).map((v, i) => i);
 

  useEffect(() => {
      dispatch(getResearch());
      // eslint-disable-next-line
  }, [location]);


  const openPost =(slug) => history.push(`/research/${slug}`)
  // const openUser =(id) => history.push(`/user/${id}`)

      // const handleKeyPress = (e) => {
      //   if (e.keyCode === 13) {
      //     searchPost();
      //   }
      // };

      if(!posts) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
      <div className={styles.featuresContainer} >
        <div className={styles.paragraph}>
            <h1 style={{paddingBottom: '30px'}}>Research</h1>
            {/* <hr className={styles.hrLine}/> */}
            <p> 
            The institute is uniquely positioned within the Amurum Forest Reserve which is home to 
            over 300 of Nigeria’s over 900 bird species. The Amurum Forest Reserve, an Important Bird and
              Biodiversity Area also serves a as stop-over and wintering site for migrant bird species. 
              Thus, the Institute continues to serve as a field station for ecological research for 
            researchers from all over the world. Also, several research programmes are co-ordinated by 
            the Institute research staff and post-graduate students.
            </p>
        </div>

            <div className={styles.items}>
<ul className={styles.autoGrid}>
{
  posts.map((post) => (
    <li onClick={() => openPost(post.slug)}  key={post._id} className={styles.listItem} style={{cursor: 'pointer'}}>    
      <div className={styles.container}>
    <div className={styles.content}>
        <div className={styles.contentOverlay} />
        <img className={styles.imgThumbnail} src={post.fileUrl ? post.fileUrl : "https://i.postimg.cc/QMR5fZtQ/Amurum.jpg"} alt={post.title} />
        <div className={`${styles.contentDetails} ${styles.fadeInBottom}`}>
          <div >{parser(post.content.split(' ').splice(0, 16).join(' '))}</div>
        </div>
    </div>
    <h2 className={styles.title}>{post.title}</h2>
  </div>
  </li>
    ))
  }
</ul>
            </div>

        </div>
    )
}

export default Research
