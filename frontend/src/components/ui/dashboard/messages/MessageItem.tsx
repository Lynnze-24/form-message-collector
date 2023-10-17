import React, { FC } from 'react';
import styles from './Messages.module.css';
import { getDateTime } from '../../../../utils/formats.tsx';
import { Message } from './MessagesList.tsx';
import { motion } from 'framer-motion';
import { AxiosInstance, AxiosResponse } from 'axios';
import usePrivateMutation from '../../../../hooks/usePrivateMutation/usePrivateMutation.tsx';
import { useQueryClient } from '@tanstack/react-query';
import BaseButton from '../../common/BaseButton/BaseButton.tsx';

interface MessageItemProps extends Message {
  children?: React.ReactNode;
  index?: number;
  dialogOpen?: () => void;
  isDialogMsg?: boolean;
  onDelete?: () => void;
}

const MessageItem: FC<MessageItemProps> = ({
  messageBody,
  email,
  createdAt,
  _id,
  dialogOpen,
  index = 0,
  subject,
  isDialogMsg = false,
  onDelete,
}) => {
  const formattedTime = getDateTime(createdAt);
  const queryClient = useQueryClient();

  const deleteMessage = async (
    Axios: AxiosInstance,
    delteId: string
  ): Promise<AxiosResponse> => {
    return Axios.delete(`/messages/${delteId}`);
  };

  const onMutate = (deleteId: string) => {
    // Optimistically update the cache by removing the deleted item
    queryClient.setQueryData(
      ['messages'],
      (prevData: Message[] | undefined) => {
        if (prevData) {
          if (onDelete) onDelete();
          return prevData.filter((item: Message) => item._id !== deleteId);
        }
      }
    );
  };

  const { mutateAsync } = usePrivateMutation({
    mutationKey: ['messages', _id],
    mutationResFn: deleteMessage,
    onMutate: onMutate,
    successMsg: 'Deleted message successfully!',
  });

  return (
    <motion.div
      initial={{ translateX: -10, opacity: 0, skewX: '10deg' }}
      animate={{
        translateX: 0,
        opacity: 1,
        skewX: '0deg',
      }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      // exit={{ translateX: 10, opacity: 0, skewX: '10deg' }}
      className={styles.allCon}
    >
      <div className={styles.topCon}>
        <h2>{subject}</h2>

        <p>{formattedTime}</p>
      </div>
      <p>
        From <b>{email}</b>
      </p>
      <q className={isDialogMsg ? styles.dialogDes : styles.des}>
        {messageBody}
      </q>
      <div className={styles.btnCon}>
        <BaseButton
          iconName="check"
          onClick={() => window.open(`mailto:${email}`)}
          status="purple"
        >
          Reply
        </BaseButton>
        {!isDialogMsg && (
          <BaseButton iconName="visibility" onClick={dialogOpen} status="info">
            Details
          </BaseButton>
        )}
        <BaseButton
          iconName="delete"
          onClick={() => mutateAsync(_id)}
          status="error"
        >
          Delete
        </BaseButton>
      </div>
    </motion.div>
  );
};

export default MessageItem;
