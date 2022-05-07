import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';

const _root = document.getElementById('root')!;
const root = ReactDOM.createRoot(_root);

root.render(<Router />);
