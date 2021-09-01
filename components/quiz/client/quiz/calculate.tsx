import React from 'react';

import styles from './calculate.css';

const Calculate: React.FC = () => (
  <div className={styles.container}>
    <p className={styles.textBox}>
      <span className={styles.text}>~ processing ~</span>
    </p>
  </div>
);

export default Calculate;
