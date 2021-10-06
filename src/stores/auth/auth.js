import { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({ name: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('');

    // on mount store auth data in localStorage
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        const authToken = localStorage.getItem('authToken');
        if (isLoggedIn && userData && authToken) {
            setIsLoggedIn(JSON.parse(isLoggedIn));
            setUserData(JSON.parse(userData));
            setAuthToken(JSON.parse(authToken));
        }
    }, []);

    return (
        <authContext.Provider value={{ userData, isLoggedIn, authToken, setUserData, setIsLoggedIn, setAuthToken }}>
            {children}
        </authContext.Provider>
    );
};
