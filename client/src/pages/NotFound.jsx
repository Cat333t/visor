import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/NotFound.css';

export default function NotFound() {
    return (
        <div className="App-not-found">
            <link rel="preload" as="image" href="../assets/background.jpg" />
            <Header />
            <main>
                <h1>Error 404.</h1>
                <h2>Page not found.</h2>
                <p>
                    This page was stolen by a tester. Don&apos;t worry, you can try to find it again. 
                    If you can&apos;t, please, contact the{' '}
                    <a href="mailto:cat333tr@gmail.com">developer</a>.
                </p>

            </main>
            <Footer />
        </div>
    );
}

