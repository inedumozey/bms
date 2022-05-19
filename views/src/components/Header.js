import React from 'react';
import HeaderMenu from './HeaderMenu';
import { useDispatch } from 'react-redux';
import { winAction } from '../redux/action';

function Header() {
    const dispatch = useDispatch()
    return (
        <div className='header'>
            <div className="header-wrapper">
                <div className="left">LOGO</div>
                <HeaderMenu />
                <div className="right">
                    <div onClick={()=>dispatch(winAction('minimize'))} className="minimize"><div></div></div>
                    <div onClick={()=>dispatch(winAction('maximize'))} className="maximize"><div></div></div>
                    <div onClick={()=>dispatch(winAction('quit'))} className="quit"><div></div></div>
                </div>
            </div>
            
        </div>
    );
}

export default Header;