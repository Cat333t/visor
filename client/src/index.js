import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './App';
import { ErrorProvider } from './context/Error';
import { AuthProvider } from './context/Auth';
import { LoadingProvider } from './context/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorProvider>
        <LoadingProvider>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
        </LoadingProvider>
        </ErrorProvider>
    </React.StrictMode>
);

