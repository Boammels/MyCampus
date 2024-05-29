import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

import lecturePic from "../icons/lecture.png"
import moodlePic from "../icons/education.png"

import "../styles/info.css"


const Class = () => {
    const id = useParams().classId;
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [data, setData] = React.useState('')

    const searchClass = async () => {
        axios.get('http://127.0.0.1:5000/class/details/',
            { 
              params : {
                'classId': id
              }
            }).then(({ data }) => {
                console.log(data);
                if (data == null) {
                    alert("404: invalid class ID");
                    navigate(-1);
                }
                setSuccess(true);
                setData(data)
            }
          )
          .catch((err) => {
            alert(err.message);
          });
    }
    React.useEffect(() => searchClass, [id])


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
            <div className="icon-container">
                <img className="icon" src={lecturePic} alt="building icon"/>
            </div>
            {success && <div className="info">
                <h1>{data.className}</h1>
                <p
                    className='details'
                    onClick={()=> navigate('/facility/'+data.classroomId)}
                >
                    <MeetingRoomOutlinedIcon className='inlineIcon'/> {data.classroom}
                </p>
                <p
                    className='details'
                    onClick={()=> navigate('/building/'+data.buildingId)}
                >
                    <LocationCityIcon className='inlineIcon'/> {data.buildingName}
                </p>
                <p className='details'>
                    <AccessTimeOutlinedIcon className='inlineIcon'/> {data.classTime}
                </p>
                <div className="buttonArea">
                    <button className='moodleButton'><img src={moodlePic} className="moodleIcon" />Open in moodle</button>
                </div>
            </div>}
        </div>
    </>)
}

export default Class