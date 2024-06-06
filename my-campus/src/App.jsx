import React from 'react';

import './App.css';


import Main from './pages/Main'
import Submain from './pages/Submain'
import Building from './pages/Building'
import Facility from './pages/Facility'
import Class from './pages/Class'
import Timetable from './pages/Timetable'
import Friends from './pages/Friends'

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
    localStorage.setItem("markers", []);
    const [id, setId] = React.useState("");
    return (
        <body>
            <div className='mainmain'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main id={id} setId={setId} />} />
                        <Route path="/timetable/:studentId" element={<Timetable token={id}/>} />
                        <Route path="/friends/" element={<Friends />} />
                        <Route path="/map/:buildingId" element={<Submain id={id} setId={setId} />} />
                        <Route path="/building/:buildingId/" element={<Building />} />
                        <Route path="/facility/:facilityId/" element={<Facility />} />
                        <Route path="/class/:classId/" element={<Class />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </body>
    );
}

export default App;
