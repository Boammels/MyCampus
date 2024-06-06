import React from "react";

import Search from '../components/Search'
import GoogleMap from '../components/GoogleMap'
import SideBar from '../components/Bar'

import "../styles/main.css";


const Main = ( {id, setId} ) => {
    const [markers, setMarkers] = React.useState([])
    return (
        <div>
        <div>
            <div className='black'></div>
                <SideBar token={id} setId={setId} />
                <Search setMarkers={setMarkers}/>
            </div>
            <div>
                <GoogleMap markers = {markers}/>
            </div>
        </div>
    )
}

export default Main;