import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../../portal/Portal';
import styles from './Dialog.module.css';

interface DialogProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, children, onClose }) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, borderRadius: '50%' }}
            animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
            exit={{ opacity: 0, scale: 0, borderRadius: '50%' }}
            transition={{ duration: 0.3 }}
            className={styles.backdrop}
          >
            <motion.div className={styles.dialog}>
              <div onClick={onClose} className={styles.dialogBtn}>
                <span className="material-icons">close</span>
              </div>

              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Dialog;
