import React, { useState, useEffect } from 'react'
import StaticPage from '../components/StaticPage/StaticPage'
import axios from 'axios'
import about from '../json/about.json'

const FullText = () => {

   const fullText = about

//  useEffect(() => {
//     async function getFullText() {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API}/posts/history-of-the-society-and-it-s-publications`);
//           console.log(response);
//           setFullText({...fullText, title: response.data.title, image: response.data.fileUrl, content: response.data.content})
//         } catch (error) {
//           console.error(error.response);
//         }
//       }
//       getFullText()
//         // eslint-disable-next-line 
//  },[])


    return (
        <div>
            <StaticPage title={fullText.title} content={fullText.content} image={fullText.image} />
        </div>
    )
}

export default FullText
