import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import { AnimatePresence } from 'framer-motion';
import Messages from '../pages/Messages/Messages';
import HowToConnect from '../pages/HowToConnect/HowToConnect';
import AutomaticEmail from '../pages/AutomaticEmail/AutomaticEmail';
import Dashboard from '../pages/Dashboard/Dashboard';

interface RouterProps {
  children?: React.ReactNode;
}

interface route {
  path: string;
  element: JSX.Element;
  redirect?: string;
  children?: route[];
}

const RoutesArr: route[] = [
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'how-to-connect',
        element: <HowToConnect />,
      },
      {
        path: 'automatic-email',
        element: <AutomaticEmail />,
      },
    ],
  },
  {
    path: '/', // <-- here
    element: <Navigate to="/auth" replace />,
  },
];

const Router: FC<RouterProps> = ({}) => {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {RoutesArr.map((r) => (
            <Route key={r.path} path={r.path} element={r.element}>
              {r.children &&
                r.children.map((rc) => (
                  <Route
                    key={rc.path}
                    path={rc.path}
                    element={rc.element}
                  ></Route>
                ))}
            </Route>
          ))}
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default Router;
