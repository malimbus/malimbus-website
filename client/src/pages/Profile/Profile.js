/* eslint-disable */
import React, { useState, useEffect } from 'react'
import parser from 'html-react-parser'
import styles from './Profile.module.css'
import AddIcon from '@material-ui/icons/Add';
import Publications from '../../components/Publications/Publications'
import News from '../../components/News/News'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CheckIcon from '@material-ui/icons/Check';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useSnackbar } from 'react-simple-snackbar'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddPost from '../../components/AddPost/AddPost'
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile'

import { getPostsByUser } from '../../actions/posts'
import { updateProfile, getProfilesByUser, createProfile } from '../../actions/profile'

// import SuccessSnackBar from '../../components/SnackBars/SuccessSnackBar'
// import ErrorSnackBar from '../../components/SnackBars/ErrorSnackBar';


const Profile = () => {

  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { profiles  } = useSelector((state) => state.profiles);
  const { posts } = useSelector((state) => state.posts);
  const newsPosts = posts.filter((p) => p.postType === 'news')
  const publications = posts.filter((p) => p.postType === 'publication')
  const document = posts.filter((p) => p.postType === 'document')
  const [profile, setProfile] = useState(null)
  // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const [newUser, setNewUser] = useState({
    name: user?.result.name,
    email: user?.result.email,
    userId: user?.result._id,
    profilePicture: '',
    about: '',
  })


console.log(profile)

useEffect(() => {
  for (let i = 0; i < profiles.length; i++) {
    if(profiles[i]?.email === user?.result?.email) {
      setProfile(profiles[i])
    } else {
      setProfile(newUser)
    }
  }
 
},[profiles])

  const handleSubmitProfile =(id) => {
      dispatch(updateProfile(id, {...profile, userId: user?.result?._id, email: user?.result?.email}, openSnackbar))
    
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    dispatch(getProfilesByUser({ search: user?.result?.email }));

  },[location])

  useEffect(() => {
    dispatch(getPostsByUser({ search: user?.result?.email }));
  },[user])

  if(!user) {
    history.push('/auth')
}

  return (
    <>
        {/* {profile === null && (
          <div className={styles.warningContainer}>
            <div className={styles.warningContent}>
              <div><i style={{width: '100%', display: 'inlineBlock', textAlign: 'center', color: '#FBD008', fontSize: '50px'}} className="fas fa-exclamation-triangle"></i></div>
              <h1 style={{textAlign: 'center', padding: '20px'}}>Warning!</h1>
              <p>We could not verify your identity. Please contact the admin (admin@aplori.org) for verification</p>
              <div className={styles.contactButtons}>
                <button className={styles.contactButton} onClick={() =>history.push('/contact')}>Contact Admin</button>
                <button className={styles.contactButton} onClick={() =>history.push('/')}>Back to Home</button>
              </div>
            </div>
        </div>
        )} */}

        <div>
         
            <div >
            <div className={styles.containerHead}>
            </div>
            <div className={styles.containerBody}>
              <div className={styles.profilePicture}> 
                <img 
                  src={profile?.profilePicture ? profile?.profilePicture : "https://i.postimg.cc/W4z4Xtck/avatar.png"} alt={profile?.name}
                />
              </div>
              <div className={styles.name}>
                <h2>{profile?.name}</h2>
                <h2>{profile?.email}</h2>
              </div>
              {/* <div className={styles.location}>
                <LocationOnIcon /> 
                <p>{profile?.currentLocation}</p>
              </div> */}

              {/* {(profile?.designation && profile?.title) && (
            <div className={styles.works}>
            <h4 style={{textAlign: 'center'}}>{profile?.designation} at {profile?.placeOfWork}</h4>
           </div>
          )} */}

              {/* <div className={styles.bio} >
                <p className="bio">{profile?.bio}</p>
              </div> */}

              
              {/* <div>
              <div className="entry">
                <input type="checkbox" className="read-more-input" id="readmore" />  
                <div className="read-more-wrap">
                  {profile.about && (
                    <div className="read-more-target" >
          
                    {parser(profile?.about)}
                   
                  </div>
                  )}
                </div>
                <label htmlFor="readmore" className="read-more-trigger" />
              </div>
            </div> */}

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
              <div>
    
               <div className={styles.buttons}>
                  <div className={styles.edit}>
                    <button onClick={() => setOpen((prevState) => !prevState)} className={styles.editButton}><AddIcon />Submit</button>
                    <UpdateProfile 
                      profile={profile} 
                      setProfile={setProfile} 
                      handleSubmitProfile={handleSubmitProfile} 
                      
                    />

                     {!user?.result?.isSubscriber && (
                       <button onClick={() =>  history.push('/subscribe')} className={styles.subscribeButton}><MonetizationOnIcon />Subscribe</button>
                     )}
                  </div>
    
               
    
               </div>
              </div>
            </div>
    
            <div>
                <AddPost open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />
            </div>
    
            <div className="tabset">
            
            
            <input type="radio" name="tabset" id="tab3" aria-controls="publications" defaultChecked />
            <label htmlFor="tab3">Publications</label>
          
            <input type="radio" name="tabset" id="tab4" aria-controls="news" />
            <label htmlFor="tab4">News</label>
    
             <input type="radio" name="tabset" id="tab5" aria-controls="files" />
              <label htmlFor="tab5">Files</label>
    
            <div className="tab-panels">
              <section id="publications" className="tab-panel">
                <Publications publications={publications} open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId}/>
              </section>
    
              <section id="news" className="tab-panel">
                <News newsPosts={newsPosts} open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />
              </section>
    
              <section id="files" className="tab-panel">
              <News newsPosts={document} open={open} setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />
              </section>
    
            </div>
          </div>
    
          {/* <SuccessSnackBar />
          <ErrorSnackBar /> */}
          </div>
    
          )}
        </div>
    </>
    )
}

export default Profile
