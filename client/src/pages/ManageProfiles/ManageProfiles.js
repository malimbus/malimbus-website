import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import styles from './ManageProfiles.module.css'
import Grid from './Grid/Grid';
import { getProfilesBySearch, getProfiles } from '../../actions/profile'
import UpdateProfile from './UpdateProfile/UpdateProfile'


const ManageProfiles = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState('');
  // eslint-disable-next-line
  const [year, setYear] = useState('');
  const { numberOfPages } = useSelector((state) => state.posts);
  const { profiles } = useSelector((state) => state.profiles)
  const [pageNumber, setPageNumber] = useState()
  const pages = new Array(numberOfPages).fill(0).map((v, i) => i);
  const [currentId, setCurrentId] = useState(null)
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))

 


  // const handleClickOpen = () => () => {
  //   setOpen(true);
   
  // };

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
      history.push('/database');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };


    //   if(!posts) return null

    //   if(isLoading) {
    //       return <Spinner />
    //   }
  
    
    if((!user) || user.result.role !== 'admin') {
      history.push('/')
    }


    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <h1 >Authors' Database</h1>
            <button className={styles.addNew} onClick={()=>setOpen(true)}>Add New Author</button>
                <div className={styles.searchBar}>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} placeholder="Enter member's name and search" />
                <button onClick={searchPost} >Search</button>
                </div>
                {/* <div>
                    <SearchByYear year={year} setYear={setYear} searchPost={searchPost} />
                </div> */}
            </div>
            
            <div className={styles.thumbnails}>
                <Grid profiles={profiles} setCurrentId={setCurrentId} currentId={currentId} setOpen={setOpen}/>
                <UpdateProfile  open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />
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

export default ManageProfiles
