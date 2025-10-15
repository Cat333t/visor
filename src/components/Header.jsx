import React from 'react';
import { Link } from 'react-router-dom';

import LoginButton from './LoginButton';

import '../styles/Header.css';

export default function Header() {
    return (
        <header className="App-header">
            <ul>
                <li><Link className='link' to="/">Home</Link></li>
                <li><Link className='link' to="/dashboard">Dashboard</Link></li>
                <li><Link className='link' to="/docs">Docs</Link></li>
                <li><LoginButton className='link' /></li>
            </ul>
        </header>
    );
}

