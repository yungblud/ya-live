import React, { FC } from 'react';

const CenterContainer: FC = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh)',
    }}
  >
    {children}
  </div>
);

export default CenterContainer;
