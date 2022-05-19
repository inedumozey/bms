import React , { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import Mark from './Mark';
import Feedback from './Feedback';
import Radio from './Radio'
import Remove from './Remove';
import ResolveInvoiceConfig from './ResolveInvoiceConfig';


function InvoiceConfig({}) {
    const state = useSelector(state=>state);
    const { activeDocument } = state; 
    const globalState = useContext(GlobalState);
    
    const [ editing, setEditing ] = useState(false);

    const [ checkWhatsapp, setCheckWhatsapp ] = useState([])
    const [ checkPhone, setCheckPhone ] = useState([])
    const [ checkFacebook, setCheckFacebook ] = useState([])
    const [ checkEmail, setCheckEmail ] = useState([])
    const [ checkTwitter, setCheckTwitter ] = useState([])
    const [ checkInstagram, setCheckInstagram ] = useState([])
    const [ checkWebsites, setCheckWebsites ] = useState([])
    const [ checkOthers, setCheckOthers ] = useState([])

    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    function getContact(contact, type){
        if(type==='whatsapp'){
            if(!checkWhatsapp.includes(contact)){
                checkWhatsapp.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkWhatsapp.filter(c=>c!==contact);
                setCheckWhatsapp(newArr)
            }

        }else if(type==='phone'){
            if(!checkPhone.includes(contact)){
                checkPhone.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkPhone.filter(c=>c!==contact);
                setCheckPhone(newArr)
            }

        }else if(type==='facebook'){
            if(!checkFacebook.includes(contact)){
                checkFacebook.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkFacebook.filter(c=>c!==contact);
                setCheckFacebook(newArr)
            }

        }else if(type==='email'){
            if(!checkEmail.includes(contact)){
                checkEmail.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkEmail.filter(c=>c!==contact);
                setCheckEmail(newArr)
            }

        }else if(type==='twitter'){
            if(!checkTwitter.includes(contact)){
                checkTwitter.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkTwitter.filter(c=>c!==contact);
                setCheckPhone(newArr)
            }

        }else if(type==='instagram'){
            if(!checkInstagram.includes(contact)){
                checkInstagram.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkInstagram.filter(c=>c!==contact);
                setCheckInstagram(newArr)
            }

        }else if(type==='websites'){
            if(!checkWebsites.includes(contact)){
                checkWebsites.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkWebsites.filter(c=>c!==contact);
                setCheckWebsites(newArr)
            }

        }else if(type==='others'){
            if(!checkOthers.includes(contact)){
                checkOthers.push(contact)
            }else{
                //get the indexedDB, then remove
                const newArr = checkOthers.filter(c=>c!==contact);
                setCheckOthers(newArr)
            }
        }
    }

    function save(type){
        if(type === 'whatsapp'){
            window.api.addWhatsapp({docName:activeDocument.name, whatsapp: checkWhatsapp}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckWhatsapp([])
                }
            });

        } else if(type === 'phone'){
            window.api.addPhone({docName:activeDocument.name, phone: checkPhone}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckPhone([])
                }
            });

        }else if(type === 'facebook'){
            window.api.addFacebook({docName:activeDocument.name, facebook: checkFacebook}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckFacebook([])
                }
            });
            
        }else if(type === 'email'){
            window.api.addEmail({docName:activeDocument.name, email: checkEmail}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckEmail([])
                }
            });
            
        }else if(type === 'twitter'){
            window.api.addTwitter({docName:activeDocument.name, twitter: checkTwitter}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckTwitter([])
                }
            });
            
        }else if(type === 'instagram'){
            window.api.addInstagram({docName:activeDocument.name, instagram: checkInstagram}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckInstagram([])
                }
            });
            
        }else if(type === 'websites'){
            window.api.addWebsites({docName:activeDocument.name, websites: checkWebsites}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckWebsites([])
                }
            });
            
        }else if(type === 'others'){
            window.api.addOthers({docName:activeDocument.name, others: checkOthers}).then(res=>{
                if(!res.status){
                    setFeedBack({...res});
                    setEditing(true);
                }else{
                    setFeedBack({...res});
                    globalState.getDocuments();
                    globalState.getActiveDoc();
                    globalState.getDocumentTabs();
                    setCheckOthers([])
                }
            });
            
        }
    }

    return (
            
        <div>
            <div className="box contacts">
                <div className="name">INVOICE CONFIGURATION</div>
                <div className='contactBody'>
                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.whatsapp}
                            type_ = 'whatsapp'
                            contact = {activeDocument.invoiceConfig.whatsapp}
                            title = {'WhatsApp'}
                            checkContact = {checkWhatsapp}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.phone}
                            type_ = 'phone'
                            contact = {activeDocument.invoiceConfig.phone}
                            title = {'Phone'}
                            checkContact = {checkPhone}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.facebook}
                            type_ = 'facebook'
                            contact = {activeDocument.invoiceConfig.facebook}
                            title = {'Facebook'}
                            checkContact = {checkFacebook}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.email}
                            type_ = 'email'
                            contact = {activeDocument.invoiceConfig.email}
                            title = {'Email'}
                            checkContact = {checkEmail}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.twitter}
                            type_ = 'twitter'
                            contact = {activeDocument.invoiceConfig.twitter}
                            title = {'Twitter'}
                            checkContact = {checkTwitter}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.instagram}
                            type_ = 'instagram'
                            contact = {activeDocument.invoiceConfig.instagram}
                            title = {'Instagram'}
                            checkContact = {checkInstagram}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.websites}
                            type_ = 'websites'
                            contact = {activeDocument.invoiceConfig.websites}
                            title = {'Websites'}
                            checkContact = {checkWebsites}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }

                    {
                        <ResolveInvoiceConfig
                            type = {activeDocument.others}
                            type_ = 'others'
                            contact = {activeDocument.invoiceConfig.others}
                            title = {'Others'}
                            checkContact = {checkOthers}
                            save={save}
                            getContact = {getContact}
                            setFeedBack={setFeedBack}
                            feedBack={feedBack}
                        />
                    }
                    
                </div>

                
            </div>
        </div>
    );
}

export default InvoiceConfig;
