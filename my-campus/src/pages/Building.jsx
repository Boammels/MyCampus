import React from "react";
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import ExpansionList from "../components/ExpansionList";
import buildingPic from "../icons/office-building.png"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import "../styles/info.css"


const Building = ()=>{
    const id = useParams().buildingId;
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('none');
    const [facilities, setFacilities] = React.useState({}); 
    //const load = 1;
    const searchBuilding = async () => {
        axios.get('http://127.0.0.1:5000/building/details/',
            { 
              params : {
                'buildingId': id
              }
            }).then(({ data }) => {
                console.log(data);
                if (data == null) {
                    alert("404: invalid building ID");
                    navigate(-1);
                }
                setSuccess(true);
                setName(data.name);
                setFacilities(data.facilities);
                setDescription(data.description);
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }
    React.useEffect(() => searchBuilding, [id])

    return (<> 
        
        <div
            className="back"
            onClick={() => navigate(-1)}
        ><KeyboardBackspaceIcon className="backIcon"/></div>
        <div
            className="home"
            onClick={() => navigate('/')}
        ><HomeIcon className="homeIcon"/></div>
        <div
            className="location"
            onClick={() => navigate('/map/'+id)}
        ><LocationOnOutlinedIcon className="locIcon"/></div>
        <div className='majorArea'>
            <div className="icon-container">
                <img className="icon" src={buildingPic} alt="building icon"/>
            </div>
            {success && <div className="info">
                <h1>{name}</h1>
                <div className="list">
                    {
                        facilities.map(item => <ExpansionList item={item} type={'facility'}></ExpansionList>)
                    }
                </div>
                <div className="whiteSpace"></div>
                {description !== 'none' && <p className='description'>{description}</p>}
            </div>}
        </div>
    </>)
}


export default Building;