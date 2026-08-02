import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './Region.module.css'
// import SearchByYear from './SearchByYear'
import Card from './Card'
import { getPublications } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
import { useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';

import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom'

const Region = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const location = useLocation()

  const region = history.location.region

  console.log(region)

  const { numberOfPages } = useSelector((state) => state.posts);
  const { posts } = useSelector((state) => state.posts);
  const { profiles } = useSelector((state) => state.profiles)
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);
  const publicationPosts = posts.filter((p) => p.postType === 'publication')


  console.log(posts)


  useEffect(() => {
      dispatch(getPostsBySearch({ region, search, year }));
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, []);

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
  
  const articles = publicationPosts?.map(({
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
    slug,
    volume,
    page,
    fileUrl,
    createdAt,
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
    slug,
    volume,
    page,
    fileUrl,
    createdAt,
    authors: authors.map(entry => (nameEmailMap[entry] ? { ...nameEmailMap[entry]
    } : {
      name: entry
    }))
  }));
  

  const searchPost = () => {
    if (search.trim() || year.trim() ) {
      dispatch(getPostsBySearch({ search, year }));
    } else {
      history.push('/publications');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'))
    if(user) setIsLoggedIn(true)
  },[location])
  // console.log(posts)

      if(!posts) return null

      // if(isLoading) {
      //     return <Spinner />
      // }
  

    return (
      <div>
        <div className={styles.coverImg}>
                <img className={styles.img} src="https://res.cloudinary.com/wabis/image/upload/v1634134538/malimbus-special/Ibadan-Malimbe_eqy0sf.jpg" alt="publications" />
              </div>
        <div className={styles.layout}>
            <div className={styles.header}>
              <div className={styles.topic}>
                <h1 style={{padding: '40px', fontSize: '40px', lineHeight: '50px'}}>{`Region: ${region}`}</h1>

                {/* {
                  isLoggedIn ? 
                  (
                    <div>
                      <p style={{color: 'black'}}>Search and download full texts of previous publications</p>
                    </div>
                  )
                  
                  :
                  (
                    <Link to="/auth">
                    <Button
                      variant="contained"
                      color="secondary"
                      // className={classes.button}
                      style={{backgroundColor: 'green'}}
                      startIcon={<LockIcon />}
                    >
                      Login to access full texts
                    </Button>
                </Link>
                  )
                  
                } */}

              </div>
                {/* <div className={styles.searchBar}>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Type and press enter" />
                <button onClick={searchPost} >Search</button>
                </div> */}
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
        </div>
    )
}

export default Region
