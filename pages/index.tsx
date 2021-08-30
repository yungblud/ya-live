import { NextPage } from 'next';
import React from 'react';
import { Typography, Button } from 'antd';
import { useAuth } from '@/components/auth/hooks/auth_hooks';
import CenterContainer from '@/components/common/CenterContainer';

const IndexPage: NextPage = () => {
  const { haveUser } = useAuth();
  return (
    <CenterContainer>
      <Typography>
        <Typography.Title style={{ textAlign: 'center' }}>Welcome To Cochl Live</Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', fontSize: 19 }}>
          Are you ready to join the live quiz?
        </Typography.Paragraph>
      </Typography>
      {haveUser ? (
        <Button type="primary" href="/quiz/minseo/join">
          Let's Join!
        </Button>
      ) : (
        <Button type="primary" href="/signin?redirect=/quiz/minseo/join">
          Login via google!
        </Button>
      )}
    </CenterContainer>
  );
};

export default IndexPage;
