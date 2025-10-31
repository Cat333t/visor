import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="App-home">
            <link rel="preload" as="image" href="/assets/background.webp" />
            <Header />
            <main>
                <h1>Welcome to <span id="visor">Visor</span>!</h1>
                <p>A lightweight website analytics tool.</p>
            </main>
            <Footer />
        </div>
    );
}

