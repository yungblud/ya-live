import { NextPage } from 'next';
import React from 'react';
import { Typography, Button } from 'antd';
import { useAuth } from '@/components/auth/hooks/auth_hooks';

const IndexPage: NextPage = () => {
  const { haveUser } = useAuth();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh)',
      }}
    >
      <Typography>
        <Typography.Title style={{ textAlign: 'center' }}>Welcome To Cochl Live</Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', fontSize: 19 }}>
          Are you ready to join the live quiz?
        </Typography.Paragraph>
      </Typography>
      {haveUser ? (
        <Button type="primary" href="/quiz/dongho/join">
          Let's Join!
        </Button>
      ) : (
        <Button type="primary" href="/signin?redirect=/quiz/dongho/join">
          Login via google!
        </Button>
      )}
    </div>
  );
};

export default IndexPage;
