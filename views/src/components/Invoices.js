import React, {useContext} from 'react';
import { GlobalState } from '../App';
import { useSelector } from 'react-redux'
import Receipt from './Receipt';

function Invoices({ setEditingInvoice, setEditingInvoiceData }) {
    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument, filteredData } = state;

    function editInvoice(invoice){
        //1. push pos toitem tabs
        //check pos in item tabs
        const index = activeDocument.tabs.indexOf('pos');
        if(index == -1){
            globalState.setItemTabs({item: 'pos', activeDoc: activeDocument});
        }

        //2. make pos it active tab
        //check pos in active item tab
        const found = activeDocument.active === 'pos'
        if(!found){
            globalState.setActiveItem({item: 'pos', activeDoc: activeDocument});
        }

        //3. make changes
        setEditingInvoice(true);
        setEditingInvoiceData({
            id: invoice.id,
            createdAt: invoice.createdAt,
            updatedAt: '',
            data: invoice.data,
            paymentMethod: invoice.paymentMethod,
            contacts: invoice.contacts,
            doc: invoice.doc
        })

    }
    function printInvoice(invoice){
        console.log(invoice);
    }
    function deleteInvoice(invoice){
        globalState.setWarnerModal({
            state: true,
            data: {
                docName: activeDocument.name,
                id: invoice.id
            },
            for: 'deleteInvoice',
            text: 'Are you sure you want to parmanently delete this Invoice?',
            title: ''
        })
    }

    return (
        <div className='mainInvoice scrolX scrolY'>

            <div className="pos_header">
                <div className="item">
                    Total Invoices:
                    <span
                        style={{
                            color: activeDocument.invoices.length > 0 ? 'greenyellow': ''
                        }}
                    >
                        {activeDocument && " "+ activeDocument.invoices.length}
                    </span>
                </div>                
            </div>

            <div className="invoiceBody">
                
                {
                    filteredData && filteredData.map((invoices, key)=>{
                        return (
                            <div className='mainReceiptWrapper' key={key}>
                                <Receipt invoice={invoices} action={{editInvoice, printInvoice, deleteInvoice}} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Invoices