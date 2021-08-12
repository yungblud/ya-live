import React, { FC } from 'react';
import { List } from 'antd';
import { QuizParticipant } from '@/models/quiz/interface/I_quiz_participant';

interface Props {
  participants: QuizParticipant[];
}

const ParticipantList: FC<Props> = ({ participants }) => (
  <List
    itemLayout="horizontal"
    size="large"
    pagination={{
      pageSize: 5,
    }}
    dataSource={participants}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta title={item.displayName} description={item.gameScore} />
      </List.Item>
    )}
  />
);

export default ParticipantList;
