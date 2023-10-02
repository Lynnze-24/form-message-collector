import React, { FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './SignUpForm.module.css';
import { validateEmail } from '../../../utils/validate';
import { useMutation } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { useToast } from '../../../hooks/useToast/useToast';
import Axios from '../../../utils/axios';

interface SignupFormProps {
  children?: React.ReactNode;
  resetLayout: () => void;
}

interface userData {
  email: string;
  password: string;
}

const SignupForm: FC<SignupFormProps> = ({ resetLayout }) => {
  const [formVals, setFormVals] = useState({
    email: '',
    password: '',
    confirmPw: '',
  });

  type formField = 'email' | 'password' | 'confirmPw';

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPw: '',
  });

  const { openToast } = useToast();

  const registerUser = async (formData: userData) => {
    const res = await Axios.post('/users', formData);
    return res.data;
  };

  const { mutateAsync, isLoading } = useMutation(registerUser, {
    onError: (err: any) => {
      if (err?.response?.data?.message) {
        return openToast(err.response.data.message, 'error');
      }
      openToast(err.message, 'error');
    },
    onSuccess: () => {
      resetLayout();
      openToast('User Created! Please check your email to verify.', 'success');
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

    const { email, password, confirmPw } = formVals;

    const validateFail = !validateEmail(email) || password !== confirmPw;
    if (!validateEmail(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: 'Invalid Email Address',
      }));
    }

    if (password !== confirmPw) {
      setFormErrors((prev) => ({
        ...prev,
        password: 'Passwords do not match',
        confirmPw: 'Passwords do not match',
      }));
    }

    if (validateFail) return;

    try {
      await mutateAsync({ email, password });
    } catch (error) {
      // React Query will handle the error, and the `onError` callback will be called
      // if there was an Axios error
      // console.error('Mutation error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.signupForm}>
      <h2>Register now!</h2>
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
        label="Password"
        variant="standard"
        name="password"
        helperText={formErrors.password}
        error={!!formErrors.password}
      />
      <TextField
        onChange={handleChange}
        label="Confirm Password"
        variant="standard"
        name="confirmPw"
        helperText={formErrors.confirmPw}
        error={!!formErrors.confirmPw}
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
        Sign up
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

export default SignupForm;
