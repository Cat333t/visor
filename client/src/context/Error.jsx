import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [isMessageEnabled, setIsMessageEnabled] = useState(true);

    const showError = (message) => {
        if (isMessageEnabled) return;
        toast.error(message || "Unexpected error 😢");
        console.error(message);
    };

    const showWarning = (message) => {
        if (isMessageEnabled) return;
        toast.warn(message || "Warning ⚠️");
        console.warn(message);
    };

    const showSuccess = (message) => {
        if (isMessageEnabled) return;
        toast.success(message || "Success ✅");
        console.log(message);
    };

    const showInfo = (message) => {
        if (isMessageEnabled) return;
        toast.info(message || "Info ℹ️");
        console.log(message);
    };

    const hideMessage = () => {
        setIsMessageEnabled(true);
    };

    const showMessage = () => {
        setIsMessageEnabled();
    };

    return (
      <ErrorContext.Provider value={{ showError, showSuccess, showInfo, showWarning, hideMessage, showMessage }}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
        />
      </ErrorContext.Provider>
    );
}

export function useError() {
    return useContext(ErrorContext);
}

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
