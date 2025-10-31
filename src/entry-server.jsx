import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/src/App.jsx';
import { StaticRouter } from 'react-router-dom';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}