import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

export default function Header() {
    return (
        <header className="App-header">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/docs">Docs</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
            </ul>
        </header>
    );
}

