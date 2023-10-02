import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, { FC, useState, useRef } from 'react';
import styles from './AuthSwitcher.module.css';
import LoginForm from '../../../forms/LoginForm/LoginForm';
import SignupForm from '../../../forms/SignupForm/SignupForm';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';
import ForgetForm from '../../../forms/ForgetForm/ForgetForm';

interface AuthSwitcherProps {
  children?: React.ReactNode;
}

const authItems = [
  {
    id: 'login',
    name: 'login',
  },
  {
    id: 'signup',
    name: 'signup',
  },
];

const AuthSwitcher: FC<AuthSwitcherProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const aniRef = useRef<HTMLDivElement | null>(null);

  const resetId = (): void => {
    setSelectedId(null);
  };

  return (
    <LayoutGroup>
      <div className={styles.wrapper}>
        {authItems.map((item) => (
          <motion.div
            key={item.id}
            className={styles.authCons}
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
          >
            <div className={styles.noClick}>
              {item.id === 'login' ? (
                <LoginForm />
              ) : (
                <SignupForm resetLayout={resetId} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <p>Forgot your password? Click the button below.</p>
      <motion.div
        ref={aniRef}
        className={styles.forgetFormSize}
        layoutId={'forget'}
      >
        <Button
          onClick={() => {
            setSelectedId('forget');
          }}
          sx={{
            mt: '1rem',
            // backgroundColor: pallette.primary,
            // '&:hover': {
            //   backgroundColor: pallette.primary,
            // },
          }}
          variant="contained"
        >
          Reset Password
        </Button>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div className={styles.authBigOverlay}>
            <motion.div className={styles.authBigOverlayBlur}></motion.div>
            <motion.div className={styles.authBig} layoutId={selectedId}>
              <IconButton
                onClick={resetId}
                className={styles.authIconBtn}
                aria-label="delete"
              >
                <ClearIcon />
              </IconButton>
              {/* <button className={styles.resetAuth} onClick={resetId}>
                x
              </button> */}
              {selectedId === 'login' ? (
                <LoginForm />
              ) : selectedId === 'signup' ? (
                <SignupForm resetLayout={resetId} />
              ) : (
                <ForgetForm resetLayout={resetId} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default AuthSwitcher;
