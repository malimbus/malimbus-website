import React from 'react'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'


const Authors = ({ profiles, postData, setPostData }) => {


  const  handleAuthors  =  val  => {
    setPostData({...postData, authors: val.split(",") })
    
  }

  const allUsers = profiles.map((profile) => {
    return ({label: profile.name, value: profile.email ? profile.email : profile.name})
  })


  return (
    <div style={{width: '99%', paddingLeft: '8px'}}>
       <MultiSelect 
       customValue={true}
       onChange={handleAuthors} 
       options={allUsers} 
       name="authors" 
       defaultValue={postData.authors} 
       style={{width: "100%" }} 
       placeholder="Select Authors"/>
    </div>
  )
}

export default Authors
