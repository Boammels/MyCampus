import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import ExpansionList from "../components/ExpansionList";
import deskPic from "../icons/office-desk.png"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import "../styles/info.css"


const Reservation = ()=>{
    const id = useParams().reservationId;
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [data, setData] = React.useState('');
    //const [name, setName] = React.useState('');
    //const [description, setDescription] = React.useState('none');
    //const [facilities, setFacilities] = React.useState({}); 
    //const load = 1;
    const reservationDetails = async () => {
        axios.get('http://127.0.0.1:5000/reservation/details/',
            { 
              params : {
                'reservationId': id
              }
            }).then(({ data }) => {
                console.log(data);
                if (data == null) {
                    alert("404: invalid reservation ID");
                    navigate(-1);
                }
                setSuccess(true);
                setData(data);
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    React.useEffect(() => reservationDetails, [id])

    return (<>
        <div
            className="back"
            onClick={() => navigate(-1)}
        ><KeyboardBackspaceIcon className="backIcon"/></div>
        <div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        <div className='majorArea'>
            <div className="icon-container">
                <img className="icon" src={deskPic} alt="building icon"/>
            </div>
            {success && <div className="info">
                <h1>Library Reservation</h1>
                
                
                <p
                    className='details'
                    onClick={()=> navigate('/facility/'+data.facility)}
                >
                    <MeetingRoomOutlinedIcon className='inlineIcon'/> {data.room} @ {data.facility_name}
                </p>
                <p
                    className='details'
                    onClick={()=> navigate('/building/'+data.buildingId)}
                >
                    <LocationCityIcon className='inlineIcon'/> {data.building}
                </p>
                
                <p className='details'>
                    <AccessTimeOutlinedIcon className='inlineIcon'/> {data.time}
                </p>
               

                

            </div>}
        </div>
    </>)
}


export default Reservation;