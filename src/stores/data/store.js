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
    const [dataState, dispatch] = useReducer(dataReducer, []);

    // effects to get and set local storage
    // on App mount get localStorage
    useEffect(() => {
        const storedDataState = localStorage.getItem('dataState');
        if (storedDataState) dispatch({ type: RESTORE_STATE, payload: JSON.parse(storedDataState) });
    }, []);

    // on any appState changes set localStorage
    useEffect(() => localStorage.setItem('appState', JSON.stringify(dataState)), [dataState]);

    // return the Provider based on appContext and values you need
    return <dataContext.Provider value={{ dataState, dispatch }}>{children}</dataContext.Provider>;
};
