import React, { FC } from 'react';
import styles from './Nav.module.css';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  children?: React.ReactNode;
  title: string;
  icon: JSX.Element;
  to: string;
}

const NavItem: FC<NavItemProps> = ({ title, icon, to }) => {
  let location = useLocation();

  return (
    <Link
      to={to}
      className={to === location?.pathname ? styles.activeLink : styles.navItem}
    >
      {icon}
      <p>{title}</p>
    </Link>
  );
};

export default NavItem;
