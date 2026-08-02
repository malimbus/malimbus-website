import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './People.module.css'
import { getProfiles } from '../../actions/profile'
import Spinner from '../../components/Spinner/Spinner';
import Thumbnails from '../../components/Thumbnails/Thumbnails'


const BoardMembers = () => {

  const dispatch = useDispatch()
//   let boardMembers = []
  const { profiles, isLoading } = useSelector((state) => state.profiles)
  const boardMem = profiles?.filter((a) => a?.memberCategory?.includes('council'))
    // boardMembers = [
    //     boardMem[1], 
    //     boardMem[8],
    //     boardMem[4],
    //     boardMem[2],
    //     boardMem[6],
    //     boardMem[5],
    //     boardMem[10],
    //     boardMem[3],
    //     boardMem[12],
    //     boardMem[9],
    //     boardMem[0],
    //     boardMem[11],
    //     boardMem[7],
    // ]

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
                <h1 style={{padding: '20px'}}>Malimbus Council Members</h1>
                <p>Council Members and their addresses.</p>
                
            </div>
            
            <div className={styles.thumbnails}>
                <Thumbnails profiles={boardMem}/>
            </div>
        </div>
    )
}

export default BoardMembers
