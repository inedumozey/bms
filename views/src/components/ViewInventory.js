import React, {useContext, useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GlobalState } from '../App';

function ViewInventory({setEditingData, setEditing, setActive }) {
   
    const state = useSelector(state=>state);
    const globalState = useContext(GlobalState);
    const { activeDocument, filteredData } = state;
    const inventoryKeys = activeDocument.inventory && activeDocument.inventory.length > 0 && Object.keys(activeDocument.inventory[0]);

    function deleteInventory(id){
        globalState.setWarnerModal({
            state: true,
            data: { docName: activeDocument.name, id},
            for: 'deleteInventory',
            text: 'Are you sure you want to parmanently delete this row?'
        })
    }

    function clearInventory(){
        globalState.setWarnerModal({
            state: true,
            data: activeDocument.name,
            for: 'clearInventory',
            text: 'Are you sure you want to parmanently clear all'
        })
    }

    function openEdit(data){
        setActive('Add');
        setEditing(true);
        setEditingData(data)
    }

    return (
        <div className='view'>

            <div className="viewTable">

                {
                    filteredData ?
                    (
                        
                        filteredData.length > 0 ?
                        (
                            <table>
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        {
                                            inventoryKeys && inventoryKeys.map((keys, key)=>{
                                                return <th key={key}>{keys.toUpperCase()}</th>
                                            })
                                        }
                                        <th>*</th>
                                        <th 
                                            onClick={clearInventory}
                                            style={{
                                                background: 'red',
                                                cursor: 'pointer'
                                            }}
                                        >CLEAR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredData.map((inventory, key)=>{
                                            return (
                                                <tr
                                                    title={inventory.item}
                                                    key={key}>
                                                    <td>{key+1}</td>
                                                    <td>{inventory.id}</td>
                                                    <td>{moment(inventory.createdAt).calendar()}</td>
                                                    <td>{inventory.updatedAt ? moment(inventory.updatedAt).calendar() : inventory.updatedAt}</td>
                                                    <td>{inventory.item}</td>
                                                    <td>{inventory.price}</td>
                                                    <td>{inventory.description}</td>
                                                    <td>{inventory.category}</td>
                                                    <td>{inventory.currency}</td>
                                                    <td
                                                        onClick={()=>openEdit(inventory)}
                                                        title={"Edit " + inventory.item}
                                                        className='tableItemEdit'> EDIT
                                                    </td>
                                                    <td
                                                        title={"Remove " + inventory.item}
                                                        onClick={()=>deleteInventory(inventory.id)}
                                                        className="tableItemDel">
                                                            DELETE
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <div>
                                <div style={{textAlign: 'center'}} className="text-large">No Inventory!</div>
                                <div style={{textAlign: 'center'}} className="text-large">Click on Add</div>
                            </div>
                        )
                        
                    ):
                    (
                        'loading...'
                    )
                }
                
            </div>
        </div>
    );
}

export default ViewInventory;