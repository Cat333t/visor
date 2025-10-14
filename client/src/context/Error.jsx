import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const showError = (message) => {
    toast.error(message || "Unexpected error 😢");
    console.error(message);
  };

  const showWarning = (message) => {
    toast.warn(message || "Warning ⚠️");
    console.warn(message);
  };

  const showSuccess = (message) => {
    toast.success(message || "Success ✅");
    console.log(message);
  };

  const showInfo = (message) => {
    toast.info(message || "Info ℹ️");
    console.log(message);
  };

  return (
    <ErrorContext.Provider value={{ showError, showSuccess, showInfo, showWarning }}>
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
