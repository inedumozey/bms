import React, {useEffect, useRef, useState, useContext} from 'react';
import { GlobalState } from '../App';
import Feedback from './Feedback';
import { useSelector } from 'react-redux'

function POS_temp_payment_method({
    setEditingPaymentMethod,
    setEditingPaymentMethodData,
    editingPaymentMethod,
    editingPaymentMethodData,
    initEditingPaymentMethodData
}) {

    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    const initState = {
        clientName: editingPaymentMethod ? editingPaymentMethodData.clientName : '',
        cash: editingPaymentMethod ? editingPaymentMethodData.cash : 0,
        POS: editingPaymentMethod ? editingPaymentMethodData.POS : 0,
        transfer: editingPaymentMethod ? editingPaymentMethodData.transfer : 0,
    }

    let totalDiscountedPrice = 0
    for(let i=0; i<activeDocument.temp.data.length; i++){
        totalDiscountedPrice += activeDocument.temp.data[i].totalDiscountedPrice
    }

    const [ val, setVal ] = useState(initState);
    useEffect(()=>{
        setVal(initState)

    }, [editingPaymentMethodData])

    const amountPaid = +val.cash + +val.POS + +val.transfer;
    const balance = Math.round(amountPaid - totalDiscountedPrice)

    function getVal(e){
        const { name, value } = e.target;
        setVal( {...val, [name]: value} )
    }

    function submit(e){
        e.preventDefault();
        const data = {
            ...val,
            amountPaid,
            balance,
            docName: activeDocument.name
        };

        if(!editingPaymentMethod){
            window.api.addPaymentMethod(data).then(res=>{
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
            window.api.updatePaymentMethod(data).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                }else{
                    setFeedBack({...res});
                    setVal(initState);
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    setEditingPaymentMethod(false);
                    setEditingPaymentMethodData(initEditingPaymentMethodData)
                }
            })
        }
    }

    function cancel(e){
        if(e.target === e.currentTarget){
            setEditingPaymentMethodData(initEditingPaymentMethodData);
            setEditingPaymentMethod(false)
        }
    }

    return (
        <div className='pos pos_entry pos_payment_method'> 
            <form onSubmit={submit}>
                <Feedback
                    feedBack={feedBack}
                    setFeedBack={setFeedBack}
                    timeout={2000}
                />

                <div className="form-group">
                    <label>Client Name: </label>
                    <input
                        onChange={getVal}
                        name='clientName'
                        placeholder='Enter Client Name'
                        value={val.clientName}
                        type="text"
                    />
                </div>

                <div className="form-group-flex3">
                    <div className="form-group">
                        <label>Cash: </label>
                        <input
                            onChange={getVal}
                            name='cash'
                            placeholder='Enter Cash Amount'
                            value={val.cash}
                            min={0}
                            type="number"
                        />
                    </div>

                    <div className="form-group">
                        <label>POS: </label>
                        <input
                            onChange={getVal}
                            name='POS'
                            placeholder='Enter POS Amount'
                            value={val.POS}
                            min={0}
                            type="number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Transfer: </label>
                        <input
                            onChange={getVal}
                            name='transfer'
                            placeholder='Enter Transfer Amount'
                            value={val.transfer}
                            min={0}
                            type="number"
                        />
                    </div>
                </div>

                <div className="form-group-flex2">
                    <div className="form-group">
                        <label>Amount Paid: </label>
                        <input
                            onChange={getVal}
                            name='amountPaid'
                            value={amountPaid}
                            type="number"
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Balance: </label>
                        <input
                            onChange={getVal}
                            name='balance'
                            value={balance}
                            type="number"
                            disabled
                        />
                    </div>
                </div>

                {
                    editingPaymentMethod ? 
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
                                title={activeDocument.temp.paymentMethod ? "Payment Method alredy added" : 'Add Payment Method' }
                                disabled={ activeDocument.temp.paymentMethod ? true : false }
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

export default POS_temp_payment_method