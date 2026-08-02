import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './Alumni.module.css'
import SearchByYear from './SearchByYear'
import { getProfiles } from '../../../actions/profile'
import Spinner from '../../../components/Spinner/Spinner';
// import Thumbnails from '../../../components/Thumbnails/Thumbnails'
import Grid from '../../../components/Grid/Grid';

import { getProfilesBySearch } from '../../../actions/profile'


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Alumni = () => {

  // const query = useQuery();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch()
  const history = useHistory()
  // const location = useLocation()

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');


  const { numberOfPages } = useSelector((state) => state.posts);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { profiles } = useSelector((state) => state.profiles)
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);

  const alumnis = profiles.filter((a) => a?.memberCategory?.includes('alumni'))
  const alumni = alumnis.sort((a, b) => a.name.localeCompare(b.name))
  // console.log(alumni)

  useEffect(() => {
    //   dispatch(getPublications(pageNumber));
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

    
  const searchPost = () => {
    if (search.trim() || year.trim() ) {
      dispatch(getProfilesBySearch({ search, year }));
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


      if(!posts) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <h1 >APLORI Alumni</h1>
                <p>We are very proud of our graduates and what they are currently doing globally. At APLORI, we maintain a vibrant community of our past students worldwide. Our Alumni finds different positions in a variety of places, such as government institutions, academia, NGOs. Find out what they are up to by going through their profiles below.</p>
                <div className={styles.searchBar}>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Type and press enter" />
                <button onClick={searchPost} >Search</button>
                </div>
                <div>
                    <SearchByYear year={year} setYear={setYear} searchPost={searchPost} />
                </div>
            </div>
            
            <div className={styles.thumbnails}>
                <Grid profiles={alumni}/>
            </div>
            
            <div className={styles.pagination} style={{display: 'none'}}>
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

export default Alumni
