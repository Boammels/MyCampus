import React from "react";

import "./component.css";

import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const facility_types = ['Canteen', 'Classroom', 'Retail', 'Printer', 'Library', 'Water refill']

    const [input, setInput] = React.useState('');

    const [display, setDisplay] = React.useState(false);
    const [type, setType] = React.useState('all');
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
                <p>Enter Building Name:</p>
                <input type='text' className="textInput" value={input} onChange={e => {
                    setInput(e.target.value);
                }} />
                <p>Please select a facility type</p>
                <div className="container">
                    {facility_types.map((item, index)=>{
                        return (
                            <div className="item">
                                <input
                                    type='checkbox'
                                    className='checkbox'
                                    checked={type===item}
                                    style={{ display:'inline' }}
                                    onChange={() => {
                                        if (type !== item) {
                                            setType(item)
                                        } else {
                                            setType('all')
                                        }
                                        console.log(type);
                                    }}
                                />
                                <d>{item}</d>
                            </div>
                        )
                    })}
                </div>
                <button
                    className="submit"
                    onClick={() => {
                        console.log(input);
                        console.log(type);
                    }}
                >Submit</button>
                <button
                    className="cancel"
                    onClick={() => {
                        setDisplay(false);
                        setInput('');
                        setType('all');
                    }}
                >Cancel</button>
            </div>}
        </div>
    )
}

export default Search;