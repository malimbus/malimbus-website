import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.paragraph}>
        <h1>
          Welcome to the West African Ornithological Society
        </h1>

        <hr className={styles.hrLine} />

        <p>
          The West African Ornithological Society (WAOS) promotes
          scientific and conservation interest in birds across
          West and Central Africa, primarily by publishing
          observations and research in its peer-reviewed journal,
          {' '}<em>Malimbus</em>.
        </p>

        <p>
          WAOS was established in 1979, succeeding the Nigerian
          Ornithologists’ Society, founded in 1964. For more
          than 40 years, the Society has continuously published
          peer-reviewed research on the birds of West and
          Central Africa in <em>Malimbus</em>. WAOS is a membership-based organisation with individual
          members and institutional subscribers in Africa and
          globally.
        </p>

        <hr className={styles.hrLine} />
      </div>
    </div>
  );
};

export default Features;
