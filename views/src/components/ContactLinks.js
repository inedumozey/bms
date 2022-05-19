import React from 'react';

function ContactLinks({link, name}) {
   
    return (
        link.length > 0 ?
        (
            <div className="receipt-contact-wrapper">
                <div className="receipt-contact-name">{name}: </div>
                <div className="receipt-contact">
                    {
                        link.map((link, key)=>{
                            return <div key={key} className="receipt-contact-link">{link}</div>
                        })
                    }
                </div>
            </div>
        ):''
    );
}

export default ContactLinks;