import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { FC } from 'react';
import styles from './LoginForm.module.css';
import pallette from '../../../assets/palette';

interface LoginFormProps {
  children?: React.ReactNode;
}

const LoginForm: FC<LoginFormProps> = ({}) => {
  return (
    <form className={styles.loginForm}>
      <h2>Jump Back In!</h2>
      <TextField label="Email Address" variant="standard" />
      <TextField label="Password" variant="standard" />
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
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
