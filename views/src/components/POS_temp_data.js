import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';

function POS_temp_data({ setEditing, setEditingData}){

    const state = useSelector(state=>state);
    const globalState = useContext(GlobalState);
    const { activeDocument } = state;

    function openEdit(item){
        setEditing(true)
        setEditingData(item);
        
    }
    function deleteItem(id){
        window.api.deleteTempSales({id:id, docName: activeDocument.name}).then(res=>{
            globalState.getDocuments();
            globalState.getActiveDoc();
        })
    }

    function clearItem(){
        window.api.clearTempSales({docName: activeDocument.name}).then(res=>{
            globalState.getDocuments();
            globalState.getActiveDoc();
        })
    }

    return (
        activeDocument.temp.data.length > 0 ?
        (
            <div className='pos pos_temp_data scrolX'>
                <div className='view'>

                    <div className="viewTable">

                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>DESCRIPTION</th>
                                    <th>TOTAL PRICE</th>
                                    <th>*</th>
                                    <th
                                        onClick={clearItem}
                                        style={{
                                            background: 'red',
                                            cursor: 'pointer'
                                        }}
                                        >CLEAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    activeDocument.temp.data.map((item, key)=>{
                                        return (
                                            <tr
                                                title={item.item}
                                                key={key}>
                                                <td>{key+1}</td>
                                                <td>{item.item}</td>
                                                <td>{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.description}</td>
                                                <td>{(item.totalActualPrice)}</td>

                                                <td
                                                    title={"Edit " + item.item}
                                                    onClick={()=>openEdit(item)}
                                                    className='tableItemEdit'> EDIT
                                                </td>
                                                <td
                                                    title={"Remove " + item.item}
                                                    onClick={()=>deleteItem(item.id)}
                                                    className="tableItemDel">
                                                        DELETE
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        ):
        (
            ''
        )
    );
}

export default POS_temp_data;