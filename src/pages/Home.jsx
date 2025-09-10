import React from 'react';

import '../styles/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <main>
                <h1>Welcome to <span id="visor">Visor</span>!</h1>
                <p>A lightweight website analytics tool.</p>
            </main>
        </div>
    );
}
