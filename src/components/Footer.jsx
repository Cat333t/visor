import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import '../styles/Footer.css';

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
                        <li><a href="/">Home</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/docs">Docs</a></li>
                    </ul>
                </div>
                
                <div className="App-footer-info-section">
                    <h4>Follow us</h4>

                    <ul>
                        <li><a href="https://github.com/cat333t/visor">GitHub</a></li>
                        <li><a href="https://cat333t.github.io/visor">Website</a></li>
                    </ul>
                </div>

                <div className="App-footer-info-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="App-footer-copyright">
                <p> 2025 Visor. All rights reserved.</p>

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

