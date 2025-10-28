import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

import '../styles/NotFound.css';

import { useLoading } from '../context/Loading'; 

export default function NotFound() {
    const { startLoading, stopLoading } = useLoading();
    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        console.log(checked) // сначало false потом undefined
        if (process.env.NODE_ENV !== 'production' && !checked) {
            const checkProxy = async () => {
                startLoading(() => {
                    setChecked(true);
                });
                try {
                    const response = await axios.head('http://localhost:4000');
                    if (response.status === 200) {
                        // const currentPath = window.location.pathname + window.location.search;
                        // window.location.href = `http://localhost:4000${currentPath}`;
                        setTimeout(() => {
                            stopLoading();
                        }, 5000)
                    } else {
                        stopLoading();
                    }
                } catch (err) {
                    console.log('Proxy (localhost:4000) unreachable');
                    stopLoading();
                }
            };

            checkProxy();
        }
    }, [startLoading, stopLoading]);

    return (
        <>
            {checked && (
                <div className="App-not-found">
                    <link rel="preload" as="image" href="../assets/background.jpg" />
                    <Header />
                    <main>
                        <h1>Error 404.</h1>
                        <h2>Page not found.</h2>
                        <p>
                            This page was stolen by a tester. Don&apos;t worry, you can try to find it again.
                            If you can&apos;t, please contact the{' '}
                            <a href="mailto:cat333tr@gmail.com">developer</a>.
                        </p>
                    </main>
                    <Footer />
                </div>
            )}
        </>
    );
}

