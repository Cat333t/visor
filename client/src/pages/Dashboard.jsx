import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
    return (
        <div className="App-dashboard">
            <Header />
            <main>
                <h1>Dashboard</h1>
                <p><i className="fa fa-spinner fa-spin"></i> It is a work in progress. Check back later.</p>
            </main>
            <Footer />
        </div>
    );
}

