import React, { FC, useEffect, useState } from 'react';
import { Button, List, Popover } from 'antd';
import { QuizParticipant } from '@/models/quiz/interface/I_quiz_participant';
import * as opsService from '../../models/quiz/operation.client.service';

interface Props {
  shouldUpdate: boolean;
  quizId: string;
}

const ParticipantList: FC<Props> = ({ shouldUpdate, quizId }) => {
  const [participants, setParticipants] = useState<QuizParticipant[]>([]);
  const updateParticipantList = () => {
    opsService
      .getAllParticipantsInfo({
        quiz_id: quizId,
        info: {},
        isServer: false,
      })
      .then((allParticipantsInfo) => {
        setParticipants(allParticipantsInfo.payload ?? []);
      });
  };

  useEffect(() => {
    if (shouldUpdate) {
      updateParticipantList();
    }
  }, [shouldUpdate]);
  return (
    <List
      itemLayout="horizontal"
      size="large"
      pagination={{
        pageSize: 5,
      }}
      dataSource={participants}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.displayName}
            description={
              typeof item.gameScore !== 'number' || item.gameScore <= 0
                ? '0 point'
                : `${item.gameScore} points`
            }
          />
        </List.Item>
      )}
    />
  );
};

interface PopoverProps {
  quizId: string;
}

const ListPopOver: FC<PopoverProps> = ({ quizId }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      trigger="click"
      title="Participant List"
      visible={visible}
      onVisibleChange={(changedVisible) => {
        setVisible(changedVisible);
      }}
      content={<ParticipantList shouldUpdate={visible} quizId={quizId} />}
    >
      <Button type="primary">Show Participants</Button>
    </Popover>
  );
};

export default ListPopOver;
