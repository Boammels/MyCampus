import React from "react";
import axios from 'axios';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import ExpansionList from "../components/ExpansionList";
import timetablePic from "../icons/calendar.png"

import { useNavigate, useParams } from 'react-router-dom';

import "../styles/info.css"
const Timetable = ( {token} ) => {
    const studentId = useParams().studentId
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [name, setName] = React.useState('');
    const [timetable, setTimetable] = React.useState('none');
    //const load = 1;
    console.log(studentId)
    const searchTimetable = async () => {
        axios.get('http://127.0.0.1:5000/timetable/',
            { 
              params : {
                'token': token,
                'studentId': studentId
              }
            }).then(({ data }) => {
                console.log(data);
                setSuccess(true);
                    setName(data.name);
                    setTimetable(data.timetable);
                
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    React.useEffect(() => searchTimetable, [studentId])
    return (<>
        <div
            className="back"
            onClick={() => navigate(-1)}
        ><KeyboardBackspaceIcon className="backIcon"/></div>
        <div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        {success && <div className='majorArea'>
            <div className="icon-container">
                <img className="icon" src={timetablePic} alt="building icon"/>
            </div>
            {success && <div className="info">
                {token !== studentId && <h1>{name}'s Timetable</h1>}
                {token === studentId && <h1>Your Timetable</h1>}
            </div>}
            <div className="whiteSpace"></div>
            {timetable && <div className="list">
                {
                    timetable.map(item => <ExpansionList item={item} type={'timetable'}></ExpansionList>)
                }
            </div>}
            {!timetable && <p>Sorry you do not have access</p>}
        </div>}
    </>

    )
}

export default Timetable;