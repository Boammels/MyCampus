import React from 'react';
import axios from 'axios';

import FriendsList from '../components/FriendsList.jsx'


import "../styles/main.css"
import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import relationshipPic from "../icons/relationship.png"


const Friends = ({ token }) => {

    const navigate = useNavigate()
    const [input, setInput] = React.useState('');
    const [listType, setListType] = React.useState('Watch');
    const [listSearch, setListSearch] = React.useState([])
    const [listWatchShare, setListWatchShare] = React.useState([])

    const getSearch = async () => {
        axios.get('http://127.0.0.1:5000//search/student/',
            { 
              params : {
                'token': token,
                'searchContent': input
              }
            }).then(({ data }) => {
                console.log(data);
                setListSearch(data.res)
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }

    const getList = async (type) => {
        axios.get('http://127.0.0.1:5000/friends/'+type+'/',
            { 
              params : {
                'token': token
              }
            }).then(({ data }) => {
                console.log(data);
                setListWatchShare(data.list);
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    React.useEffect(() => {getList(listType)}, [token])

    const reload = async () => {
        getSearch();
        getList(listType);
    }

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
                <img className="icon" src={relationshipPic} alt="building icon"/>
            </div>
            <div className="info">
                <h1>Friends</h1>
            </div>
            <div className="inputArea">
                <input type='text' className="friendInput" value={input} onChange={e => {
                    setInput(e.target.value);
                }} />
                <button className='searchFriend' onClick={() => {
                    if (input != '')
                        getSearch()
                }}>Search</button>
            </div>
            <FriendsList list={listSearch} func={reload} token={token}/>
            <p className="sectionTop">
                <b>{listType} List</b>
                <i> </i>
                <u onClick={() => {
                    var so = ''
                    if (listType == 'Watch') {
                        setListType('Share')
                        so='Share'
                    } else {
                        setListType('Watch')
                        so='Watch'
                    }
                    getList(so)
                }}>change</u>
            </p>
            <div className="seperateLine"></div>
            <FriendsList list={listWatchShare} func={reload} token={token}/>
        </div>
    </>)
}

export default Friends;