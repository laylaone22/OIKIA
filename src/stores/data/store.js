import { createContext, useReducer, useEffect } from 'react';
// actions
import { RESTORE_STATE } from './actions';

// reducer
import dataReducer from './reducer.js';

// create context for the provider and export it for the children
export const dataContext = createContext();

// create Provider and useReducer to be exported for init the provider in index.js
export const DataProvider = ({ children }) => {
    // useReducer to handle status and setters
    const [dataState, dispatch] = useReducer(dataReducer, {});

    // on mount store auth data in localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('dataState');
        if (storedData) dispatch({ type: RESTORE_STATE, payload: JSON.parse(storedData) });
    }, []);

    useEffect(() => localStorage.setItem('dataState', JSON.stringify(dataState)), [dataState]);

    // return the Provider based on dataContext and values you need
    return <dataContext.Provider value={{ dataState, dispatch }}>{children}</dataContext.Provider>;
};