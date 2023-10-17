import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './BaseButton.module.css';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  status?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'purple';
  mode?: 'outlined' | 'contained';
  iconName?: string;
}

const BaseButton: FC<BaseButtonProps> = ({
  children,
  status = 'primary',
  iconName,
  mode = 'outlined',
  ...rest
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[status]} ${styles[mode]}`}
      {...rest}
    >
      <div className={styles.btnChildren}>{children}</div>
      {iconName && <span className="material-icons">{iconName}</span>}
    </button>
  );
};

export default BaseButton;
