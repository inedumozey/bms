import React , { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll'
import Brand from './Brand';
import InvoiceConfig from './InvoiceConfig';
import POSConfig from './POSConfig';
import Contacts from './Contacts';
import Charts from './Charts';

function Profile() {
    const [ position, setPostion ] = useState({x: 0, y: 0});
    const [ display, setDisplay ] = useState(false);

    const [ links, setLinks ] = useState(['Brand', 'Contacts', 'InvoiceConfig', 'POSConfig']);
    const [ active, setActive ] = useState(false)
    const [ select, setSelect ] = useState('Brand')

    function closeCmd(e){
        setTimeout(()=>{
            setDisplay(false);
            setPostion({
                x: 0,
                y: 0,
            });
        }, 0)
    }

    const localState={
        position,
        setPostion,
        display,
        setDisplay
    }

    return (
        <div
            onClick={closeCmd}
            className="profile wrap scrolX scrolY">
            <Brand localState={localState}/>
            <Contacts />
            <InvoiceConfig />
            <POSConfig />
            <Charts />
        </div>
    );
}

export default Profile;