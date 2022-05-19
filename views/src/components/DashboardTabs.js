import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';

function DashboardTabs({}) {
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const globalState = useContext(GlobalState);

    function setActive(item, activeDoc){
        // make active
        globalState.setActiveItem({item, activeDoc})
    }

    function removeTab(e, item, activeDoc, tabs){
        if(e.target === e.currentTarget){
            globalState.removeItemTabs({item, activeDoc, tabs})
        }
    }

    return (
        <>
            {
                activeDocument && activeDocument.tabs && activeDocument.tabs.map((tab, i)=>{
                    return (
                        <span key={i} className={tab === activeDocument.active ? 'dashboardTab active' : 'dashboardTab'}>
                            <div
                                onClick={()=>setActive(tab.toLowerCase(), activeDocument)}
                                title={tab} 
                                className="text-mid ellipsis dashboardTabText">
                                {tab}
                            </div>
                            <div
                                onClick={(e)=>removeTab(e, tab.toLowerCase(), activeDocument, activeDocument.tabs)}
                                className="dashboardRemoveTabBtn">
                                <div
                                    onClick={(e)=>removeTab(e, tab.toLowerCase(), activeDocument, activeDocument.tabs)}
                                >
                                </div>
                            </div>
                        </span>
                    )
                })
            }
        </>
    );
}


export default DashboardTabs;