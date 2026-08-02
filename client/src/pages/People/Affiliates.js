import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './People.module.css'
import { getProfiles } from '../../actions/profile'
import Spinner from '../../components/Spinner/Spinner';
// import Thumbnails from '../../components/Thumbnails/Thumbnails'
import Grid from '../../components/Grid/Grid';

const Affiliates = () => {

  const dispatch = useDispatch()
  const { profiles, isLoading } = useSelector((state) => state.profiles)
  const affiliates = profiles.filter((a) => a?.memberCategory?.includes('affiliate'))
  

  useEffect(() => {
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, []);

      if(!profiles) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <h1 style={{padding: '20px'}}>APLORI Affiliates</h1>
                <p>Our degree is European standard and every year we receive guests from reputable international institutions who are visiting the institute for teaching and various purposes. Here you’ll find their profiles and read more about their activities</p>
                
            </div>
            
            <div className={styles.thumbnails}>
                <Grid profiles={affiliates}/>
            </div>
            
            {/* <div className={styles.pagination}>
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
             
            </div> */}
        </div>
    )
}

export default Affiliates
