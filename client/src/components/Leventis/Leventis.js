import React from 'react';
import styles from './Leventis.module.css';

const Leventis = () => {
  return (
    <div className={styles.content}>
      <div className={styles.img}>
        <img
          src={`${process.env.PUBLIC_URL}/waos-logo.jpg`}
          alt="West African Ornithological Society logo"
        />
      </div>
    </div>
  );
};

export default Leventis;