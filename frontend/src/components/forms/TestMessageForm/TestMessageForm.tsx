import React, { FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './TestMessageForm.module.css';
import { validateEmail } from '../../../utils/validate';
import { useMutation } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { useToast } from '../../../hooks/useToast/useToast';
import Axios from '../../../utils/axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface TestMessageFormProps {
  children?: React.ReactNode;
  closeDialog: () => void;
}

interface userData {
  email: string;
  subject: string;
  messageBody: string;
}

type formField = 'email' | 'subject' | 'messageBody';

const TestMessageForm: FC<TestMessageFormProps> = ({ closeDialog }) => {
  const [formVals, setFormVals] = useState({
    email: '',
    subject: '',
    messageBody: '',
  });
  const userId: string | undefined = useSelector(
    (state: RootState) => state?.user?.data?.id
  );

  const [formErrors, setFormErrors] = useState({
    email: '',
    subject: '',
    messageBody: '',
  });

  const { openToast } = useToast();

  const postMessage = async (formData: userData) => {
    const res = await Axios.post(`/messages/${userId}`, formData);
    return res.data;
  };

  const { mutateAsync, isLoading } = useMutation(postMessage, {
    onError: (err: any) => {
      closeDialog();
      if (err?.response?.data?.message) {
        return openToast(err.response.data.message, 'error');
      }
      openToast(err.message, 'error');
    },
    onSuccess: () => {
      closeDialog();
      openToast('Message Sent! Please check in messages tab.', 'success');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormVals({
      ...formVals,
      [name]: value,
    });
    if (formErrors[name as formField]) {
      formErrors[name as formField] = '';
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, subject, messageBody } = formVals;

    const validateFail = !validateEmail(email) || !subject || !messageBody;

    if (!email) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'Email Address required!',
      }));
    }

    if (!subject) {
      setFormErrors((prev) => ({
        ...prev,
        subject: 'Subject required!',
      }));
    }

    if (!messageBody) {
      setFormErrors((prev) => ({
        ...prev,
        messageBody: 'Message required!',
      }));
    }

    if (!validateEmail(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'Invalid Email Address',
      }));
    }

    if (validateFail) return;

    try {
      await mutateAsync({ email, subject, messageBody });
    } catch (error) {
      // React Query will handle the error, and the `onError` callback will be called
      // if there was an Axios error
      // console.error('Mutation error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.testMessageForm}>
      <h2>Send Test Message</h2>
      <TextField
        onChange={handleChange}
        label="Email Address"
        variant="standard"
        name="email"
        helperText={formErrors.email}
        error={!!formErrors.email}
      />
      <TextField
        onChange={handleChange}
        label="Subject"
        variant="standard"
        name="subject"
        helperText={formErrors.subject}
        error={!!formErrors.subject}
      />
      <TextField
        onChange={handleChange}
        label="Message"
        name="messageBody"
        multiline
        rows={4}
        helperText={formErrors.messageBody}
        error={!!formErrors.messageBody}
        variant="standard"
      />
      <Button
        type="submit"
        sx={{
          mt: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        variant="outlined"
      >
        Send
        {isLoading && (
          <CircularProgress
            sx={{
              ml: '0.5rem',
            }}
            color="primary"
            size={14}
          />
        )}
      </Button>
    </form>
  );
};

export default TestMessageForm;
