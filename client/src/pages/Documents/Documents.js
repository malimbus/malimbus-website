import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './Documents.module.css'
import Card from './Card'
import { getDocuments } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
// import Spinner from '../../components/Spinner/Spinner';

import { getPostsBySearch } from '../../actions/posts';


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }



const Publications = () => {

  // const query = useQuery();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch()
  const history = useHistory()
  // const location = useLocation()
  const [search, setSearch] = useState('');
  let year = ""
  // console.log(year)


  const { numberOfPages } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const { profiles } = useSelector((state) => state.profiles)
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);
  const docPosts = posts.filter((p) => p.postType === 'document')

 

  useEffect(() => {
      dispatch(getDocuments(pageNumber));
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  
  //MATCH PUBLICATIONS WITH THEIR CONTENTS
  const nameEmailMap = profiles.reduce((acc, {
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
  
  const articles = docPosts?.map(({
    title,
    content,
    doi,
    year,
    _id,
    author,
    avatar,
    authors,
    userId,
    journal,
    fileUrl,
    createdAt,
    slug,
  }) => ({
    title,
    content,
    _id,
    doi,
    year,
    author,
    avatar,
    userId,
    journal,
    fileUrl,
    createdAt,
    slug,
    authors: authors.map(entry => (nameEmailMap[entry] ? { ...nameEmailMap[entry]
    } : {
      name: entry
    }))
  }));
  

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


      // if(!posts) return null

      // if(isLoading) {
      //     return <Spinner />
      // }
  

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <h1 style={{padding: '20px'}}>Document Archives</h1>
                <p>Search our document archive for scientific materials written by staff and students of the Institute. Download instantly for your research purpose</p>
                <div className={styles.searchBar}>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Type and press enter" />
                <button onClick={searchPost} >Search</button>
                </div>
                {/* <div>
                    <SearchByYear year={year} setYear={setYear} searchPost={searchPost} />
                </div> */}
            </div>

            <div className={styles.cardContainer}>
              {articles.map((pub) => (
                <Card key={pub._id} pub={pub} />
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

export default Publications
