import React from 'react';
import clsx from 'clsx';
import ParticipantList from '@/components/hq/ParticipantList';
import styles from './Container.css';

const Container: React.FC<{
  name?: string;
  isFixed?: boolean;
  showParticipants?: boolean;
  quizId?: string;
}> = ({ name, isFixed, children, showParticipants, quizId }) => (
  <div className={clsx(styles.container, isFixed && styles.fixedContainer)}>
    <div className={styles.heading}>
      <p className={styles.logo}>cochl live</p>
      {name && <p className={styles.name}>{name}</p>}
      {showParticipants && quizId && (
        <div style={{ marginLeft: 50 }}>
          <ParticipantList quizId={quizId} />
        </div>
      )}
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Container;
