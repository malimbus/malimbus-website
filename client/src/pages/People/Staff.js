import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './People.module.css'
import { getProfiles } from '../../actions/profile'
import Spinner from '../../components/Spinner/Spinner';
// import Thumbnails from '../../components/Thumbnails/Thumbnails'
import Grid from '../../components/Grid/Grid';

const Staff = () => {


  const dispatch = useDispatch()
  const { profiles, isLoading } = useSelector((state) => state.profiles)
  const staffs = profiles.filter((a) => a?.memberCategory?.includes('staff'))
  const staff = staffs.sort((a, b) => a.name.localeCompare(b.name))
  

  useEffect(() => {
      dispatch(getProfiles())
      // eslint-disable-next-line
  }, []);

      if(!profiles) return null

      if(isLoading) {
          return <Spinner />
      }
  

    return (
        <div className={styles.layout} style={{backgroundColor: '#EEEEEE'}}>
            <div className={styles.header}>
                <h1 style={{padding: '20px'}}>APLORI Staff</h1>
                <p>We are proud to introduce you to our dedicated, caring and supportive staff (both academic and non-academic), who work very hard to make our Institute great. </p>
                <p style={{color: "gray", fontSize: '14px', paddingTop: '15px'}}>Names arranged in alphabetical order</p>
            </div>
            
            <div className={styles.thumbnails}>
                <Grid profiles={staff}/>
            </div>
        </div>
    )
}

export default Staff
