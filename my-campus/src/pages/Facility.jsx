import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
//import ExpansionList from "../components/ExpansionList";
import faucetPic from "../icons/faucet.png"
import lecturePic from "../icons/lecture.png"
import libraryPic from "../icons/library.png"
import restaurantPic from "../icons/restaurant.png"
import shopPic from "../icons/shop.png"
import printerPic from "../icons/printer.png"

import "../styles/info.css"


const Facility = ()=>{
    const id = useParams().facilityId;
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [data, setData] = React.useState('');
    const [type, setType] = React.useState('none');
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
                setData(data);
                setType(data.facType);
            }
          )
          .catch((err) => {
            alert(err.message);
          });
    }
    React.useEffect(() => searchFacility, [id, type])

    return (<> 
        <div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        {type === "Printer" && <div className="icon-container">
            <img className="icon" src={printerPic} alt="building icon"/>
        </div>}
        {type === "Canteen" && <div className="icon-container">
            <img className="icon" src={restaurantPic} alt="building icon"/>
        </div>}
        {type === "Water Station" && <div className="icon-container">
            <img className="icon" src={faucetPic} alt="building icon"/>
        </div>}
        {type === "Retail" && <div className="icon-container">
            <img className="icon" src={shopPic} alt="building icon"/>
        </div>}
        {type === "Library" && <div className="icon-container">
            <img className="icon" src={libraryPic} alt="building icon"/>
        </div>}
        {type === "Classroom" && <div className="icon-container">
            <img className="icon" src={lecturePic} alt="building icon"/>
        </div>}
        {success && <div className="info">
            <h1>{data.name}</h1>
            <p
                onClick={() => navigate('/'+data.buildingId)}
                className='details'
            >
                <LocationOnOutlinedIcon className='inlineIcon'/> {data.position}
            </p>
            {data.openingHours !== 'none' && <p
                className='details'
            >
                <AccessTimeOutlinedIcon className='inlineIcon'/> {data.openingHours}
            </p>}
            {data.linke !== 'none' && <p
                className='details'
            >
                <OpenInNewOutlinedIcon className='inlineIcon'/> <a href={data.linke}>Visit website for more info.</a>
            </p>}
            {data.description !== 'none' && <p
                className='details'
            >
                <p className="description">{data.description}</p>
            </p>}
            {data.imageLink !== 'none' && 
                <div>
                    <h2>Photo</h2>
                    <img src={data.imageLink} className="picture"/>
                </div>}
        </div>}
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