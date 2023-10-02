import { CircularProgress, Button, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './ForgetForm.module.css';
import { validateEmail } from '../../../utils/validate';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../../hooks/useToast/useToast';
import Axios from '../../../utils/axios';

// import pallette from '../../../assets/palette';

interface ForgetFormProps {
  children?: React.ReactNode;
  resetLayout: () => void;
}

const ForgetForm: FC<ForgetFormProps> = ({ resetLayout }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const forgetUser = async (email: string) => {
    const res = await Axios.post('/users/forgetPassword', { email });
    return res.data;
  };

  const { openToast } = useToast();

  const { mutateAsync, isLoading } = useMutation(forgetUser, {
    onError: (err: any) => {
      if (err?.response?.data?.message) {
        return openToast(err.response.data.message, 'error');
      }
      openToast(err.message, 'error');
    },
    onSuccess: () => {
      resetLayout();
      openToast('Reset email was sent! Please check your email.', 'success');
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setError('Invalid Email Address');
    }

    try {
      await mutateAsync(email);
    } catch (error) {
      // React Query will handle the error, and the `onError` callback will be called
      // if there was an Axios error
      // console.error('Mutation error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.forgetForm}>
      <h2>Enter your email address!</h2>
      <TextField
        className={styles.forgetInput}
        label="Email Address"
        variant="standard"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError('');
        }}
        helperText={error}
        error={!!error}
      />

      <Button
        sx={{
          mt: '1.5rem',
          // borderColor: pallette.primaryL,
          // color: pallette.primary,
          // '&:hover': {
          //   borderColor: pallette.primary,
          // },
        }}
        variant="outlined"
        type="submit"
      >
        Reset Password
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

export default ForgetForm;
