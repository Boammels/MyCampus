import React from "react";
import axios from "axios";

import "../styles/main.css";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import userPic from '../icons/profile.png'
import { useNavigate, useRouteLoaderData } from "react-router-dom";



const SideBar = ({studentId, setId, name, setName}) => {
    console.log(name);
    const navigate = useNavigate();
    const [display, setDisplay] = React.useState(false);
    const [left, setLeft] = React.useState('20px');
    //console.log(studentId)
    const requestLogin = async () => {
        axios.post('http://127.0.0.1:5000/login/', { 'studentId': prompt("Please enter your student ID", studentId) })
            .then(({ data }) => {
                console.log(data);
                if(!data.result) {
                    alert("student ID invalid")
                } else {
                    setId(data.studentId);
                    setName(data.name);
                }
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    

    return (
        <div>
            {display && <div className='blackback' ></div>}
            
            <div
                className="barOpen"
                style = {{ left: left }}
                onClick={() => {
                    if (display === false) {
                        setDisplay(true);
                        setLeft('71%');
                    } else {
                        setDisplay(false);
                        setLeft('20px');
                    }
                }}>
                    {display && <MenuOpenOutlinedIcon className='menuIcon'/>}
                    {!display && <MenuOutlinedIcon className='menuIcon'/>}
            </div>
            {display && <div className='SideBar'>
                <div className="userSec">
                    <img src={userPic} className='profilePhoto'/>
                    {(studentId === '' || studentId == null) && <p
                        onClick = {() => {
                                requestLogin();
                        }}
                        className='userNamesec'
                    >
                        <div className='userName'>Login</div>
                        <div className='loginIcon'><LoginOutlinedIcon /></div>
                    </p>}
                    {studentId !== '' && studentId !== null && <p
                        className='userNamesec'
                        onClick = {() => {
                            let respond = window.confirm("Are you sure to log out?");
                            if (respond) {
                                setId('');
                                setName("");
                            }
                        }}
                    >
                        <div className='userName'>{name}</div>
                        <div
                            className='loginIcon'
                            
                        ><LogoutIcon /></div>
                    </p>}
                </div>
                <div className='menu'>
                    <div className="timetableSelection">
                        <span onClick={() => {
                            if (studentId === '') {
                                alert("you have to login first");
                            } else {
                                navigate('/timetable/'+studentId);
                            }
                        }}>
                            <EventNoteOutlinedIcon className='listIcon'/> Timetable
                        </span>
                    </div>
                    <div className="friendSelection">
                        <span onClick={() => navigate('/friends')}>
                            <PeopleAltOutlinedIcon className='listIcon'/> Friends
                        </span>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default SideBar;