import React from 'react';

import './App.css';


import Main from './pages/Main'
import Submain from './pages/Submain'
import Building from './pages/Building'
import Facility from './pages/Facility'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

function App() {
    let json = require('./path.json');
    console.log(json.path);
    localStorage.setItem("apiPath", json.path);
    localStorage.setItem("markers", [])
    return (
        <body>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/:buildingId" element={<Submain />} />
                    <Route path="/building/:buildingId/" element={<Building />} />
                    <Route path="/facility/:facilityId/" element={<Facility />} />
                </Routes>
            </BrowserRouter>
        </body>
    );
}

export default App;
