import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter} from 'react-router-dom';
import {myTheme} from './theme/my-theme';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={myTheme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
