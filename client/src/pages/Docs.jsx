import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Docs() {
    return (
        <div>
            <Header />
            <main>
                <h1>Documentation</h1>
                <p><i className="fa fa-spinner fa-spin"></i> It is a work in progress. Check back later.</p>
            </main>
            <Footer />
        </div>
    );
}
