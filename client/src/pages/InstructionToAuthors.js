import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StaticPage from '../components/StaticPage/StaticPage'
import axios from 'axios'
import instructions from '../json/instructions.json'

const InstructionToAuthors = () => {


  const history = useHistory()
  const fullText = instructions

//  useEffect(() => {
//     async function getFullText() {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API}/posts/instruction-to-authors-on-submission-to-malimbus`);
//           console.log(response);
//           setFullText({...fullText, title: response.data.title, image: response.data.fileUrl, content: response.data.content})
//         } catch (error) {
//           console.error(error.response);
//         }
//       }
//       getFullText()
//        // eslint-disable-next-line
//  },[])

//  if(fullText.length < 0) {
//   return <div style={{padding: '100px'}}>Loading</div>
//  }

    return (
        <div>
            <StaticPage title={fullText.title} content={fullText.content} image={fullText.image} />
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button onClick={() =>  history.push('/profile')} className="submitButton___ ">Submit Now</button>
            </div>
        </div>
    )
}

export default InstructionToAuthors
