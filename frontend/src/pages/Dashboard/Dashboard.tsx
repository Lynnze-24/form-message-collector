import React, { FC, useEffect } from 'react';
import SideNav from '../../components/ui/layout/nav/SideNav';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from '../../components/ui/layout/topbar/TopBar';
import Divider from '../../components/ui/common/Divider/Divider';
import ProjectList from '../../components/ui/projects/projectList/ProjectList';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { data: userData } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/auth');
    }
  }, [userData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      exit={{ opacity: 0 }}
    >
      <TopBar />
      <div className="layoutCon">
        <SideNav />
        <Outlet />
        <Divider className="commonLayoutDivider" />
        <ProjectList />
      </div>
    </motion.div>
  );
};

export default Dashboard;
