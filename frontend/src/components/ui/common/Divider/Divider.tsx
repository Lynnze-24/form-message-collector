import React, { FC } from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={styles.divider + ' ' + className}></div>;
};

export default Divider;
