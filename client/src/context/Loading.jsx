import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0')}`);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
            setColor(randomColor);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, loading }}>
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

