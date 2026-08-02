import React from 'react'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share'

const ShareButtons = ({title, url}) => {

  const iconStyle = {
    padding: '3px'
  }

    return(
        <div style={{paddingTop: '20px'}}>
          <hr />
          <div style={{paddingTop: '15px', paddingBottom: '15px'}}>
            <h3>Share this</h3>
          </div>
          <FacebookShareButton url={url} style={iconStyle}>
                <FacebookIcon  size={35} round={true}/>
         </FacebookShareButton>

          <TwitterShareButton url={url} title={title} style={iconStyle} >
                <TwitterIcon  size={35} round={true} />
          </TwitterShareButton>

          <LinkedinShareButton url={url}  style={iconStyle}>
            <LinkedinIcon  size={35} round={true}/>
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={title} style={iconStyle} >
               <WhatsappIcon  size={35} round={true}/>
           </WhatsappShareButton>

           <EmailShareButton url={url} title={title} style={iconStyle} >
               <EmailIcon  size={35} round={true}/>
           </EmailShareButton>
        </div>
      )

}
export default ShareButtons