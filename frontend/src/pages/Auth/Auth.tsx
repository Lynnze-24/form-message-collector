import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import logo from '../../assets/images/fmcLogo.png';
import styles from './Auth.module.css';
import AuthSwitcher from '../../components/ui/auth/AuthSwitcher/AuthSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface AuthProps {}

const Auth: FC<AuthProps> = ({}) => {
  const { data: userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate('/dashboard/messages');
    }
    console.log(userData);
  }, [userData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      className={'container ' + styles.auth}
    >
      <img src={logo} alt="logo" />
      <p>Join FMC now to simply make your contact forms work!</p>
      <AuthSwitcher />
    </motion.div>
  );
};

export default Auth;
