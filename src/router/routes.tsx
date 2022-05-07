import React from 'react';
import { useRoutes } from 'react-router-dom';
import * as screen from '../screens';

const Routes: React.FC = () => {
  const routes = useRoutes([
    { path: '/', element: <screen.Home /> },
    { path: 'board', element: <screen.Board /> },
  ]);
  return routes;
};

export default Routes;
