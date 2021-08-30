import React from 'react';
import ParticipantList from '@/components/hq/ParticipantList';
import styles from './finish.css';

const Finish: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.yalive}>cochl live</div>
    Thanks a lot!
    <span role="img" aria-label="">
      💫
    </span>
    <br />
    <ParticipantList
      quizId="minseo"
      buttonTitle="Who's the best player?"
      listTitle="Best player list"
    />
  </div>
);

export default Finish;
