import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Main from '../client/src/Main.jsx';

if (typeof document !== 'undefined') {
  hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}