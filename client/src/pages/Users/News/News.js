import React from 'react';
import styles from './News.module.css'
import Card from './Card'


const News = ({ newsPosts }) => {
  
  return (
    <div className={styles.pageLayout}>
      <div>
        <div className={styles.cardContainer}>
            {newsPosts.map((pub) => (
              <Card key={pub._id} pub={pub} />
            ))
            }
        </div>
      </div>
    </div>
  );
}

export default News