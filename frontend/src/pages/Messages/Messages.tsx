import React, { FC } from 'react';
import CommonLayout from '../../components/ui/layout/CommonLayout';
import MessagesList from '../../components/ui/dashboard/messages/MessagesList';

interface MessagesProps {
  children?: React.ReactNode;
}

const Messages: FC<MessagesProps> = ({}) => {
  return (
    <CommonLayout>
      <MessagesList />
    </CommonLayout>
  );
};

export default Messages;
