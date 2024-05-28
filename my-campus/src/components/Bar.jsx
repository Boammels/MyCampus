import React from "react";

import "../styles/main.css";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = ({token}) => {

    const [display, setDisplay] = React.useState(false);
    const [left, setLeft] = React.useState('20px');
    const [loggedIn, setLoggedIn] = React.useState(false);
    if (token !== '') {
        setLoggedIn(true);
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
                    <div
                        className='profile'
                    ><PersonIcon style={{font_size: 'large'}} className='profilePhoto'/></div>
                    {!loggedIn && <h2
                        onClick = {() => {setLoggedIn(true);}}
                        className='userNamesec'
                    >
                        <div className='userName'>Login</div>
                        <div className='loginIcon'><LoginOutlinedIcon /></div>
                    </h2>}
                    {loggedIn && <h2
                        className='userNamesec'
                    >
                        <div className='userName'>Sihang</div>
                        <div
                            className='loginIcon'
                            onClick = {() => {setLoggedIn(false);}}
                        ><LogoutIcon /></div>
                    </h2>}
                </div>
                <div className='menu'>
                    <li className="timetableSelection">
                        <a href="/timetable">Timetable</a>
                    </li>
                    <li className="friendSelection">
                        <a href="/friends">Friends</a>
                    </li>
                </div>
            </div>}
        </div>
    )
}

export default SideBar;