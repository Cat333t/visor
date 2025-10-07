import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";

import './styles/index.css';
import App from './App';

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={auth0Domain}
            clientId={auth0ClientId}
            authorizationParams={{
                redirect_uri: window.location.origin + '/visor'
            }}
            useRefreshTokens={true}
            cacheLocation="localstorage" 
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);

