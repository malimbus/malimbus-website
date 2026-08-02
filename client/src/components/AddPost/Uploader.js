import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from '../AddPost/Uploader.module.css'
import { Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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



export default function Uploader({ setPostData, postData }) {
  const [file, setFile] = useState(postData.fileUrl);
  const [progress, setProgress] = useState(0)

    useEffect(() => {
        setPostData({...postData, fileUrl: file})
        // eslint-disable-next-line
    },[file])

  const onDrop = useCallback((acceptedFiles) => {
    // const url = "https://api.cloudinary.com/v1_1/wabis/image/upload/";
    const url = "https://api.cloudinary.com/v1_1/malimbus/image/upload";

    acceptedFiles.forEach(async (acceptedFile) => {
    //   const { signature, timestamp } = await getSignature();

      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        "malimbus"
      );
      
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      setProgress(100)
      const data = await response.json();
      
      setFile(data.secure_url)
      console.log(data)
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*,application/pdf",
    multiple: false,
  });


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
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
        >
          <input {...getInputProps()} />
        {checkType(postData.postType)}
        </div>
        <Grid item style={{width: '100%'}}>
          {/* <p>Uploading...</p> */}
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
      </>
  );
}

