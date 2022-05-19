import React, {useEffect, useRef, useState, useContext} from 'react';
import { GlobalState } from '../App';
import Feedback from './Feedback';
import { useSelector } from 'react-redux'

function POS_entry({ setEditing, setEditingData, editing, editingData, initEditingData }) {

    const nameRef = useRef()
    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    }); 

    const initState = {
        item: editing ? editingData.item : '',
        price: editing ? editingData.price : 0,
        qty: editing ? editingData.qty : 1,
        description: editing ? editingData.description : 'Nil'
    }

    const [ val, setVal ] = useState(initState);
    useEffect(()=>{
        setVal(initState)

    }, [editingData])   

    const totalDiscountedPrice = Math.round((+val.price * +val.qty - (+activeDocument.discount/100 * (+val.price * +val.qty))));

    const totalActualPrice = Math.round((totalDiscountedPrice * 100) / (100 - +activeDocument.discount))

    function getVal(e){
        const { name, value } = e.target;
        setVal( {...val, [name]: value} )
    }

    function submit(e){
        e.preventDefault();
        const data = {
            ...val,
            price: +val.price,
            qty: +val.qty,
            totalDiscountedPrice,
            totalActualPrice,
            currency: activeDocument.currency,
            discount: activeDocument.discount,
            docName: activeDocument.name
        };

        if(!editing){
            window.api.addTempSales(data).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                }else{
                    setFeedBack({...res});
                    setVal(initState);
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    
                }
            })
        }else{
            window.api.updateTempSales({
                    ...data,
                    createdAt: editingData.createdAt,
                    id: editingData.id,
                    updateddAt: editingData.updateddAt

                }).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                }else{
                    setFeedBack({...res});
                    setVal(initState);
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    setEditing(false);
                    setEditingData(initEditingData)
                    
                }
            })
        }
    }

    function cancel(e){
        if(e.target === e.currentTarget){
            setEditingData(initEditingData);
            setEditing(false)
        }
    }

    useEffect(()=>{
        nameRef.current.focus()
    }, [])

    return (
        <div className='pos pos_entry'> 
            <form onSubmit={submit}>
                <Feedback
                    feedBack={feedBack}
                    setFeedBack={setFeedBack}
                    timeout={2000}
                />

                <div className="form-group">
                    <label>Item: <span>*</span></label>
                    <input
                        ref={nameRef}
                        onChange={getVal}
                        name='item'
                        placeholder='Enter Item'
                        value={val.item}
                        type="text"
                    />
                </div>

                <div className="form-group-flex2">
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            onChange={getVal}
                            name='price'
                            placeholder='Enter Price'
                            value={val.price}
                            type="number"
                            min={0}
                        />
                    </div>
                    <div className="form-group">
                        <label>Qty: </label>
                        <input
                            onChange={getVal}
                            name='qty'
                            placeholder='Enter Qty'
                            value={val.qty}
                            type="number"
                            min={1}
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <textarea
                        onChange={getVal}
                        name='description'
                        placeholder='Enter Item Description'
                        value={val.description}
                        type="text">
                    </textarea>
                </div>
                <div className="form-group">
                    <label>Total Price: </label>
                    <input
                        name='totalPrice'
                        value={totalActualPrice}
                        type="text"
                        min={0}
                        disabled
                    />
                </div>

                {
                    editing ? 
                    (
                        <div className="form-group-flex2">
                            <div className="form-group">
                                <input
                                    value='Update'
                                    type="submit"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onClick={cancel}
                                    value='Cancel'
                                    type="reset"
                                />
                            </div>
                        </div>
                    ):
                    (
                        <div className="form-group">
                            <input
                                value='Add'
                                type="submit"
                            />
                        </div>
                    )
                }
                
            </form>
        </div>
    );
}

export default POS_entry;