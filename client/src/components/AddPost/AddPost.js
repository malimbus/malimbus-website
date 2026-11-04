/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar'
import { useSelector, useDispatch  } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import { TextField, Grid } from '@material-ui/core';
import styles from '../AddPost/AddPost.module.css'
import PostType from './PostType'
import Input from './Input'
import Editor from './Editor';
import Uploader from './Uploader'
import ImageKit from './ImageKit'
import Authors from './Authors'

import { createPost, updatePost } from '../../actions/posts'
import { getProfiles } from '../../actions/profile';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#dddddd',
    color: 'black',
    height: '58px',
    marginBottom: '25px',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddPost({ setOpen, open, currentId, setCurrentId }) {

  const classes = useStyles();

  const [postData, setPostData] = useState({ 
    postType: null,
    author: '',
    userId: '',
    email: '',
    fileUrl: '',
    title: '',
    authors: '',
    content: '',
    page: '',
    year: '',
    volume: '',
    avatar: '',
    region: '',
    isPrivate: false,
    isApproved: false,
  }
)

console.log(postData)

let currentUser = []
const dispatch = useDispatch()
const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
const { profiles  } = useSelector((state) => state.profiles);
currentUser = profiles.filter((p) => p?.email === user?.result?.email)
// eslint-disable-next-line 
const [openSnackbar, closeSnackbar] = useSnackbar()
const [region, setRegion] = useState({})

useEffect(() => {
  setPostData({...postData, region: region?.title})
},[region])



useEffect(() => {
  if (post) {
    setPostData(post);
    // setPostData({...post, fileUrl: post.fileUrl})
  }
}, [post]);

useEffect(() => {
  setUser(JSON.parse(localStorage.getItem('profile')))
},[postData])

useEffect(() => {
    setPostData({...postData, authors: [...postData.authors, user?.result?.email]})
}, [dispatch])


useEffect(() => {
  dispatch(getProfiles());
},[dispatch])



const handleSubmit = (e) => {
  e.preventDefault();

  // Prevent news articles from being submitted without a cover image
  if (
    postData.postType === 'news' &&
    (!postData.fileUrl || !postData.fileUrl.trim())
  ) {
    alert(
      'Please upload a cover photograph and wait for the upload to finish before submitting.'
    );
    return;
  }

  if (currentId) {
    dispatch(updatePost(currentId, postData, openSnackbar));
  } else {
    dispatch(
      createPost(
        {
          ...postData,
          author: user?.result?.name,
          userId: user?.result?._id,
          email: user?.result?.email,
          avatar: currentUser[0]?.profilePicture,
        },
        openSnackbar
      )
    );
  }

  clear();
  handleClose();
  // window.location.reload();
};

  const clear =() => {
    setCurrentId(null) 
    setPostData({ 
      postType: null,
      author: '',
      userId: '',
      fileUrl: '',
      title: '',
      authors: [],
      content: '',
      year: '',
      page: '',
      volume: '',
      region: '',
      isPrivate: false,
      isApproved: false,
    }
  )
}

const handleClose = () => {
  setOpen(false);
  clear()
};


  const handleChange = (e) => setPostData({ ...postData, [e.target.name]: e.target.value });
  
   //Add and remove array items by toggling checkbox
   const handleApproved = (e) => {
    if(e.target.checked) {
      setPostData({...postData, isApproved: true})
  }
  else {
    setPostData({...postData, isApproved: false})
}

}


// const isPdf = postData.fileUrl.split('.').pop()
const [isPdf, setIsPdf] = useState(false)

const CustomPaper = (props) => {
  return <Paper elevation={4} {...props} />;
};


const regions = [
  { title: 'Benin'},
  { title: 'Burkina Faso'},
  { title: 'Burundi'},
  { title: 'Chad'},
  { title: 'Cameroun'},
  { title: 'Cape Verde'},
  { title: 'Central African Republic'},
  { title: 'Angola'},
  { title: 'Congo'},
  { title: 'DRC'},
  { title: 'Equatorial Guinea'},
  { title: 'Gabon'},
  { title: 'The Gambia'},
  { title: 'Ghana'},
  { title: 'Guinea Bissau'},
  { title: 'Guinea'},
  { title: 'Ivory Coast'},
  { title: 'Liberia'},
  { title: 'Mali'},
  { title: 'Mauritania'},
  { title: 'Niger'},
  { title: 'Nigeria'},
  { title: 'Rwanda'},
  { title: 'São Tomé and Príncipe'},
  { title: 'Senegal'},
  { title: 'Sierra Leone'},
  { title: 'Togo'},
  { title: 'Western Sahara'},
]


  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentId ? 'Update Post' : 'New Post'}
            </Typography>
            
            <Grid item style={{marginRight: '30px'}}>
             {user?.result?.role === 'admin' && 
             <FormControlLabel
             control={
               <Switch
                 checked={postData.isApproved ? true : false}
                 onChange={handleApproved}
                 value={postData.isApproved}
                 color="secondary"
                 size="medium"
               />
             }
             label={postData.isApproved ? 'Approved' : 'Pending Approval'}
           />
}
            </Grid>
            <Button autoFocus variant="contained" color="secondary" onClick={handleSubmit}>
            {currentId ? 'Save' : 'Submit'}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={styles.formContainer}>
        <form >
            <div className={styles.postTypes}>
              <h2 style={{paddingRight: '10px', marginTop: '-8px'}}>Select Type:</h2>
              {user?.result?.role === 'admin' && (
                <>
                  <PostType postType="Publication" value="publication" checked={postData.postType === "publication" ? true : false } handleChange={handleChange} />
                  <PostType postType="WebPage" value="webpage" checked={postData.postType === "webpage" ? true : false } handleChange={handleChange} />
                </>
              )}
              <PostType postType="News"value="news" checked={postData.postType === "news" ? true : false } handleChange={handleChange} />
              <PostType postType="Manuscript" value="manuscript" checked={postData.postType === "manuscript" ? true : false } handleChange={handleChange} />
            </div>
            <Grid container spacing={2}>
              <Input name="title" label="Title" handleChange={handleChange} type="text" required={true} value={postData.title} />

              {((postData.postType === 'publication') || (postData.postType === 'shortnote')) &&
              <>
                <Authors profiles={profiles} postData={postData} setPostData={setPostData} />
                {/* <Input name="authors" label="Authors" value={postData.authors} handleChange={handleChange} type="text" required={false} half /> */}
                <Input name="volume" label="Issue No. eg: MALIMBUS 42(2) September 2020" value={postData.volume} handleChange={handleChange} type="text" required={false} half />
                <Input name="page" label="Page Number e.g: 9-10" value={postData.page} handleChange={handleChange} type="text" required={false} half />
                <Input name="year" label="Year" value={postData.year} handleChange={handleChange} type="number" required={false} half />
                
                <Grid item xs={12} sm={6}>
              <Autocomplete
                id="combo-box-demo"
                options={regions}
                PaperComponent={CustomPaper}
                getOptionLabel={(option) => option.title || ''}
                style={{ width: '96%', marginLeft: '10px'}}
                renderInput={(params) => <TextField {...params} label="Select Region" variant="outlined" />}
                value={region}
                onChange={(event, value) => setRegion(value)}
              />
            </Grid>
              </>
              }


            {(postData.postType === 'news' || postData.postType === 'manuscript' || postData.postType === 'publication' || postData.postType === 'shortnote'  || postData.postType === 'others') && 
              <>
                {/* <Uploader setPostData={setPostData} postData={postData} /> */}
                <div style={{width: '100%', margin: '10px 0px'}}>
                  <ImageKit setPostData={setPostData} postData={postData} setIsPdf={setIsPdf} />
                </div>
               
                {isPdf &&
                    <a className={styles.viewPdf} href={postData.fileUrl} download >View PDF <i className="far fa-file-pdf"></i></a>
                    }

                  {!isPdf &&
                    <img style={{width: '100px', margin: '10px'} }src={postData.fileUrl} alt="cover" />
                    }
            
              </>
              }

              {postData.postType !== null && 
              <>
                {/* <Uploader setPostData={setPostData} postData={postData} /> */}
                <Editor setPostData={setPostData} postData={postData} />
              </>
              }

              <Divider />
            </Grid>
        </form>
    </div>


      </Dialog>
    </div>
  );
}