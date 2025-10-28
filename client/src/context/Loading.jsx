import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const callbacksRef = useRef([]); // [ { callback: () => {}, required: [] } ]
    const [color, setColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0')}`);
    
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
                setColor(randomColor);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [loading]);

    const startLoading = (afterFinish = () => {}, required = []) => {
        if (!loading) return setLoading(true)

        if (afterFinish && typeof afterFinish === "function") {
            callbacksRef.current.push({
                callback: afterFinish,
                required
            });
        }
    };

    const stopLoading = () => setLoading(false);

    useEffect(() => {
        if (!loading && callbacksRef.current.length > 0) {
            Promise.resolve().then(async () => {
                const remaining = [];

                for (const item of callbacksRef.current) {
                    const { callback, required } = item;

                    const ready = required.every(r => {
                        if (r?.current !== undefined) return r.current != null; // react ref
                        if (typeof r === "object") return r !== null; // object
                        if (typeof r === "string") return r !== ""; // string
                        if (typeof r === "number") return r !== 0; // number
                        if (typeof r === "boolean") return r; // boolean
                        if (Array.isArray(r)) return r.length > 0; // array
                        if (typeof r === "function") return r() === true; // function
                        return Boolean(r);
                    });

                    if (ready) {
                        try {
                            await callback(); // сначало это виполняеться а потом почему-то пропадает loading
                        } catch (err) {
                            console.error("AfterFinish callback error while loading:", err);
                        }
                    } else {
                        remaining.push(item);
                    }
                }

                callbacksRef.current = remaining;
            });
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



