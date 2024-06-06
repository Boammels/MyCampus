import React from "react";
import axios from 'axios';

import { useParams } from 'react-router-dom';
import Search from '../components/Search'
import GoogleMap from '../components/GoogleMap'
import SideBar from '../components/Bar'

import "../styles/main.css";


const Submain = ( {id, setId} ) => {
    const bid = useParams().buildingId;
    const [markers, setMarkers] = React.useState([]);
    const searchBuilding = async () => {
        axios.get('http://127.0.0.1:5000/building/details/',
            { 
              params : {
                'buildingId': bid
              }
            }).then(({ data }) => {
                console.log(data);
                setMarkers([data]);
            }
          )
          .catch((err) => {
            alert(err.message);
          });
    }
    React.useEffect(() => searchBuilding, [bid])
    return (
        <div>
        <div>
            <div className='black'></div>
                <SideBar token={id} setId={setId} />
                <Search setMarkers={setMarkers}/>
            </div>
            <div>
                <GoogleMap markers = {markers} />
            </div>
        </div>
    )
}

export default Submain;