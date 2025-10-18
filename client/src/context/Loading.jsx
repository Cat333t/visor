import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const callbacksRef = useRef([]);
    const [color, setColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0')}`);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
            setColor(randomColor);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const startLoading = (afterFinish = () => {}) => { // TODO: when loading is done, run afterFinish
        setLoading(true);
        if (typeof afterFinish === "function") {
            callbacksRef.current.push(afterFinish);   
        }
    }

    const stopLoading = () => setLoading(false);

    useEffect(() => {
        if (loading === false && callbacksRef.current.length > 0) {
        const callbacks = [...callbacksRef.current];
        callbacksRef.current.length = 0;

        (async () => {
            for (const cb of callbacks) {
            try {
                await Promise.resolve().then(() => cb());
            } catch (err) {
                console.error("afterFinish callback error:", err);
            }
            }
        })();
        }
    }, [loading]);


    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, loading, setLoading }}>
            {children}
            {loading && (
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100dvh',
                    width: '100%',
                    zIndex: 9999,
                    backdropFilter: 'blur(5px)'
                }}>
                    <Quantum size="200" speed="2" color={color} />
                </div>
            )}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



