import React , {useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';

function DashboardSidebar() {
    const state = useSelector(state=>state);
    const { activeDocument } = state; 
    const globalState = useContext(GlobalState)
 
    const [sidebarItem] = useState([ 'pos', 'sales', 'invoices', 'inventory', 'analysis', 'profile']);
   
    function openItem(item, activeDoc){
        if(activeDoc.protected){
            if(item === 'pos' || item === 'invoices'){
                //push to item tabs if not already there
                globalState.setItemTabs({item, activeDoc})
                // make active
                globalState.setActiveItem({item, activeDoc})
            }else if(item === activeDoc.active){
                //push to item tabs if not already there
                globalState.setItemTabs({item, activeDoc})
                // make active
                globalState.setActiveItem({item, activeDoc})
            }else{
                //authenticate
                globalState.setAuth({
                    doc: activeDoc,
                    item,
                    state: true,
                    for: 'itemTab',
                })
            }
        }else{
            //push to item tabs if not already there
            globalState.setItemTabs({item, activeDoc})
            // make active
            globalState.setActiveItem({item, activeDoc})
        }
    }

    return (
        <div className='dashboardSidebar'>
            <div className="sibebarTop">Task Bar</div>
            <div className="sibebarBody">
                {
                    sidebarItem && sidebarItem.map((item, i)=>{
                        return (
                            <div
                                key={i}
                                onClick={()=>openItem(item.toLowerCase(), activeDocument)}
                                className={activeDocument.active===item ? "item active" : "item"}
                            >
                                {item.toUpperCase()}
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    );
}

export default DashboardSidebar;