import React from 'react';
import styles from './Publications.module.css'
import Card from '../Card'

const Publications = ({ publications, profiles }) => {

  //MATCH PUBLICATIONS WITH THEIR CONTENTS
  const nameEmailMap = profiles.reduce((acc, {
    name,
    email,
    userId,
    profilePicture
  }) => {
    acc[email] = {
      name,
      userId,
      profilePicture
    };
    return acc;
  }, {})
  
  const articles = publications.map(({
    title,
    content,
    doi,
    year,
    _id,
    author,
    avatar,
    authors,
    userId,
    slug,
  }) => ({
    title,
    content,
    _id,
    doi,
    year,
    author,
    avatar,
    userId,
    slug,
    authors: authors.map(entry => (nameEmailMap[entry] ? { ...nameEmailMap[entry]
    } : {
      name: entry
    }))
  }));
  
  console.log(articles);
    // if(!pageNumber) return null

      // if(isLoading) {
      //     return <Container style={{marginLeft: '40%', padding: '100px'}} >
      //         <CircularProgress size="7em"/>
      //     </Container>
      // }

  return (
    <div className={styles.pageLayout}>

    <div>
    <div className={styles.cardContainer}>
              {articles.map((pub) => (
                <Card key={pub._id} pub={pub} />
              ))
              }
            </div>
    </div>


    </div>
  );
}

export default Publications