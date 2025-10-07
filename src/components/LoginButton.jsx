import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

export default function LoginButton(args) {
    const { loginWithRedirect } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('#4A90E2');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
            setRedirect(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    useEffect(() => {
        if (redirect) {
            loginWithRedirect();
            setRedirect(false);
        }
    }, [redirect, loginWithRedirect]);

    const handleLogin = async () => {
        setLoading(true);
    };

    setInterval(() => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setColor(randomColor);
    }, 2000);

    return (
        <div>
            <button
                className={args.className}
                onClick={handleLogin}
            >
              Login
            </button>

            {loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, height: '100dvh', width: '100%', zIndex: 9999, backdropFilter: 'blur(5px)' }}>
                    <Quantum
                    size="200"
                    speed="2"
                    color={color}
                    />
                </div>
            )}
        </div>
    );
}

