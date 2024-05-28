import React from "react";
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import "../styles/main.css";

const Search = ({setMarkers}) => {
    const facility_types = ['Canteen', 'Classroom', 'Retail', 'Printer', 'Library', 'Water Station']

    const [input, setInput] = React.useState('');

    const [display, setDisplay] = React.useState(false);
    const [type, setType] = React.useState('none');

    const searchBuilding = async () => {
        if (type === 'none' && input === '') {
            alert("Please input filters");
            return;
        }
        axios.get('http://127.0.0.1:5000/building/search/',
            { 
              params : {
                'facilityType': type,
                'buildingName': input
              }
            }).then(({ data }) => {
                console.log(data);
                setMarkers(data);
                setDisplay(false);
                setInput('');
                setType('none');
            }
          )
          .catch((err) => {
            alert(err.message);
          });
    }
    return (
        <div>
            {display && <div className='blackback2' ></div>}
            <div
                className="searchOpen"
                onClick={() => {
                    if (display === false) {
                        setDisplay(true);
                    } else {
                        setDisplay(false);
                    }
                }}><SearchIcon className="menuIcon"/>
            </div>
            {display && <div className='SearchPanel'>
                <button
                    className="cancel"
                    onClick={() => {
                        setDisplay(false);
                        setInput('');
                    }}
                ><CloseIcon /></button>
                <p>Enter Building Name:</p>
                <input type='text' className="textInput" value={input} onChange={e => {
                    setInput(e.target.value);
                }} />
                <p>Please select a facility type</p>
                <div className="container">
                    {facility_types.map((item)=>{
                        return (
                            <div className="facItem">
                                <input
                                    type='checkbox'
                                    className='checkbox'
                                    checked={type===item}
                                    style={{ display:'inline' }}
                                    onChange={() => {
                                        if (type !== item) {
                                            setType(item)
                                        } else {
                                            setType('none')
                                        }
                                    }}
                                />
                                <d>{item}</d>
                            </div>
                        )
                    })}
                </div>
                <div className="buttonContainer">
                    <button
                        className="submit"
                        onClick={() => {
                            console.log(input);
                            console.log(type);
                            searchBuilding();
                        }}
                    >Submit</button>
                </div>
            </div>}
        </div>
    )
}

export default Search;
