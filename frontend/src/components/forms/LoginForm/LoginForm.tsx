import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './LoginForm.module.css';
import pallette from '../../../assets/palette';
import { useToast } from '../../../hooks/useToast/useToast';
import { useMutation } from '@tanstack/react-query';
import { validateEmail } from '../../../utils/validate';
import Axios from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/users/userSlice';

interface LoginFormProps {
  children?: React.ReactNode;
}

interface userData {
  email: string;
  password: string;
}

interface userResponse {
  id: string;
  email: string;
  token: string;
}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const [formVals, setFormVals] = useState({
    email: '',
    password: '',
  });

  type formField = 'email' | 'password';

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const { openToast } = useToast();

  const dispatch = useDispatch();

  const loginUser = async (formData: userData) => {
    const res = await Axios.post('/users/login', formData);
    return res.data;
  };

  const { mutateAsync, isLoading } = useMutation(loginUser, {
    onError: (err: any) => {
      if (err?.response?.data?.message) {
        return openToast(err.response.data.message, 'error');
      }
      openToast(err.message, 'error');
      // console.log(err.message);
    },
    onSuccess: (data: userResponse) => {
      dispatch(setUser(data));
      openToast('Welcome from FMC. Enjoy our service!', 'success');
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

    const { email, password } = formVals;

    if (!validateEmail(email)) {
      return setFormErrors((prev) => ({
        ...prev,
        email: 'Invalid Email Address',
      }));
    }

    try {
      await mutateAsync({ email, password });
    } catch (error) {
      // React Query will handle the error, and the `onError` callback will be called
      // if there was an Axios error
      // console.error('Mutation error:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.loginForm}>
      <h2>Jump Back In!</h2>
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
      <FormControlLabel
        sx={{
          mt: '1rem',
        }}
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: pallette.primary,
              '&.Mui-checked': {
                color: pallette.primary,
              },
            }}
          />
        }
        label="Remember me"
      />
      <Button
        sx={{
          mt: '1rem',
          // borderColor: pallette.primaryL,
          // color: pallette.primary,
          // '&:hover': {
          //   borderColor: pallette.primary,
          // },
        }}
        variant="outlined"
        type="submit"
      >
        Login
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

export default LoginForm;
