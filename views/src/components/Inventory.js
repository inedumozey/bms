import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import AddInventory from './AddInventory';
import ViewInventory from './ViewInventory';

function Inventory({}) {
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const initEditingData = {
        id: '',
        item: '',
        category: '',
        price: '',
        description: '',
    }
    const [ editing, setEditing ] = useState(false);
    const [ editingData, setEditingData ] = useState(initEditingData);
    const [ menu ] = useState(["View", 'Add']);
    const [ active, setActive ] = useState('View');

    function handleActive(menu){
        setActive(menu);
        if(menu==='View'){
            setEditingData(initEditingData);
            setEditing(false)
        }
    }

    return (
        <div className="inventory">
            <div className="menuWrapper scrolX-small">
                <div className="menuList">
                    {
                        menu.map((menu, i)=>{
                            return (
                                <div
                                    key={i}
                                    onClick={()=>handleActive(menu)}
                                    className={active===menu ? 'menu viewAdd active' : 'menu viewAdd '}
                                >
                                    {menu}
                                </div>
                            )
                        })
                    }
                </div>

                {
                    activeDocument && activeDocument.inventory.length > 0 && active !== 'Add' ? 
                    (
                        <>
                            <div className="menuList">
                                <label htmlFor="">Filter By: </label>
                                <select
                                    name="documentType"
                                >
                                    <option value="All">All</option>
                                    <option value="Date">Date</option>
                                    <option value="Item">Item</option>
                                    <option value="Category">Category</option>
                                </select>
                            </div>
                        </>
                    ): ''
                }
            </div>
            
            <div className="inventoryBody scrolX scrolY">
                {
                    (function(){
                        if(active === 'View'){
                            return <ViewInventory
                                setEditing={setEditing}
                                setEditingData={setEditingData} 
                                editingData={editingData} 
                                setActive={setActive}
                            />
                        }else if(active === 'Add'){
                            return <AddInventory
                                editingData={editingData}
                                editing={editing}
                                setEditing={setEditing}
                                setActive={setActive}
                                setEditingData={setEditingData}
                                initEditingData={initEditingData}
                            />
                        }
                    }())
                }
            </div>
        </div>
    );
}

export default Inventory;