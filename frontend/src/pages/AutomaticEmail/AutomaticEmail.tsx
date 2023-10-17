import React, { FC } from 'react';
import CommonLayout from '../../components/ui/layout/CommonLayout';
import styles from './AutomaticEmail.module.css';
import BaseButton from '../../components/ui/common/BaseButton/BaseButton';
import GoogleIcon from '@mui/icons-material/Google';
interface AutomaticEmailProps {
  children?: React.ReactNode;
}

const AutomaticEmail: FC<AutomaticEmailProps> = ({}) => {
  return (
    <CommonLayout>
      <div className={styles.unLinkedStateWrapper}>
        <div className={styles.unLinkedState}>
          Please Link with your google account to use this feature.
          <BaseButton
            style={{
              padding: '1rem 2rem',
              fontSize: '1.5rem',
            }}
            mode="contained"
          >
            Link with Google
            <GoogleIcon sx={{ ml: '0.5rem' }} />
          </BaseButton>
        </div>
      </div>
    </CommonLayout>
  );
};

export default AutomaticEmail;
