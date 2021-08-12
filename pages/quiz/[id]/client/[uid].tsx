import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/hooks/auth_hooks';
import Container from '@/components/common/Container';
import ClientBody from '@/components/quiz/client/body';

import ParticipantList from '@/components/hq/ParticipantList';
import { QuizClientContext } from '../../../../context/quiz/client/QuizClientContext';
import getStringValueFromQuery from '../../../../controllers/etc/get_value_from_query';
import {
  useStoreDoc,
  useParticipantStoreDoc,
} from '../../../../components/auth/hooks/firestore_hooks';
import { QuizOperation } from '../../../../models/quiz/interface/I_quiz_operation';
import { QuizParticipant } from '../../../../models/quiz/interface/I_quiz_participant';
import { EN_QUIZ_STATUS } from '../../../../models/quiz/interface/EN_QUIZ_STATUS';
import * as opsService from '../../../../models/quiz/operation.client.service';

interface QuizClientProps {
  quizID?: string;
  userID?: string;
}

const QuizClient: NextPage<QuizClientProps> = ({ quizID = '', userID = '' }) => {
  const { user } = useAuth();
  const [allParticipants, setAllParticipants] = useState<QuizParticipant[]>([]);

  // useEffect(() => {
  //   opsService
  //     .getAllParticipantsInfo({
  //       quiz_id: quizID,
  //       info: {},
  //       isServer: false,
  //     })
  //     .then((allParticipantsInfo) => {
  //       setAllParticipants(allParticipantsInfo.payload ?? []);
  //     });
  // }, []);

  const { docValue: quizFromStore } = useStoreDoc({
    collectionPath: 'quiz',
    docPath: quizID || 'none',
  });
  const { docValue: usersFromStore } = useParticipantStoreDoc({
    uid: userID,
    collectionPath: 'quiz',
    docPath: quizID,
  });

  const quiz = (() => {
    const dataFromFireStore = quizFromStore?.data();

    return dataFromFireStore && (dataFromFireStore as QuizOperation);
  })();

  const userInfo = (() => {
    const dataFromFireStore = usersFromStore?.data();

    return dataFromFireStore && (dataFromFireStore as QuizParticipant);
  })();
  const [name] = (user?.displayName || '').split('_');

  return (
    <QuizClientContext.Provider value={{ quizID, userID, quiz, user: userInfo }}>
      <Container
        name={name}
        isFixed={quiz?.status !== EN_QUIZ_STATUS.QUIZ && quiz?.status !== EN_QUIZ_STATUS.COUNTDOWN}
      >
        <div style={{ flex: 1 }}>
          <ClientBody />
        </div>
        {/* <div>
          <ParticipantList participants={allParticipants} />
        </div> */}
      </Container>
    </QuizClientContext.Provider>
  );
};

QuizClient.getInitialProps = async ({ query }) => {
  const quizID = getStringValueFromQuery({ query, field: 'id' });
  const userID = getStringValueFromQuery({ query, field: 'uid' });

  return { quizID, userID };
};

export default QuizClient;
