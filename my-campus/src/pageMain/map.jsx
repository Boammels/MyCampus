import React from "react";

import Map from "google-map-react";

import "./component.css";

const GoogleMap = ({markers}) => {
    console.log(markers)
    const defaultProps = {
        center: {
          lat: 22.284088415140076, 
          lng: 114.13783807148307 
        },
        zoom: 11
      };

    const hkuRange = {
        south: 22.28144132515009,
        west: 114.13234441565417,
        north: 22.28500621472856,   
        east: 114.14128534146779
      };

    return (
        <div id="mapComponent">
            <Map
                bootstrapURLKeys={{ key: "AIzaSyAb8jizeH2kLb4HNIKzo-ZgNlfEhsFsP8Q" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    restriction: {
                      latLngBounds: hkuRange,
                      strictBounds: true,
                    },
                }}
            >
            </Map>
        </div>
    );
}

export default GoogleMap;