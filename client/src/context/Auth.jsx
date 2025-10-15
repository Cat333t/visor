import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// import { useLoading } from "./Loading";
import { useError } from "./Error";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // const { startLoading, stopLoading } = useLoading();
    const { showError } = useError();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        /**
         * Fetch the user profile
         * @returns {Promise<void>} - A promise that resolves when the user profile is fetched
         */
        const fetchUser = async () => {
            try {
                // Make a GET request to the API to fetch the user profile
                // The request is made with credentials, and the status code is validated
                // If the status code is 401, the user is not authenticated
                // If the status code is 200-299, the user is authenticated and the user profile is fetched
                // If the status code is 400-499, an error occurs and the error message is shown
                // If the status code is 500-599, an error occurs and the error message is shown
                const response = await axios.get(
                    '/api/auth/profile',
                    {
                        withCredentials: true,
                        validateStatus: (status) => (status >= 200 && status < 300) || status === 401
                    }
                );

                if (response.data.success) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser({});
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    setIsAuthenticated(false);
                    setUser({});
                } else {
                    showError("Failed to fetch user profile: " + (error?.message || 'Unknown error'));
                }
            }
        }
        fetchUser();
    }, [showError]);

    /**
     * Sign in the user
     * @returns {void} - This function does not return anything
     * @description This function signs in the user by redirecting to the login page
    */
    const sign_in = () => {
        if (!isAuthenticated) {
            window.location.href = '/signin';
        }
    }

    const sign_out = () => {
        window.location.href = '/sign_out';
    }


    /**
     * Update the user profile
     * @param {Object} data - The data to be updated
     * @returns {Promise<Object>} - A promise that resolves with an object containing success and message
     * @description This function makes a POST request to the API to update the user profile
     */
    const updateProfile = (data) => {
        try {
            return new Promise((resolve, reject) => {
                axios.post(
                    process.env.NODE_ENV === 'api/update-profile',
                    data,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                ).then(response => {
                    if (response.data.success) {
                        resolve({ 
                            success: true,
                            message: response.data?.message
                        });
                    } else {
                        resolve({ 
                            success: false,
                            message: response.data?.message
                        });
                    }
                }).catch(error => {
                    reject({ 
                        success: false,
                        message: 'Failed to update user profile: ' + (error?.message || 'Unknown error')
                    });
                });
            });
        } catch (error) {
            return Promise.reject({ 
                success: false,
                message: 'Failed to update user profile: ' + (error?.message || 'Unknown error')
            });
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, sign_in, sign_out, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


