import React from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const ExpansionList = ({ item, type }) => {
    const [show, setShow] = React.useState(false);
    return (<div>
        {item.entities.length > 0 && <div 
            className='collection'
            onClick={() => setShow(!show)}
        >
            <h3
                style={{display: 'inline'}}
            >{item.name}</h3>
            {!show && <span
                className='expand'
                onClick={() => setShow(true)}
            ><KeyboardArrowRightIcon/></span>}
            {show && <span
                className='expand'
                onClick={() => setShow(false)}
            ><KeyboardArrowDownIcon/></span>}
        </div>}
        {item.entities.length > 0  && <div className='itemList'>
            {show && item.entities.map(
                entity => <ListItem entity={entity} type={type}></ListItem>
            )}
        </div>}
    </div>)
}

const ListItem = ({entity, type}) => {
    const navigate = useNavigate();
    if (type === 'facility') {
        return (
            <div 
                className='item'
                onClick={() => navigate(entity.link)}
            >
                <span>{entity.name}</span>
                <span
                    className='expand'
                >{<KeyboardArrowRightIcon/>}</span>
            </div>
        )
    } else if (type === 'class') {
        return (
            <div 
                className='item'
                onClick={() => navigate(entity.link)}
            >
                <span>{entity.name}</span>
                <span
                    className='expand'
                >{<KeyboardArrowRightIcon/>}</span>
            </div>
        )
    }
    
}


export default ExpansionList