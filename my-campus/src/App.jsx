import React from 'react';

import './App.css';


import Main from './pageMain/main'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

function App() {
    return (
        <body>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </body>
    );
}

export default App;
