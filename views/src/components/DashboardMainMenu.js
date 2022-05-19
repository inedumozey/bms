import React, {useState, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../App';
import { getActiveDashboard } from '../redux/action';

function DashboardMainMenu() {
    const dispatch = useDispatch()
    const state = useSelector(state=>state)
    const globalState = useContext(GlobalState);
    const [ menu ] = useState(["Home", "Import", "Upload"]);
    const { activeDocument, activeDashboard, filteredData } = state;

    function handleActive(menu){
        dispatch(getActiveDashboard(menu))
    }

    function handleExport(){
        const data = filteredData;
        if(activeDocument.active === 'inventory'){
            globalState.exportData({data, filename: 'bms_inventory'})

        }else if(activeDocument.active === 'sales'){
            globalState.exportData({data, filename: 'bms_sales'})
        }
    }

    return (
        <>
            <div className="dashboardMainMenu">
                {activeDocument && <div className="currency">Currency: <span>{activeDocument.currency}</span> </div>}
                <div className="dashboardMainMenuList">
                    {
                        menu.map((menu, i)=>{
                            return (
                                <div
                                    key={i}
                                    title={menu}
                                    onClick={()=>handleActive(menu)}
                                    className={activeDashboard === menu ? "menu active" : "menu"}>
                                    {menu}
                                </div>
                            )
                        })
                    }

                    {
                        (function(){
                            if(activeDocument.active === 'sales' && activeDashboard === 'Home'){
                                return (
                                    <div
                                        title={"Exporting " + filteredData.length + (filteredData.length > 1 ? " items" : ' item')}
                                        onClick={()=>handleExport()}
                                        className="menu">
                                            Export Sales
                                    </div>
                                )

                            }else  if(activeDocument.active === 'inventory' && activeDashboard === 'Home'){
                                return (
                                    <div
                                    title={filteredData ?( "Exporting " + filteredData.length + (filteredData.length > 1 ? " items" : 'item')) : ''}
                                        onClick={()=>handleExport()}
                                        className="menu">
                                            Export Inventory
                                    </div>
                                )

                            }else{
                                return ""
                            }
                        }())
                    }
                </div>
            </div>
        </>
    );
}

export default DashboardMainMenu;
