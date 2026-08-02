import React, { useEffect } from 'react'
import parser from 'html-react-parser'
import styles from './Users.module.css'
import Publications from './Publications/Publications'
import News from './News/News'
import Document from './Document/Document'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { getPostsByUser } from '../../actions/posts'
import { getProfiles } from '../../actions/profile'
import Spinner from '../../components/Spinner/Spinner';


const Users = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { profiles  } = useSelector((state) => state.profiles);
    const profile = profiles.filter((p) => p.userId === id)
    const { posts, isLoading } = useSelector((state) => state.posts);
    const newsPosts = posts.filter((p) => p.postType === 'news' && p.isApproved)
    const publications = posts.filter((p) => p.postType === 'publication' && p.isApproved)
    const document = posts.filter((p) => p.postType === 'document' && p.isApproved)
 
console.log(profile[0]?.about?.length)

  useEffect(() => {
    dispatch(getProfiles())
    dispatch(getPostsByUser({ search: profile[0]?.email }));
    // eslint-disable-next-line
},[id])

if((!profile) || (!publications) || (!document) || (!newsPosts)) return null

if(isLoading) {
    return <Spinner />
}

  return (
 
        <div >
        <div className={styles.containerHead}>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.profilePicture}> 
            <img 
              src={profile[0]?.profilePicture ? 
              profile[0]?.profilePicture : "https://i.postimg.cc/W4z4Xtck/avatar.png"} alt={profile?.name}
            />
          </div>
          <div className={styles.name}>
            <h2>{profile[0]?.title && profile[0]?.title} {profile[0]?.name}</h2>
          </div>
          <div className={styles.location}>
            <LocationOnIcon /> 
            <p>{profile[0]?.currentLocation}</p>
          </div>

          {(profile[0]?.designation && profile[0]?.title) && (
            <div className={styles.works}>
            <h4 style={{textAlign: 'center'}}>{profile[0]?.designation} at {profile[0]?.placeOfWork}</h4>
           </div>
          )}

          
          <div className={styles.bio}>
            <p>{profile[0]?.bio}</p>
          </div>

          <div>
              <div className="entry">
                <input type="checkbox" className="read-more-input" id="readmore" />  
                <div className="read-more-wrap">
                  {profile[0]?.about && (
                    <div className="read-more-target" >
          
                    {parser(profile[0]?.about)}
                   
                  </div>
                  )}
                </div>
              {(profile[0]?.about?.length > 50) && (
                  <label htmlFor="readmore" className="read-more-trigger" />
              )}
              </div>
            </div>


        {posts.length !== 0 && (
            <div className={styles.stats}>
            <div className={styles.statBox}>
              <p>Papers</p>
              <h1>{publications.length < 10 ? "0" + publications.length : publications.length}</h1>
            </div>
            <div className={styles.statBox}>
              <p>Posts</p>
              <h1>{newsPosts.length < 10 ? "0" + newsPosts.length : newsPosts.length}</h1>
            </div>
            <div className={styles.statBox}>
              <p>Files</p>
              <h1>{document.length < 10 ? "0" + document.length : document.length}</h1>
            </div>
          </div>
        )}

        </div>


      {posts.length !== 0 && (
          <div className="tabset">
        
          <input type="radio" name="tabset" id="tab3" aria-controls="publications" defaultChecked />
          <label htmlFor="tab3">Publications</label>
        
          <input type="radio" name="tabset" id="tab4" aria-controls="news" />
          <label htmlFor="tab4">News</label>
  
           <input type="radio" name="tabset" id="tab5" aria-controls="files" />
            <label htmlFor="tab5">Files</label>
  
          <div className="tab-panels">
  
            <section id="publications" className="tab-panel">
              <Publications publications={publications} profiles={profiles} />
            </section>
  
            <section id="news" className="tab-panel">
              <News newsPosts={newsPosts} profiles={profiles} />
            </section>
  
            <section id="files" className="tab-panel">
            <Document newsPosts={document} profiles={profiles} />
            </section>
  
          </div>
        </div>
      )}
      </div>

    )
}

export default Users
