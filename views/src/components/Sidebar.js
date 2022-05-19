import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({}) {
    const navigate = useNavigate()
    const location = useLocation()

    const [ url, setUrl ] = useState('/')
    function homeRoute(){
        setUrl('/');
        navigate('/')
    }
    function workspaceRoute(){
        setUrl('/workspace');
        navigate('/workspace')
    }
    function settingRoute(){
        setUrl('/setting');
        navigate('/setting')
    }
    
    useEffect(()=>{
        setUrl(location.pathname)
    }, [url])

    return (
        <div className='sidebar'>
            <div className="side-menu">
               <div className="item">
                    <div
                        onClick={homeRoute}
                        id={url=='/' ? 'focusRoute' : ''}
                        className="icon mid enlargeRoute round">
                        <img src={require('../assets/home.png').default} alt="" />
                    </div>
                    
                    <div
                        onClick={workspaceRoute}
                        id={url=='/workspace' ? 'focusRoute' : ''}
                        style={{background: '#fff'}} className="icon mid round enlargeRoute">
                        <img src={require('../assets/data.png').default} alt="" />
                    </div>

                    <div
                        onClick={settingRoute}
                        id={url=='/setting' ? 'focusRoute' : ''}
                        className="icon mid enlargeRoute round">
                        <img src={require('../assets/setting2.png').default} alt="" />
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Sidebar;