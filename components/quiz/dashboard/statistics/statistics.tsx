import React, { useContext, useRef, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { QuizContext } from '@/context/quiz/dashboard/QuizContext';
import FirebaseAuthClient from '@/models/commons/firebase_auth_client.model';
import { QuizParticipant } from '@/models/quiz/interface/I_quiz_participant';
import styles from './statistics.css';

interface StatisticsProps {
  active: boolean;
}

const SURVIVOR_THRESHOLD = 5;

const Statistics: React.FC<StatisticsProps> = ({ active }) => {
  const { id, quiz } = useContext(QuizContext);
  const [survivors, setSurvivors] = useState<QuizParticipant[]>([]);
  const [survivorCount, setSurvivorCount] = useState(quiz.alive_participants);
  const [deathCount, setDeathCount] = useState(0);

  const prevSurvivorCount = useRef(quiz.total_participants);

  const { value } = useSpring({
    config: {
      tension: 75,
      friction: 40,
      clamp: true,
    },
    value: survivorCount ?? 0,
  });

  const containerStyle = useSpring({
    opacity: active ? 1 : 0,
  });

  useEffect(() => {
    if (!active || prevSurvivorCount.current === quiz.alive_participants) {
      return;
    }

    const difference = prevSurvivorCount.current - quiz.alive_participants;
    setSurvivorCount(quiz.alive_participants);
    setDeathCount(difference);
    prevSurvivorCount.current = quiz.alive_participants;
  }, [active, quiz.alive_participants]);

  useEffect(() => {
    if (quiz.alive_participants > SURVIVOR_THRESHOLD) {
      return;
    }

    (async () => {
      const survivorsSS = await FirebaseAuthClient.getInstance()
        .FireStore.collection(`quiz/${id}/participants`)
        .where('alive', '==', true)
        .get();

      setSurvivors(survivorsSS.docs.map((doc) => doc.data() as QuizParticipant));
    })();
  }, [id, quiz.alive_participants]);

  const heading = (() => 'Top 3 Rankers')();
  // if (quiz.alive_participants > SURVIVOR_THRESHOLD) {
  //   return '생존자';
  // }
  // if (quiz.alive_participants > 1) {
  //   return `최후의 ${quiz.alive_participants}인!`;
  // }
  // return '🔔 최후의 1인 🔔';

  const survivorEl = (() => {
    const sortedSurvivors = survivors.sort((a, b) => {
      if (a.gameScore > b.gameScore) {
        return -1;
      }
      if (a.gameScore < b.gameScore) {
        return 1;
      }
      return 0;
    });

    return (
      <div className={styles.survivorNames}>
        {sortedSurvivors.slice(0, 3).map((survivor, index) => (
          <p key={survivor.id || index}>
            {survivor.displayName.split('_')[0]}: {survivor.gameScore} point
          </p>
        ))}
      </div>
    );
    // if (quiz.alive_participants > SURVIVOR_THRESHOLD) {
    //   return (
    //     <>
    //       <animated.p className={styles.survivorCount}>
    //         {value.interpolate((x) => Math.round(x as any))}
    //       </animated.p>
    //       <p className={deathCount > 0 ? styles.deathCount : styles.revivalCount}>
    //         {deathCount > 0 ? '-' : '+'}
    //         {Math.abs(deathCount)}
    //       </p>
    //     </>
    //   );
    // }
    // if (quiz.alive_participants > 1) {
    //   return (
    //     <div className={styles.survivorNames}>
    //       {survivors.slice(0, quiz.alive_participants).map((survivor, index) => (
    //         <p key={survivor.id || index}>{survivor.displayName.split('_')[0]}</p>
    //       ))}
    //     </div>
    //   );
    // }
    // return <p className={styles.lastSurvivor}>{survivors[0]?.displayName.split('_')[0]}</p>;
  })();

  return (
    <animated.section className={styles.container} style={containerStyle}>
      <div>
        <h1 className={styles.heading}>{heading}</h1>
        <div className={styles.counts}>{survivorEl}</div>
      </div>
    </animated.section>
  );
};

export default Statistics;
