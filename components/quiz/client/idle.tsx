import React from 'react';

import styles from './idle.css';

const Idle: React.FC<{ isAlive: boolean }> = () => (
  <div
    className={styles.container}
    onTouchStart={(e) => e.preventDefault()}
    onTouchMove={(e) => e.preventDefault()}
  >
    <span className={styles.text}>
      The next quiz will be up soon!
      <span role="img" aria-label="ㅇ_ㅇ">
        👀
      </span>
    </span>
  </div>
);

export default Idle;
