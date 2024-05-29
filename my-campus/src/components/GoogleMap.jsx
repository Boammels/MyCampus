import React from "react";

import { useNavigate } from "react-router-dom";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

import "../styles/main.css";

const GoogleMap = ({markers}) => {
    //var markers = localStorage.getItem("markers");
    console.log (markers);
    const defaultProps = {
        center: {
          lat: 22.28308696960911, 
          lng: 114.1365613399597 
        },
        zoom: 11
      };

    const hkuRange = {
        south: 22.28144132515009,
        west: 114.13234441565417,
        north: 22.28500621472856,   
        east: 114.14128534146779
      };
    const navigate = useNavigate();
    return (
        <div id="mapComponent">
          <APIProvider apiKey={"AIzaSyAb8jizeH2kLb4HNIKzo-ZgNlfEhsFsP8Q"}>
            <Map 
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              options={{
                  restriction: {
                    latLngBounds: hkuRange,
                    strictBounds: true,
                  },
            }}>
              {markers.map(item=>(<Marker position={{lat: item.lat, lng: item.lng}} onClick={() => navigate('/building/' + item.id)}/>))}
            </Map>
          </APIProvider>
            <a>markers[0].name</a>
        </div>
    );
}

export default GoogleMap;