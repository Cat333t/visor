import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="App-footer">
            <div className="App-footer-info">
                <div className="App-footer-info-section">
                    <h3>Visor</h3>
                    <p>A simple and efficient tool for monitoring and managing your system resources.</p>
                </div>

                <div className="App-footer-info-section">
                    <h4>Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/docs">Docs</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>
                
                <div className="App-footer-info-section">
                    <h4>Follow us</h4>

                    <ul>
                        <li><a href="https://github.com/cat333t/visor" rel="noreferrer" target='_blank'>GitHub</a></li>
                        <li><a href="https://cat333t.github.io/visor" rel="noreferrer" target='_blank'>Website</a></li>
                    </ul>
                </div>

                <div className="App-footer-info-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="App-footer-copyright">
                <p>© 2025 Visor. All rights reserved.</p>

                <div className="App-footer-copyright-icons">
                    <a href="https://github.com/cat333t/visor">
                        <FontAwesomeIcon icon={faGithub} size="2x" color="#333" />
                    </a>
                    <a href="https://cat333t.github.io/visor">
                        <FontAwesomeIcon icon={faGlobe} size="2x" color="#333" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

