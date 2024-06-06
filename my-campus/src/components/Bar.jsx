import React from "react";

import "../styles/main.css";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import userPic from '../icons/profile.png'
import { useNavigate } from "react-router-dom";

const SideBar = ({token, setId}) => {

    const navigate = useNavigate();
    const [display, setDisplay] = React.useState(false);
    const [left, setLeft] = React.useState('20px');

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
                    {token === '' && <p
                        onClick = {() => {

                            setId('3036195772');
                        }}
                        className='userNamesec'
                    >
                        <div className='userName'>Login</div>
                        <div className='loginIcon'><LoginOutlinedIcon /></div>
                    </p>}
                    {token !== '' && <p
                        className='userNamesec'
                    >
                        <div className='userName'>Sihang</div>
                        <div
                            className='loginIcon'
                            onClick = {() => {

                                setId('');
                            }}
                        ><LogoutIcon /></div>
                    </p>}
                </div>
                <div className='menu'>
                    <div className="timetableSelection">
                        <span onClick={() => {
                            if (token === '') {
                                alert("you have to login first");
                            } else {
                                navigate('/timetable/'+token);
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