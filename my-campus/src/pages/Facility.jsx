import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpansionList from "../components/ExpansionList";
import faucetPic from "../icons/faucet.png"
import lecturePic from "../icons/classroom.png"
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
    const [crowdness, setCrowdness] = React.useState(0);
    const searchFacility = async () => {
        axios.get('http://127.0.0.1:5000/facility/details/',
            { 
              params : {
                'facilityId': id
              }
            }).then(({ data }) => {
                console.log(data);
                if (data == null) {
                    alert("404: invalid class ID");
                    navigate(-1);
                }
                setSuccess(true);
                setData(data);
                setType(data.facType);
                setCrowdness(data.crowdness)
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    React.useEffect(() => searchFacility, [id, type])
    const getCrowdness = async () => {
        axios.get('http://127.0.0.1:5000/crowdness',
            {}).then(({ data }) => {
                console.log(data);
                if (data == null) {
                    alert("404: invalid class ID");
                    navigate(-1);
                }
                setCrowdness(data.crowdness)
            }
            )
            .catch((err) => {
                alert(err.message);
                navigate(-1);
            });
    }
    React.useEffect(() => {
        const intervalCall = setInterval(getCrowdness, 10000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    }, []);

    return (<> 
        <div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        <div
            className="back"
            onClick={() => navigate(-1)}
        ><KeyboardBackspaceIcon className="backIcon"/></div>
        <div className='majorArea'>
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
                {type === 'Canteen' && <p
                    className='details'
                >
                    {crowdness > 0 ? <PersonIcon className='inlineIcon' /> : <PersonOutlineOutlinedIcon className='inlineIcon'/>}
                    {crowdness > 2 ? <PersonIcon className='inlineIcon' /> : <PersonOutlineOutlinedIcon className='inlineIcon'/>}
                    {crowdness > 4 ? <PersonIcon className='inlineIcon' /> : <PersonOutlineOutlinedIcon className='inlineIcon'/>}
                    {crowdness > 6 ? <PersonIcon className='inlineIcon' /> : <PersonOutlineOutlinedIcon className='inlineIcon'/>}
                    {crowdness > 8 ? <PersonIcon className='inlineIcon' /> : <PersonOutlineOutlinedIcon className='inlineIcon'/>}
                </p>}
                <p
                    onClick={() => navigate('/map/'+data.buildingId)}
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
                
                {data.description !== 'none' && <p className='description'>{data.description}</p>}
                {type === "Classroom" && <p className="section">Scheduled courses</p>}
                {type === "Classroom" && data.count < 1 && <div className='inform'>
                    <span>No classes are assigned to this classroom.</span>
                </div>}
                {type === "Classroom" && <div className="list">
                    {
                        data.classes.map(item => <ExpansionList item={item} type={'class'}></ExpansionList>)
                    }
                </div>}
                {type === "Classroom" && data.imageLink === 'none' && <div className="whiteSpace"></div>}
                {type === 'Library' && <div className="buttonArea">
                    <button className='outlinkButton' id='booking'><BookmarkAddedOutlinedIcon className="outlinkIcon" /> Book a space</button>
                </div>}
                {data.imageLink !== 'none' && <div>
                    <p className="section">Photo</p>
                    <img src={data.imageLink} className="picture"/>
                </div>}
            </div>}
        </div>
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