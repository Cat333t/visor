import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Login from './pages/Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <BrowserRouter basename="/visor">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="*" element={<div>404 - Page not found</div>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App
