import React, { FC } from 'react';
import NavItem from './NavItem';
import styles from './Nav.module.css';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import Divider from '../../common/Divider/Divider';

interface SideNavProps {
  children?: React.ReactNode;
}

type navItems = {
  title: string;
  id: number;
  icon: JSX.Element;
  to: string;
};

const navItemArr: navItems[] = [
  {
    title: 'Messages',
    id: 1,
    icon: <ChatBubbleOutlineOutlinedIcon />,
    to: '/dashboard/messages',
  },
  {
    title: 'How to connect',
    id: 2,
    icon: <CodeOutlinedIcon />,
    to: '/dashboard/how-to-connect',
  },
  {
    title: 'Automatic email',
    id: 3,
    icon: <MailOutlinedIcon />,
    to: '/dashboard/automatic-email',
  },
];
const SideNav: FC<SideNavProps> = ({}) => {
  return (
    <>
      <aside className={styles.sideNavCon}>
        {navItemArr.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </aside>
      <Divider />
    </>
  );
};

export default SideNav;
