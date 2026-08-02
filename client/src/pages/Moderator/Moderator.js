import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './Moderator.module.css'
import Card from './Card'
import { getPosts, deletePost } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
import AddIcon from '@material-ui/icons/Add';

import { getPostsBySearch } from '../../actions/posts';
import AddPost from '../../components/AddPost/AddPost';



// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }



const Moderator= () => {

  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'))
  let year = ""


  const { numberOfPages } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);

  const handleEdit = (id) => {
    setOpen((prevState) => !prevState)
    setCurrentId(id)
  }
 
  console.log(posts)

  useEffect(() => {
      dispatch(getPosts(pageNumber));
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, [pageNumber, dispatch]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const searchPost = () => {
    if (search.trim() || year.trim() ) {
      dispatch(getPostsBySearch({ search, year }));
      // history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  


  // useEffect(() => {
  //   if(message) {
  //     openSnackbar('Post added successfully')
  //   }
  // }, [])

      // if(!posts) return null

      // if(isLoading) {
      //     return <Spinner />
      // }


      if((!user) || user.result.role !== 'admin') {
        history.push('/')
      }
  
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <h1 style={{padding: '20px'}}>Moderation Page</h1>
                {/* <p>Search our Journal repository for peer-reviewed, scientific publications produced by staff and students of the Institute. The lists include all publications produced since the Institute's inception</p> */}
                <div className={styles.searchBar}>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Type and press enter" />
                <button onClick={searchPost} >Search</button>
                </div>
                <div className={styles.btnContainer}>
                  <button onClick={() => setOpen((prevState) => !prevState)} className={styles.editButton}><AddIcon />Create Post</button>
                </div>
                <div className={styles.buttons}>
              
           </div>
                <AddPost open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />
            </div>

            <div className={styles.cardContainer}>
              {posts.map((pub) => (
                <Card key={pub._id} pub={pub} handleEdit={handleEdit} deletePost={deletePost}/>
              ))
              }
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

export default Moderator
