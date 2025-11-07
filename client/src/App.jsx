import React from "react";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
// import SignInRedirect from './context/SignInRedirect';

import { ErrorProvider } from './context/Error';
import { AuthProvider } from './context/Auth';
import { LoadingProvider } from './context/Loading';


function App() {
    return (
        <ErrorProvider>
        <LoadingProvider>
        <AuthProvider>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/settings/:id?" element={<Settings />} />
                {/* <Route path="/login" element={<SignInRedirect />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="colored"
            />
        </AuthProvider>
        </LoadingProvider>
        </ErrorProvider>
    );
}

export default App;

