import { createContext, useState } from 'react';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({ userName: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('');

    return (
        <authContext.Provider value={{ userData, isLoggedIn, authToken, setUserData, setIsLoggedIn, setAuthToken }}>
            {children}
        </authContext.Provider>
    );
};
