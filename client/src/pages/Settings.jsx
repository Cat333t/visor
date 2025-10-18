import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/Auth';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../styles/Settings.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Profile from '../components/Settings/Profile';
import Security from '../components/Settings/Security';
import Notifications from '../components/Settings/Notifications';
import FeedbackAndSupport from '../components/Settings/FeedbackAndSupport';

export default function Settings() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const listRef = useRef(null);
    const [indicatorPos, setIndicatorPos] = useState({ y: -100, height: 0 });

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/');
        } else if (id === undefined) {
            navigate('/settings/profile');
        }
    }, [isAuthenticated, navigate, id]);

    useEffect(() => {
        if (listRef.current) {
            const active = listRef.current.querySelector('.active');
            if (active) {
                const rect = active.getBoundingClientRect();
                const parentRect = listRef.current.getBoundingClientRect();
                setIndicatorPos({
                    y: rect.top - parentRect.top + rect.height / 4,
                    height: rect.height / 2,
                });
                return;
            }
        }
    }, [id]);

    return (
        <div className="App-settings">
            <Header theme="fill" />
            <main>
                <div className="settings-sidebar">
                    <div className="settings-profile">
                        {isAuthenticated !== null ? (
                            <>
                                <img src={user.picture} alt="" referrerPolicy="no-referrer" />
                                <div className="settings-profile-info">
                                    <h2>{user.username || user.nickname || user.name}</h2>
                                    <p>{user.email}</p>
                                </div>
                            </>
                        ) : (
                            <div className="settings-profile-info">
                                <h2><FontAwesomeIcon icon={faSpinner} spin /></h2>
                            </div>
                        )}
                    </div>

                    <div className="settings-list-container">
                        <ul className="settings-list" ref={listRef}>
                            <div
                                className={`active-indicator`}
                                style={{
                                    transform: `translateY(${indicatorPos.y}px)`,
                                    height: `${indicatorPos.height}px`,
                                }}
                            ></div>

                            <li className={id === 'profile' ? 'active' : ''}>
                                <Link to="/settings/profile">Profile</Link>
                            </li>
                            <li className={id === 'security' ? 'active' : ''}>
                                <Link to="/settings/security">Security</Link>
                            </li>
                            <li className={id === 'notifications' ? 'active' : ''}>
                                <Link to="/settings/notifications">Notifications</Link>
                            </li>
                            <li className={id === 'feedback' ? 'active' : ''}>
                                <Link to="/settings/feedback">Feedback and Support</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="settings-content">
                    {id === 'profile' && <Profile />}
                    {id === 'security' && <Security />}
                    {id === 'notifications' && <Notifications />}
                    {id === 'feedback' && <FeedbackAndSupport />}
                </div>
            </main>
            <Footer />
        </div>
    );
}
