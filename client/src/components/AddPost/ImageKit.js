import { useState, useEffect } from "react";
import { Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { IKContext, IKUpload } from 'imagekitio-react';

const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = process.env.REACT_APP_IMAGEKIT_AUTHENTICATED_ENDPOINT;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#008d3f;',
  },
}))(LinearProgress);



export default function Uploader({ setPostData, postData, setIsPdf }) {
  const [file, setFile] = useState(postData.fileUrl);
  const [progress, setProgress] = useState(0)

    useEffect(() => {
        setPostData({...postData, fileUrl: file})
        // eslint-disable-next-line
    },[file])


    const onError = err => {
      console.log("Error", err);
    };
    
    const onSuccess = res => {
      console.log("Success", res);
      setFile(res.url)
      if(res.fileType === "non-image") {
        setIsPdf(true)
      }
      setProgress(100)
    };



  const checkType =(type)=> {
    switch(type) {
      case "publication":
      return "Click here to upload PDF"

        case "news": 
        return "Click here to upload cover picture"

        case "manuscript":
          return "Click here to upload PDF"

        case "shortnote":
          return "Click here to upload PDF"

        case "others":
        return "Click here to upload cover picture"

        default:
            return null

    }
}


  return (
    <>
<div className="App">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <label class="custom-file-upload">
        <IKUpload
          fileName={postData.title.split(' ').splice(0, 5).join(' ')}
          onError={onError}
          onSuccess={onSuccess}
        />
         <i className="fas fa-cloud-upload-alt"></i> {checkType(postData.postType)}
        </label>
      </IKContext>
    </div>
  
        <Grid item style={{width: '100%'}}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
      </>
  );
}

