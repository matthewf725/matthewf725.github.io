// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007ACC'  // VS Code blue accent
        },
        background: {
            default: '#1E1E1E',  // Dark grey background
            paper: '#252526'     // A slightly lighter grey for cards
        },
        text: {
            primary: '#CCCCCC'
        }
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
