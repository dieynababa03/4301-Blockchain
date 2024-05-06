import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAuthenticated(loggedIn);
        setIsAdmin(loggedIn && adminStatus);
    }, []);

    const login = (adminStatus) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', adminStatus.toString());
        setIsAuthenticated(true);
        setIsAdmin(adminStatus);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
