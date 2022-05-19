import React, {useState, useContext} from 'react';
import { GlobalState } from '../App';
import Feedback from './Feedback';
import { useSelector } from 'react-redux'
import Receipt from './Receipt';

function POS_temp_invoice({}) {

    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state);
    const { activeDocument } = state;
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });
    
    const pushTempToInvoice=()=>{
        window.api.pushTempToInvoice({docName: activeDocument.name}).then(res=>{
            if(!res.status){
                setFeedBack({...res});
            }else{
                setFeedBack({...res});
                globalState.getDocuments();
                globalState.getActiveDoc();
            }
        })
    }

    function saveInvoice(){
        pushTempToInvoice();
    }

    function printInvoice(){
        pushTempToInvoice();
        window.print();
    }

    const invoice = {
        id: activeDocument.temp.id,
        createdAt:  activeDocument.temp.createdAt,
        updatedAt:  activeDocument.temp.updatedAt,
        data:  activeDocument.temp.data,
        paymentMethod:  activeDocument.temp.paymentMethod,
        contacts: {
            whatsapp: activeDocument.invoiceConfig.whatsapp,
            phone: activeDocument.invoiceConfig.phone,
            facebook: activeDocument.invoiceConfig.facebook,
            email: activeDocument.invoiceConfig.email,
            twitter: activeDocument.invoiceConfig.twitter,
            instagram: activeDocument.invoiceConfig.instagram,
            websites: activeDocument.invoiceConfig.websites,
            others: activeDocument.invoiceConfig.others,
        },
        doc: {
            name: activeDocument.name,
            address: activeDocument.address,
            branch: activeDocument.branch,
            about: activeDocument.about,
            digest: activeDocument.digest,
            currency: activeDocument.currency,
        }
    }
    
    return (
        activeDocument && activeDocument.temp.data.length > 0 ?
        (
            <div className='pos pos_temp_invoice'>
                <Feedback
                    feedBack={feedBack}
                    setFeedBack={setFeedBack}
                    timeout={2000}
                />
                {activeDocument && <Receipt invoice={invoice} action={{saveInvoice, printInvoice}}/>}
            </div>
            
        ):''
    );
}

export default POS_temp_invoice;