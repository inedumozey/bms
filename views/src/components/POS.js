import React, {useState} from 'react';
import POS_entry from './POS_entry';
import POS_temp_data from './POS_temp_data';
import POS_temp_invoice from './POS_temp_invoice';
import { useSelector } from 'react-redux';
import POS_temp_payment_method from './POS_temp_payment_method';
import POS_payment_method_actions from './POS_payment_method_actions';

function POS({editingInvoice, setEditingInvoice, editingInvoiceData, setEditingInvoiceData, initialInvoiceData}) {
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const discount = activeDocument && activeDocument.discount;
    const [ editing, setEditing ] = useState(false);
    const [ editingPaymentMethod, setEditingPaymentMethod ] = useState(false);
    
    console.log(editingInvoice, editingInvoiceData);

    const initEditingData = {
        item: '',
        price:  0,
        qty: 1,
        description: 'Nil'
    }

    const initEditingPaymentMethodData = {
        clientName: '',
        cash: 0,
        POS: 0,
        transfer: 0,
    }

    const [ editingData, setEditingData ] = useState(initEditingData);
    const [ editingPaymentMethodData, setEditingPaymentMethodData ] = useState(initEditingPaymentMethodData);

    return (
        <div className="pos_wrapper scrolX scrolY">
            <div className="pos_header">
                <div className="item">
                    Total Items:
                    <span
                        style={{
                            color: activeDocument.temp.data.length > 0 ? 'greenyellow': ''
                        }}
                    >
                        {activeDocument && " "+ activeDocument.temp.data.length}
                    </span>
                </div>

                <div className="discount">
                    Discount:
                    <span
                        style={{
                            color: discount>0? 'greenyellow': ''
                        }}
                    >
                        {" " +discount}%
                    </span>
                </div>
                
            </div>
            <div className="pos_main">
                <POS_entry
                    editing={editing}
                    setEditing={setEditing}
                    editingData={editingData}
                    setEditingData={setEditingData}
                    initEditingData={initEditingData}
                />

                <POS_temp_payment_method
                    editingPaymentMethod={editingPaymentMethod}
                    setEditingPaymentMethod={setEditingPaymentMethod}
                    editingPaymentMethodData={editingPaymentMethodData}
                    setEditingPaymentMethodData={setEditingPaymentMethodData}
                    initEditingPaymentMethodData={initEditingPaymentMethodData}
                />

                {
                    activeDocument.temp.paymentMethod ?
                    (
                        <POS_payment_method_actions
                            setEditingPaymentMethod={setEditingPaymentMethod}
                            setEditingPaymentMethodData={setEditingPaymentMethodData}
                        />
                    ):''
                }
                
                <POS_temp_invoice
                    setEditingInvoice={setEditingInvoice}
                    setEditingInvoiceData={setEditingInvoiceData}
                    initialInvoiceData={initialInvoiceData}
                />

                <POS_temp_data
                    setEditing={setEditing}
                    setEditingData={setEditingData}
                />
                
            </div>
        </div>
    );
}

export default POS;