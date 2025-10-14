import React from 'react';
import { Link } from 'react-router-dom';

import LoginButton from './LoginButton';
import { useAuth } from '../context/Auth';

import '../styles/Header.css';

export default function Header(args) {
    const { isAuthenticated, user } = useAuth();

    const handleSettings = () => {
        window.location.href = '/settings/profile';
    }

    return (
        <header className={`App-header ${args.theme}`} >
            <nav>
                <ul>
                    <li><Link className='link' to="/">Home</Link></li>
                    <li><Link className='link' to="/dashboard">Dashboard</Link></li>
                    <li><Link className='link' to="/docs">Docs</Link></li>
                </ul>

                {isAuthenticated && user &&
                    <div className="profile" onClick={handleSettings} title="View Profile">
                        <img className="profile-picture" src={user.picture} width={50} height={50} />
                        <span className="profile-name">{user.username || user.nickname || user.name}</span>
                    </div>
                || 
                    <div className="login">
                        <LoginButton className='link' />
                    </div>
                }
            </nav>
        </header>
    );
}
