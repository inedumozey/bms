import React from 'react';
import Feedback from './Feedback';
import Mark from './Mark';
import Radio from './Radio';
import Remove from './Remove';

function ResolveInvoiceConfig({type, type_, contact, title, checkContact, save, getContact, setFeedBack, feedBack}) {

    return (
        type.length > 0 ?                        
        (
            <div className="invoiceLinkWrapper">
                <div className="contactName">{title}</div>
                {
                    feedBack.msg !==''?
                    (
                        <div className="msg">
                            <Feedback
                                feedBack={feedBack}
                                setFeedBack={setFeedBack}
                                timeout={2000}
                            />
                        </div>
                    ): ''
                }
                {
                    checkContact.length > 0 ?
                    (
                        <div
                            onClick={()=>save(type_)}
                            className="save">Save
                        </div>
                    ): ''
                }
                {
                    type.map((link, key)=>{
                        return (
                            <div
                                onDoubleClick={()=>getContact(link, type_)}
                                key={key} className={contact.includes(link) ? "contacts whatsapp active" : "contacts whatsapp"}
                            >
                                {
                                    (function(){
                                        if(checkContact.includes(link) && !contact.includes(link)){
                                            return <Radio check={true} />
                                            
                                        }else if(checkContact.includes(link) && contact.includes(link)){
                                            return <Remove check={true} />
                                        }else{
                                            return ''
                                        }
                                    }())
                                }
                                {link}
                                <Mark 
                                    mark={contact.includes(link)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        ):''
    );
}

export default ResolveInvoiceConfig;