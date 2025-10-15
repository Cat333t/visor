import React from "react";
import { useLoading } from "../context/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/Auth";

export default function LoginButton(args) {
    const { startLoading } = useLoading();
    const { isAuthenticated, sign_in } = useAuth();

    return (
        <div>
            <button
                className={args.className}
                onClick={() => {
                    startLoading();

                    sign_in();
                }}
            >
                {isAuthenticated === null ? <FontAwesomeIcon icon={faSpinner} spin /> : isAuthenticated ? 'Sign Out' : 'Sign In'}
            </button>
        </div>
    );
}

