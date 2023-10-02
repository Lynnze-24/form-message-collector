// PortalComponent.tsx

import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const portalRoot = document.body;

  if (!portalRoot) {
    throw new Error('Portal root element not found.');
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
