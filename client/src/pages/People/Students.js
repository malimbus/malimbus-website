import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './People.module.css'
import { getProfiles } from '../../actions/profile'
import Spinner from '../../components/Spinner/Spinner';
import Thumbnails from '../../components/Thumbnails/Thumbnails'


const Students = () => {

  const dispatch = useDispatch()
  const { profiles, isLoading } = useSelector((state) => state.profiles)
  const students = profiles.filter((a) => a?.memberCategory?.includes('student'))
  

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
                <h1 style={{padding: '20px'}}>Our current students</h1>
                <p>Our students are passionate individuals who came from different academic backgrounds to pursue their interest in conservation biology. Learn about who they are and what they are currently doing.</p>
                
            </div>
            
            <div className={styles.thumbnails}>
                <Thumbnails profiles={students}/>
            </div>
        </div>
    )
}

export default Students
