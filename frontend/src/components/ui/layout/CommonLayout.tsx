import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 2 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, translateY: 2 }}
      className="commonLayout"
    >
      <div className="commonLayoutLeft">
        <div className="commonLayoutLeft-main">{children}</div>
      </div>
    </motion.div>
  );
};

export default CommonLayout;
