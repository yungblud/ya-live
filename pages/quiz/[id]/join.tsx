import CenterContainer from '@/components/common/CenterContainer';
import { Button, Typography } from 'antd';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useAuth } from '../../../components/auth/hooks/auth_hooks';
import { useStoreDoc } from '../../../components/auth/hooks/firestore_hooks';
import getStringValueFromQuery from '../../../controllers/etc/get_value_from_query';
import { EN_QUIZ_STATUS } from '../../../models/quiz/interface/EN_QUIZ_STATUS';
import { QuizOperation } from '../../../models/quiz/interface/I_quiz_operation';
import * as participantClient from '../../../models/quiz/participants.client.service';

interface Props {
  query: ParsedUrlQuery;
  id: string;
}

const initData: QuizOperation = {
  status: EN_QUIZ_STATUS.INIT,
  title: '데이터 수신 중',
  total_participants: 0,
  alive_participants: 0,
};

/** 참가확인용 */
const QuizJoin: NextPage<Props> = ({ id }) => {
  const { docValue: info } = useStoreDoc({ collectionPath: 'quiz', docPath: id });
  const { initializing, haveUser, user } = useAuth();
  // const { docValue: participant } = useStoreDoc({
  //   collectionPath: 'quiz/participants',
  //   docPath: id,
  // });

  const operationInfo: QuizOperation = (() => {
    if (info === undefined) {
      return initData;
    }
    const dataFromFireStore = info.data();
    if (dataFromFireStore) {
      return dataFromFireStore as QuizOperation;
    }
    return initData;
  })();

  // 사용자 정보 초기화 중인지 확인
  if (initializing) {
    return (
      <CenterContainer>
        <Typography.Paragraph style={{ fontSize: 18 }}>loading...</Typography.Paragraph>
      </CenterContainer>
    );
  }

  // 사용자가 가입된 상태인지 확인한다.
  if (haveUser === false) {
    return (
      <CenterContainer>
        <p>참가하려면 로그인해야합니다</p>
        <Button href={`/signin?redirect=/quiz/${id}/join`}>로그인 페이지로 이동</Button>
      </CenterContainer>
    );
  }

  if (operationInfo.status === EN_QUIZ_STATUS.INIT) {
    return (
      <CenterContainer>
        <Typography.Paragraph style={{ fontSize: 18 }}>
          Checking user information...
        </Typography.Paragraph>
      </CenterContainer>
    );
  }

  if (operationInfo.status === EN_QUIZ_STATUS.PREPARE && haveUser && user && user.email) {
    // 이메일 확인 로직 추가
    if (operationInfo.possibleEmailAddress) {
      const emailDomain = user.email.split('@');
      if (emailDomain[1] !== operationInfo.possibleEmailAddress) {
        return (
          <CenterContainer>
            <h3>죄송합니다</h3>
            <p>{`@${operationInfo.possibleEmailAddress}`} 이메일이 아니면 참가할 수 없습니다.</p>
            <p>로그아웃 후 {`@${operationInfo.possibleEmailAddress}`} 이메일로 로그인해주세요.</p>
            <Button href={`/signin?redirect=/quiz/${id}/join`}>로그아웃 페이지로 이동</Button>
          </CenterContainer>
        );
      }
    }
    return (
      <CenterContainer>
        <Typography.Paragraph style={{ fontSize: 19 }}>
          It's time to join a new game!
        </Typography.Paragraph>
        <Button
          onClick={async () => {
            const resp = await participantClient.joinParticipantsForClient({
              uid: user.uid,
              quiz_id: id,
              isServer: false,
              info: {
                id,
                join: DateTime.local().toISO(),
                alive: true,
                displayName: user.displayName === null ? 'empty' : user.displayName,
                gameScore: 0,
              },
            });
            if (resp.status === 200 && resp.payload) {
              window.location.href = `/quiz/${id}/client/${user.uid}`;
            } else if (resp.status === 401) {
              // eslint-disable-next-line no-alert
              alert('귀하의 이메일 계정으로는 참가할 수 없는 퀴즈입니다.');
            } else {
              // eslint-disable-next-line no-alert
              alert('준비중 상태가 아니라서 참가할 수 없습니다');
            }
          }}
        >
          Join
        </Button>
      </CenterContainer>
    );
  }

  return (
    <CenterContainer>
      <Typography>
        <Typography.Title style={{ textAlign: 'center' }}>Cochl Live</Typography.Title>
        <Typography.Paragraph style={{ fontSize: 20, textAlign: 'center' }}>
          Please wait for a new game!
        </Typography.Paragraph>
      </Typography>
    </CenterContainer>
  );
};

QuizJoin.getInitialProps = async (ctx) => {
  const id = getStringValueFromQuery({ query: ctx.query, field: 'id' });
  return {
    id: id || 'none',
    query: ctx.query,
  };
};

export default QuizJoin;
