import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector } from 'react-redux';
import Input from '../../../components/AddPost/Input'
import ProfileImage from './ProfileImage';
import { useSnackbar } from 'react-simple-snackbar'

import { getProfiles, updateProfile, createProfile } from '../../../actions/profile'

const EditProfile = ({open, setOpen, currentId, setCurrentId}) => {
  let scroll = 'paper'
  const dispatch = useDispatch()
// eslint-disable-next-line 
const [openSnackbar, closeSnackbar] = useSnackbar()
  const [profile, setProfile] = useState(
    {
        name: "",
        email: "",
        phone: "",
        phone2: "",
        memberCategory: [],
        yearOfGraduation: "",
        userId: "",
        title: "",
        bio: "",
        profilePicture: "",
        currentLocation: "",
        placeofWork: "",
        designation: "",
        affiliation: "",
        about: ""
      }
  )


  const selectedProfile = useSelector((state) => (currentId ? state.profiles.profiles.find((p) => p._id === currentId) : null));


  // const handleSubmitProfile =(id) => {
  //   dispatch(updateProfile(id, profile))
  //     console.log(profile)
  // }

  
useEffect(() => {
    if(selectedProfile) {
      setProfile(selectedProfile);
    }
    // eslint-disable-next-line
  }, [currentId]);


  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  
  
  const submitAndClose =(id) => {
    if(currentId) {
      dispatch(updateProfile(id, profile, openSnackbar))
    } else {
      dispatch(createProfile(profile, openSnackbar))
    }
    setProfile({
      name: "",
      email: "",
      phone: "",
      phone2: "",
      memberCategory: [],
      yearOfGraduation: "",
      userId: "",
      title: "",
      bio: "",
      profilePicture: "",
      currentLocation: "",
      placeofWork: "",
      designation: "",
      affiliation: "",
      about: ""
    })
    setOpen(false)
  }
  

  useEffect(() => {
    dispatch(getProfiles())
  },[dispatch])

  //Add and remove array items by toggling checkbox
  const handleSelection= (e) => {
    if(e.target.checked) {
      setProfile({...profile, memberCategory:[...profile.memberCategory, e.target.value]})
      
  }
  else {
      const newState = {...profile, memberCategory: profile.memberCategory.filter(prev => prev !== e.target.value)};
      setProfile(newState)
}

}


  const handleClose = () => {
    setOpen(false);
    // setUser(JSON.parse(localStorage.getItem('profile')))
  };

  return (
    <div>
        {/* <button onClick={handleClickOpen('paper')} className={styles.editButton}><EditIcon />Edit Profile</button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Update Profile</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        
        <Grid style={{paddingTop: '10px', paddingBottom: '10px'}}>
          <ProfileImage profile={profile} setProfile={setProfile} />
        </Grid>
            <Grid style={{paddingTop: '10px', paddingBottom: '10px'}}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                  <h2>Select your category</h2>
              </FormLabel>
              <FormGroup aria-label="category" name="memberCategory" value={profile?.memberCategory} onChange={handleSelection}>
                  <FormControlLabel value="editor" control={<Checkbox />} checked={profile?.memberCategory?.includes('editor')} label="Editor" />
                  <FormControlLabel value="author" control={<Checkbox />} checked={profile?.memberCategory?.includes('author')} label="Author" />
                  <FormControlLabel value="reviewer" control={<Checkbox />} checked={profile?.memberCategory?.includes('reviewer')} label="Reviewer" />
                  <FormControlLabel value="council" control={<Checkbox />} checked={profile?.memberCategory?.includes('council')} label="Council Member" />
                </FormGroup>
            </FormControl>
            </Grid>

              <Grid container spacing={2} >
                
            {/* {(
              (profile?.memberCategory?.includes('student')) || 
              (profile?.memberCategory?.includes('alumni'))) && 
            (
                <Input name="yearOfGraduation" label="Year of Graduation" value={profile.yearOfGraduation} handleChange={handleChange} type="Number" half required={false} />
            )} */}
              </Grid>

          <Grid container spacing={2}>
            {/* <Input name="firstName" label="First Name" value={profile.firstName} handleChange={handleChange} type="text" required={false} half />
            <Input name="lastName" label="Last Name" value={profile.lastName} handleChange={handleChange} type="text" half required={false} /> */}
            <Input name="name" label="Full Name" value={profile?.name} handleChange={handleChange} type="text" required={false} />
            <Input name="email" label="Email Address" value={profile?.email} handleChange={handleChange} type="text" required={false} half/>
            <Input name="phone" label="Phone Number" value={profile?.phone1} handleChange={handleChange} type="text" required={false} half />
            <Input name="title" label="Title" value={profile?.title} handleChange={handleChange} type="text" half required={false} />
            {/* <Input name="designation" label="Designation" value={profile?.designation} handleChange={handleChange} type="text" half required={false} /> */}
            <Input name="currentLocation" label="Country of Origin" value={profile?.currentLocation} handleChange={handleChange} type="text" required={false} half />
            <Input name="placeOfWork" label="Place of Work (Affiliation)" value={profile?.placeOfWork} handleChange={handleChange} type="text" required={false} multiline rows={4}/>
            {/* <Input name="bio" label="Short Bio" value={profile?.bio} handleChange={handleChange} type="text" required={false} multiline rows={4}  inputProps={{ maxLength: 600 }} />
            <Quill setProfile={setProfile} profile={profile} handleChange={handleChange} /> */}
        </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => submitAndClose(profile._id)} color="primary">
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default EditProfile