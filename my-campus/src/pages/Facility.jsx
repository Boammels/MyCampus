import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
//import HomeIcon from '@mui/icons-material/Home';

//import ExpansionList from "../components/ExpansionList";
//import buildingPic from "../icons/office-building.png"

import "../styles/info.css"


const Facility = ()=>{
    const id = useParams().facilityId;
    //const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [name, setName] = React.useState('');
    //const [facilities, setFacilities] = React.useState({}); 
    //const load = 1;
    const searchFacility = async () => {
        axios.get('http://127.0.0.1:5000/facility/details/',
            { 
              params : {
                'facilityId': id
              }
            }).then(({ data }) => {
                console.log(data);
                setSuccess(true);
                setName(data.name)
            }
          )
          .catch((err) => {
            alert(err.message);
          });
    }
    React.useEffect(() => searchFacility, [id])

    return (<> 
        {success && <div>{name}</div>}
    </>)
}

/*
<div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        <div className="icon-container">
            <img className="icon" src={buildingPic} alt="building icon"/>
        </div>
        {success && <div className="info">
            <h1>{name}</h1>
            <div className="list">
                {
                    facilities.map(item => <ExpansionList item={item}></ExpansionList>)
                }
            </div>
        </div>}*/


export default Facility;