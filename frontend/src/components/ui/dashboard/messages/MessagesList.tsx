import React, { FC, useState } from 'react';
import styles from './Messages.module.css';
import MessageItem from './MessageItem';
import usePrivateQuery from '../../../../hooks/usePrivateQuery/usePrivateQuery';
import { AxiosInstance, AxiosResponse } from 'axios';
import { CircularProgress } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Dialog from '../../common/Dialog/Dialog';
import Pagination from '../../common/Pagination/Pagination';

export interface Message {
  user: string;
  email: string;
  subject: string;
  messageBody: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// const messageArr: message[] = [
//   {
//     id: 1,
//     text: 'Hello from the other side.',
//     time: '2023-09-04T11:49:54.031Z',
//     email: 'htet@gmail.com',
//   },
//   {
//     id: 2,
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum in quasi sapiente blanditiis placeat quas cum mollitia id? Nihil eos, dolorem totam dicta perspiciatis necessitatibus in quibusdam! Aperiam, veniam?',
//     time: '2023-09-02T11:49:54.031Z',
//     email: 'aung@gmail.com',
//   },
//   {
//     id: 3,
//     text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus enim quidem aspernatur voluptate officiis quod similique accusantium voluptates ab explicabo dicta, aperiam a tenetur, rerum provident necessitatibus saepe! Praesentium, ipsa!',
//     time: '2023-09-01T11:49:54.031Z',
//     email: 'aunghtet@gmail.com',
//   },
//   {
//     id: 4,
//     text: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
//     time: '2023-08-30T11:49:54.031Z',
//     email: 'htetaung@gmail.com',
//   },
// ];

interface MessagesListProps {
  children?: React.ReactNode;
}

const MessagesList: FC<MessagesListProps> = ({}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [popUpMsgId, setPopUpMsgId] = useState<null | string>(null);

  const fetchMessages = async (
    Axios: AxiosInstance
  ): Promise<AxiosResponse> => {
    return Axios.get('/messages');
  };

  const dialogOpen = (id: string) => {
    setPopUpMsgId(id);
    setIsDialogOpen(true);
  };

  const {
    isLoading,
    error,
    data: messageArr,
  } = usePrivateQuery(['messages'], fetchMessages);

  const itemsLimit = 2;

  const totalPages = Math.ceil((messageArr?.length || 1) / itemsLimit);
  const startIndex = (page - 1) * itemsLimit;
  const currentPageMessages = (messageArr || []).slice(
    startIndex,
    startIndex + itemsLimit
  );

  const popUpMsg: Message | undefined = (messageArr || []).find(
    (x: Message) => x._id === popUpMsgId
  );

  const closeHandler = () => {
    setIsDialogOpen(false);
    setPopUpMsgId(null);
  };

  return (
    <div className={styles.messagesCon}>
      <h1 className={styles.mesHead}>
        Contacts You Have Received From Your Online Form
      </h1>
      {isLoading ? (
        <div className={styles.statusCon}>
          <p className={styles.loading}>
            Loading{' '}
            <CircularProgress
              sx={{
                ml: '0.5rem',
              }}
              size={20}
              color="inherit"
            />
          </p>
        </div>
      ) : error ? (
        <div className={styles.statusCon}>
          <p>{(error as Error)?.message || 'Something went wrong!'}</p>
        </div>
      ) : messageArr.length === 0 ? (
        <div className={styles.statusCon}>
          <p>{'There is no message yet!'}</p>
        </div>
      ) : (
        <div className={styles.messagesListCon}>
          <AnimatePresence>
            {currentPageMessages.map((item: Message, index: number) => (
              <MessageItem
                index={index}
                dialogOpen={() => dialogOpen(item._id)}
                key={item._id}
                {...item}
              />
            ))}
          </AnimatePresence>
          {totalPages > 1 && (
            <Pagination value={page} onChange={setPage} total={totalPages} />
          )}
        </div>
      )}
      <Dialog onClose={closeHandler} isOpen={isDialogOpen}>
        {popUpMsg && (
          <div className={styles.popupMsg}>
            <MessageItem
              onDelete={closeHandler}
              isDialogMsg={true}
              dialogOpen={() => dialogOpen(popUpMsg._id)}
              key={popUpMsg._id}
              {...popUpMsg}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default MessagesList;
