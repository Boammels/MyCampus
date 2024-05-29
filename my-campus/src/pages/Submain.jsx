import React from "react";
import axios from 'axios';

import { useParams } from 'react-router-dom';
import Search from '../components/Search'
import GoogleMap from '../components/GoogleMap'
import SideBar from '../components/Bar'

import "../styles/main.css";


const Submain = () => {
    const id = useParams().buildingId;
    const [markers, setMarkers] = React.useState([]);
    const searchBuilding = async () => {
        axios.get('http://127.0.0.1:5000/building/details/',
            { 
              params : {
                'buildingId': id
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
    React.useEffect(() => searchBuilding, [id])
    return (
        <div>
        <div>
            <div className='black'></div>
                <SideBar token='' />
                <Search setMarkers={setMarkers}/>
            </div>
            <div>
                <GoogleMap markers = {markers}/>
            </div>
        </div>
    )
}

export default Submain;