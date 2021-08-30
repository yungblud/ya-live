import { Button } from 'antd';
import React, { useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useAuth } from '@/components/auth/hooks/auth_hooks';

import { QuizClientContext } from '../../../context/quiz/client/QuizClientContext';
import FirebaseAuthClient from '../../../models/commons/firebase_auth_client.model';
import * as participantClient from '../../../models/quiz/participants.client.service';
import styles from './body.css';

const Prepare: React.FC = () => {
  const { initializing, user } = useAuth();
  const ctx = useContext(QuizClientContext);
  const email = user?.email || '';

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !initializing &&
      (async () => {
        if (!user) {
          // eslint-disable-next-line no-alert
          alert('잘못된 접근입니다. 다시 로그인해주세요.');
          onClickSignOut();

          return;
        }

        const resp = await participantClient.joinParticipantsForClient({
          uid: user?.uid || '',
          quiz_id: ctx.quizID,
          isServer: false,
          info: {
            id: ctx.quizID,
            join: DateTime.local().toISO(),
            alive: true,
            displayName: user?.displayName || 'empty',
            gameScore: 0,
          },
        });

        if (
          resp.status === 401 ||
          (ctx.quiz?.possibleEmailAddress &&
            ctx.quiz?.possibleEmailAddress !== user?.email?.split('@')[1])
        ) {
          // eslint-disable-next-line no-alert
          alert('귀하의 이메일 계정으로는 참가할 수 없는 퀴즈입니다.');
          onClickSignOut();
        }
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function onClickSignOut() {
    await FirebaseAuthClient.getInstance().Auth.signOut();
    window.location.href = `/quiz/${ctx.quizID}`;
  }

  const prepareEle = (
    <>
      <div className={styles.descBox}>
        <span className={styles.desc}>Quiz will be started soon!!</span>
      </div>
      <b>{email}</b>
      <div className={styles.logoutBox}>
        If you want to switch your account
        <br />
        Click
        <Button className={styles.logoutBtn} ghost onClick={onClickSignOut}>
          Here
        </Button>
      </div>
    </>
  );

  return <section className={styles.container}>{prepareEle}</section>;
};

export default Prepare;
