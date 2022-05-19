import React, {useState, useEffect, useRef, useContext} from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import Feedback from './Feedback';

function AddInventory({editing, editingData, setActive, setEditingData, initEditingData, setEditing}) {

    const nameRef = useRef();
    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    
    const initState = {
        item: editing ? editingData.item : '',
        price: editing ? editingData.price : 0,
        description: editing ? editingData.description : 'Nil',
        category: editing ? editingData.category : ''
    }

    const [val, setVal] = useState(initState)

    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    function getVal(e){
        const { name, value } = e.target;
        setVal({ ...val, [name]: value })
    }
    
    function add(e){
        e.preventDefault()
        if(!editing){
            window.api.addInventory({...val, docName: activeDocument.name, currency: activeDocument.currency}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                }else{
                    setFeedBack({...res});
                    setVal(initState);
                    globalState.getDocuments()
                    globalState.getActiveDoc()
                }
            })
        }else{
            window.api.updateInventory({ docName: activeDocument.name, id:editingData.id, ...val }).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                }else{
                    setFeedBack({...res});
                    setVal(initState);
                    globalState.getDocuments()
                    globalState.getActiveDoc();
                    
                    setActive('View');
                    setEditing(false)
                    setEditingData(initEditingData)
                }
            })
        }
    }

    useEffect(()=>{
        nameRef.current.focus();
    }, [])

    return (
        <div className='add'>
            <div className="inventoryCount">
            Invotory: {activeDocument.inventory.length}
            </div>
            <form onSubmit={add}>
                <div className="addHeader">{editing ? "Update" : "Add"}</div>
                
                <Feedback
                    feedBack={feedBack}
                    setFeedBack={setFeedBack}
                    timeout={10000}
                />

                <div className="form-group item">
                    <label htmlFor="">Item: <span>*</span></label>
                    <input
                        ref={nameRef}
                        onChange={getVal}
                        type="text"
                        placeholder='Enter Item'
                        name='item'
                        value={val.item}
                    />
                </div>
                
                <div className="flex">
                    <div className="form-group category">
                        <label htmlFor="">Category: </label>
                        <input
                            onChange={getVal}
                            type="text"
                            placeholder='Enter Category'
                            name='category'
                            value={val.category}
                        />
                    </div>
                    <div className="form-group price">
                        <label htmlFor="">Price: </label>
                        <input
                            onChange={getVal}
                            type="number"
                            min={0}
                            placeholder='Enter Price'
                            name='price'
                            value={val.price}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="">Description: </label>
                    <textarea
                        onChange={getVal}
                        placeholder='Enter Item Description'
                        name='description'
                        value={val.description}
                    ></textarea>
                </div>
                <div className="form-group submit">
                    <input
                        style={{color: '#fff', fontSize: '1.2rem'}}
                        type="submit"
                        value={editing ? "Update" : "Add"}
                    />
                </div>

            </form>
        </div>
    );
}

export default AddInventory;