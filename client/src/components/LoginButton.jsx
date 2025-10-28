import React from "react";
import { useLoading } from "../context/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/Auth";

export default function LoginButton(args) {
    const { startLoading } = useLoading();
    const { isAuthenticated, login } = useAuth();

    return (
        <div>
            <button
                className={args.className}
                onClick={() => {
                    startLoading();

                    if (isAuthenticated === false) {
                        login();
                    } else {
                        window.location.href = '/signout';
                    }
                }}
            >
                {isAuthenticated === null ? <FontAwesomeIcon icon={faSpinner} spin /> : isAuthenticated ? 'Sign Out' : 'Sign In'}
            </button>
        </div>
    );
}

