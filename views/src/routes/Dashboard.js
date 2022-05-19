import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardMain from '../components/DashboardMain';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTabs from '../components/DashboardTabs';
import Search from '../components/Search';

function Dashboard({}) {
    const navigate = useNavigate()
    const [ shrink, setShrink ] = useState(true);
    const [ ready, setReady ] = useState(false);
    
    const state = useSelector(state=>state)
    const { documentTabs} = state;

    new Promise((resolve, rej)=>{
        setTimeout(()=>{
            resolve(state)
        }, 1000)
        
    }).then(result=>{
        if(result !== undefined){
            setReady(true)
        }
    })


    function shrinkSidebar(){
        setShrink(!shrink)
    }
    
    setTimeout(()=>{
        if(documentTabs.length < 1){
            navigate('/workspace')
        }
    }, 0)


    return (
        <div className='dashbaord'>
            {
                ready ?
                (
                    <>
                        <div className={shrink ? "leftFrame shrink" : 'leftFrame'}>
                            <div className="topFrame">
                                
                                <div className="left scrolX-small">
                                    <DashboardTabs />
                                </div>

                                <div
                                    style={{color:'#fff'}}
                                    className="center"
                                >
                                    <Search />
                                </div>

                                <div onClick={shrinkSidebar} className="right">
                                    {
                                        shrink ? <div className="expandSidebar"></div> : <div className="shrinkSidebar"></div>
                                    }
                                </div>
                            </div>

                            <div className="bottomFrame">
                                <DashboardMain />
                            </div>
                        </div> 

                        <div className={shrink ? "rightFrame shrink" : "rightFrame"}>
                            <DashboardSidebar />
                        </div>     
                    </>
                ):
                (
                    <div className="waiting">
                        <div className="waitingImg">
                            <img src={require('../assets/loading-spinner.gif').default} alt="" />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Dashboard;