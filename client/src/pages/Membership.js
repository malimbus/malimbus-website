import React, { useState, useEffect } from 'react'
import StaticPage from '../components/StaticPage/StaticPage'
import axios from 'axios'

const Membership = () => {

    const fullText = {
        authors: [ ],
        createdAt: "2021-10-14T11:59:12.184Z",
        _id: "61681b90b92bf4484cae6f82",
        postType: "others",
        author: "Panshak Solomon",
        userId: "6127a25b9fb01741ac466f49",
        fileUrl: "",
        title: "Membership",
        content: '<p>To join, there are four&nbsp;options:</p><ul><li><a href="http://malimbus.org/en/meonline.html" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>Online</strong></a>&nbsp;using a credit or debit card,&nbsp;</li><li>by post (mail) with the&nbsp;<a href="http://malimbus.org/Subscription%20Form.pdf" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>subscription form</strong></a>,</li><li>by e-mail,&nbsp;contact the&nbsp;<a href="mailto:tim@timdodman.co.uk" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>Membership Secretary</strong></a>,</li><li>by&nbsp;<a href="http://www.malimbus.org/WAOS-Standing-Orders.pdf" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>Standing Order</strong></a>&nbsp;to our GBP or Euro bank accounts,</li><li>Members in Nigeria can pay in naira and submit the<strong>&nbsp;</strong><a href="http://www.malimbus.org/Nigeria-Subscription-form.pdf" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>Nigerian Membership form</strong></a></li></ul><p>WAOS subscription rates are&nbsp;£15&nbsp;(22€)&nbsp;for&nbsp;Ordinary Members, £30 (44€)&nbsp;for&nbsp;Supporting Members&nbsp;and&nbsp;£35&nbsp;(44€)&nbsp;for Institutional Members.</p><p><em>Subscription rates for those resident in&nbsp;</em><strong><em>Nigeria&nbsp;</em></strong><em>are</em>: 5,000 NGN for Ordinary Members, 12,000 NGN for&nbsp;Supporting Members&nbsp;and 15,000 NGN for and Institutional Members.</p><p>For any membership questions, please contact the&nbsp;<a href="mailto:tim@timdodman.co.uk" rel="noopener noreferrer" target="_blank" style="color: rgb(255, 0, 0);"><strong>Membership Secretary</strong></a></p><p><br></p><p><a href="http://malimbus.org/en/publicat.html" rel="noopener noreferrer" target="_blank" style="color: rgb(86, 35, 81);"><em>Malimbus</em></a>, a bilingual, biannual publication, is mailed to all members. Your subscription also serves to support occasional&nbsp;<a href="http://malimbus.org/en/research.html" rel="noopener noreferrer" target="_blank" style="color: rgb(86, 35, 81);">grants for research</a>&nbsp;on West African ornithology, most of them going to W. African students.&nbsp;</p>',
        year: "",
        page: "",
        volume: "",
        region: "",
        isPrivate: false,
        isApproved: true,
        email: "ipanshak@gmail.com",
        avatar: "https://res.cloudinary.com/wabis/image/upload/v1630920869/malimbus/mxl9kkah2uwwup6xev5v.jpg",
        slug: "membership",
        __v: 0
    }

//  useEffect(() => {
//     async function getFullText() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API}/posts/membership`);
//           console.log(response);
//           setFullText({...fullText, title: response.data.title, image: response.data.fileUrl, content: response.data.content})
//         } catch (error) {
//           console.error(error.response);
//         }
//       }
//       getFullText()
//        // eslint-disable-next-line
//  },[])


    return (
        <div>
            <StaticPage title={fullText.title} content={fullText.content} image={fullText.image} />
        </div>
    )
}

export default Membership
