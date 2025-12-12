import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                    // Optionally verify token with backend
                    // await fetchUserProfile();
                } catch (err) {
                    console.error("Error parsing stored user:", err);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(API_PATHS.Auth.Login, {
                email,
                password
            });

            const { token, user: userData } = response.data;

            // Store token and user in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            setUser(userData);
            setLoading(false);
            return { success: true, user: userData };
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(API_PATHS.Auth.Register, {
                name,
                email,
                password
            });

            const { token, user: userData } = response.data;

            // Store token and user in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            setUser(userData);
            setLoading(false);
            return { success: true, user: userData };
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setError(null);
    };

    // Update user profile
    const updateProfile = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put(API_PATHS.Auth.UPDATE_PROFILE, userData);
            const updatedUser = response.data.user;

            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setLoading(false);
            return { success: true, user: updatedUser };
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Update failed";
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!user && !!localStorage.getItem("token");
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
