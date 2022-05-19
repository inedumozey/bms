import React, { useContext } from 'react';
import { GlobalState } from '../App';

function Footer() {
    const globalState = useContext(GlobalState)

    return (
        <div className="footer">
            <div className="copyright text-small">
                &copy; 2022 {
                    (new Date().getFullYear() > '2022' ? "-" + new Date().getFullYear() : '')
                } P2Z
            </div>

            <div className="contact">
                <a
                    href='/www.google.com'
                    target='_blank'
                    style={{padding: '1px',}}
                    className="icon small round">
                    <img src={require('../assets/facebook.png').default} alt="" />
                </a>
                <a
                    href='/www.google.com'
                    style={{padding: '1px',}}
                    className="icon small round">
                    <img src={require('../assets/twitter.png').default} alt="" />
                </a>
                <a
                    href='/www.google.com'
                    style={{padding: '1px',}}
                    className="icon small round">
                    <img src={require('../assets/whatsapp.png').default} alt="" />
                </a>
                <a
                    href='/www.google.com'
                    style={{padding: '1px',}}
                    className="icon small round">
                    <img src={require('../assets/instagram.png').default} alt="" />
                </a>
            </div>

            <div className="version text-small">
                BMS v{globalState.version}
            </div>
        </div>
    )
}

export default Footer;