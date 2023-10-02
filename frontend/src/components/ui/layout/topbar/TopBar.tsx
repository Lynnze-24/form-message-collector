import React, { FC } from 'react';
import styles from './TopBar.module.css';
import logo from '../../../../assets/images/fmcLogo.png';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../../store/users/userSlice';
import { useToast } from '../../../../hooks/useToast/useToast';

interface TopBarProps {
  children?: React.ReactNode;
}

const TopBar: FC<TopBarProps> = ({}) => {
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const logout = () => {
    dispatch(resetUser());
    openToast('Logged out successfully!', 'success');
  };

  return (
    <div className={styles.topBarCon}>
      <img className={styles.topBarLogo} src={logo} alt="logo" />
      <div className={styles.topBarRight}>
        <Tooltip title="Logout">
          <IconButton onClick={logout}>
            <LogoutIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;
