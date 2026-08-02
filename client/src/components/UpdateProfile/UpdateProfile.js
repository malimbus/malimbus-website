import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import styles from './UpdateProfile.module.css'
import Input from '../AddPost/Input'
import ProfileImage from './ProfileImage';
import Quill from './Quill'

import { getProfiles } from '../../actions/profile'

const EditProfile = ({profile, setProfile, handleSubmitProfile }) => {
  const [open, setOpen] = React.useState(false);
  let scroll = 'paper'
  const dispatch = useDispatch()


  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  
  
  const submitAndClose =(id) => {
    handleSubmitProfile(id)
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getProfiles())
  },[dispatch])

  //Add and remove array items by toggling checkbox
//   const handleSelection= (e) => {
//     if(e.target.checked) {
//       setProfile({...profile, memberCategory:[...profile.memberCategory, e.target.value]})
      
//   }
//   else {
//       const newState = {...profile, memberCategory: profile.memberCategory.filter(prev => prev !== e.target.value)};
//       setProfile(newState)
// }

// }

  const handleClickOpen = () => () => {
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
    // setUser(JSON.parse(localStorage.getItem('profile')))
  };

  return (
    <div>
        <button onClick={handleClickOpen('paper')} className={styles.editButton}><EditIcon />Edit Profile</button>
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

          <Grid container spacing={2}>
            {/* <Input name="firstName" label="First Name" value={profile.firstName} handleChange={handleChange} type="text" required={false} half />
            <Input name="lastName" label="Last Name" value={profile.lastName} handleChange={handleChange} type="text" half required={false} /> */}
            <Input name="name" label="Full Name" value={profile?.name} handleChange={handleChange} type="text" required={false} />
            <Input name="email" label="Email address" value={profile?.email} handleChange={handleChange} type="text" required={false} half disabled/>
            <Input name="phone2" label="Phone Number " value={profile?.phone} handleChange={handleChange} type="text" required={false} half />
            <Input name="title" label="Title (e.g, Prof. Dr. Mr. Mrs. Ms)" value={profile?.title} handleChange={handleChange} type="text" half required={false} />
            <Input name="designation" label="Designation" value={profile?.designation} handleChange={handleChange} type="text" half required={false} />
            <Input name="currentLocation" label="Current Location" value={profile?.currentLocation} handleChange={handleChange} type="text" required={false} half />
            <Input name="placeOfWork" label="Place of Work" value={profile?.placeOfWork} handleChange={handleChange} type="text" required={false} half />
            <Input name="bio" label="Short Bio" value={profile?.bio} handleChange={handleChange} type="text" required={false} multiline rows={4}  inputProps={{ maxLength: 600 }} />
            <Quill setProfile={setProfile} profile={profile} handleChange={handleChange}  />
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