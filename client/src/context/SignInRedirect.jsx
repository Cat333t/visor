import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useError } from "./Error";
import { useLoading } from "./Loading";

function SignInRedirect() {
    const { startLoading } = useLoading();
    const { hideMessage, showMessage } = useError();

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            hideMessage();
            startLoading(showMessage);
            window.location.href = "http://localhost:4000/signin";
        }
    }, [startLoading, hideMessage, showMessage]);

    if (process.env.NODE_ENV === "production") {
        return <Navigate to="/" replace />;
    }

    return null;
}

export default SignInRedirect;
