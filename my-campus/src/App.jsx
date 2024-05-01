import React from 'react';

import './App.css';

import GoogleMap from './component/map'
import SideBar from './component/bar'
import Search from './component/search'

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

const Main = () => {
    return (
        <div>
        <div>
            <div className='black'></div>
                <SideBar token='' />
                <Search />
            </div>
            <div>
                <GoogleMap/>
            </div>
        </div>
    )
}

export default App;
