import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {GlobalState} from '../App.js';

function UserTab({documentTabs}) {

    const navigate = useNavigate()
    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument } = state;

    function setActive(tab){
        globalState.setActiveDocument(tab);
        navigate('/workspace/activeDocument')
    }
    function removeTab(tab){
        globalState.removeFromTab(tab, documentTabs);
    }

    return (
        <div className="userTab">
            <div className="logo">
                <img src={activeDocument.logo ? activeDocument.logo : require('../assets/folder.png').default} alt="logo" />
            </div>
            <div className="tabList scrolX-small">
            {
                documentTabs.map((tab, i)=>{
                    return (
                        <span key={i} className={activeDocument.name === tab ? 'tab active' : 'tab'}>
                            <div
                                onClick={()=>setActive(tab)}
                                title={tab} 
                                className="tab text-mid ellipsis tabText">
                                {tab}
                            </div>
                            <div
                                onClick={()=>removeTab(tab)}
                                title={"Remove " + tab} 
                                className={activeDocument.name === tab ? 'remove active' : 'remove'}><div></div></div>
                        </span>
                    )
                })
            }
            </div>
            <div className="misc">
               Misc
            </div>
            
        </div>
    );
}

export default UserTab;