import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';

function POS_payment_method_actions({ setEditingPaymentMethod, setEditingPaymentMethodData, }) {
    const state = useSelector(state=>state);
    const globalState = useContext(GlobalState);
    const { activeDocument } = state;

    function edit(){
        setEditingPaymentMethod(true);
        setEditingPaymentMethodData(activeDocument.temp.paymentMethod);
    }

    function removePaymentMethod(){
        window.api.removePaymentMethod({docName: activeDocument.name}).then(res=>{
            if(res.status){
                globalState.getDocuments();
                globalState.getActiveDoc();
            }
        })
    }

    return (
        activeDocument && activeDocument.temp.paymentMethod ?
        (
            <div className='pos pos_temp_payment_method'>
                PAYMENT METHOD
               <div className="form-group-flex2">
                   <div className="form-group">
                        <button onClick={edit}>Edit</button>
                   </div>
                   <div className="form-group">
                        <button onClick={removePaymentMethod}>Remove</button>
                   </div>
               </div>
            </div>
            
        ):
        (
            ''
        )
        
    );
}

export default POS_payment_method_actions;