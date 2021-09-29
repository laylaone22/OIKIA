import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

// providers
import { DataProvider } from './stores/data/store';
import { AuthProvider } from './stores/auth/auth.js';

// components
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
