// Component installation

// 1. Install Material Icons
// Put below link in your index.html head..
// <link href="https://fonts.googleapis.com/icon?  family=Material+Icons"
//       rel="stylesheet"
//     />

// 2. Install Portal component
// 3. Install Framer motion
//    yarn add framer-motion or npm install framer-motion

import React, { FC, useEffect, useRef } from 'react';
import Portal from '../portal/Portal';
import styles from './Toast.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export interface ToastProps {
  children?: React.ReactNode;
  message: string;
  status?: '' | 'success' | 'error' | 'warning' | 'info';
  mode?: 'outlined' | 'filled';
  autoCloseMilli?: number;
  onClose: () => void;
  isOpen: boolean;
}

const icons = {
  success: 'check_circle',
  error: 'error',
  warning: 'report_problem',
  info: 'info',
};

const Toast: FC<ToastProps> = ({
  message,
  status = '',
  isOpen,
  mode = 'outlined',
  onClose,
  autoCloseMilli,
}) => {
  let timeOut = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    if (isOpen) {
      timeOut.current = setTimeout(onClose, autoCloseMilli);
    }

    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [isOpen]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.toastContainer} ${styles[status]} ${styles[mode]}`}
            initial={{ opacity: 0, translateY: -100, translateX: '-50%' }}
            animate={{ opacity: 1, translateY: 0, translateX: '-50%' }}
            exit={{ opacity: 0, translateY: -100, translateX: '-50%' }}
          >
            <div className={styles.leftCon}>
              {status && (
                <span className={'material-icons ' + styles.toastIcon}>
                  {icons[status]}
                </span>
              )}
              <p>{message}</p>
            </div>
            <span
              onClick={onClose}
              className={'material-icons ' + styles.toastIcon}
            >
              highlight_off
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Toast;
