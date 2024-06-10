import React from "react";

import Search from '../components/Search'
import GoogleMap from '../components/GoogleMap'
import SideBar from '../components/Bar'

import "../styles/main.css";


const Main = ( {id, setId, name, setName} ) => {
    const [markers, setMarkers] = React.useState([])
    return (
        <div>
        <div>
            <div className='black'></div>
                <SideBar studentId={id} setId={setId} name={name} setName={setName} />
                <Search setMarkers={setMarkers}/>
            </div>
            <div>
                <GoogleMap markers = {markers}/>
            </div>
        </div>
    )
}

export default Main;