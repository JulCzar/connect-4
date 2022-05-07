import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppStyles } from '../styles';
import Routes from './routes';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes />
    <AppStyles />
  </BrowserRouter>
);

export default Router;
