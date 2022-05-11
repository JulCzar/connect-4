import React from 'react';
import { useRoutes } from 'react-router-dom';
import * as screen from '../screens';

const Routes: React.FC = () => {
  const routes = useRoutes([
    { path: '/', element: <screen.Home /> },
    {
      path: 'game',
      element: <screen.Game />,
      children: [
        { path: '', element: <screen.PvP /> },
        { path: 'pvc', element: <screen.PvC /> },
        { path: 'cvc', element: <screen.CvC /> },
      ],
    },
  ]);
  return routes;
};

export default Routes;
