module.exports = function resolveFilterInvoice(contactBox, invoiceContactBox, type){
    let tempArr = []
    if(type==='whatsapp'){
        for(let i=0; i<invoiceContactBox.whatsapp.length; i++){
            if(contactBox.whatsapp.indexOf(invoiceContactBox.whatsapp[i]) !== -1) {
               tempArr.push(invoiceContactBox.whatsapp[i])
            }        
       }
       invoiceContactBox.whatsapp = tempArr;

    }else if(type==='phone'){
        for(let i=0; i<invoiceContactBox.phone.length; i++){
            if(contactBox.phone.indexOf(invoiceContactBox.phone[i]) !== -1) {
               tempArr.push(invoiceContactBox.phone[i])
            }        
       }
       invoiceContactBox.phone = tempArr;

    }else if(type==='facebook'){
        for(let i=0; i<invoiceContactBox.facebook.length; i++){
            if(contactBox.facebook.indexOf(invoiceContactBox.facebook[i]) !== -1) {
               tempArr.push(invoiceContactBox.facebook[i])
            }        
       }
       invoiceContactBox.facebook = tempArr;
       
    }else if(type==='email'){
        for(let i=0; i<invoiceContactBox.email.length; i++){
            if(contactBox.email.indexOf(invoiceContactBox.email[i]) !== -1) {
               tempArr.push(invoiceContactBox.email[i])
            }        
       }
       invoiceContactBox.email = tempArr;
       
    }else if(type==='twitter'){
        for(let i=0; i<invoiceContactBox.twitter.length; i++){
            if(contactBox.twitter.indexOf(invoiceContactBox.twitter[i]) !== -1) {
               tempArr.push(invoiceContactBox.twitter[i])
            }        
       }
       invoiceContactBox.twitter = tempArr;
       
    }else if(type==='instagram'){
        for(let i=0; i<invoiceContactBox.instagram.length; i++){
            if(contactBox.instagram.indexOf(invoiceContactBox.instagram[i]) !== -1) {
               tempArr.push(invoiceContactBox.instagram[i])
            }        
       }
       invoiceContactBox.instagram = tempArr;
       
    }else if(type==='websites'){
        for(let i=0; i<invoiceContactBox.websites.length; i++){
            if(contactBox.websites.indexOf(invoiceContactBox.websites[i]) !== -1) {
               tempArr.push(invoiceContactBox.websites[i])
            }        
       }
       invoiceContactBox.websites = tempArr;
       
    }else if(type==='others'){
        for(let i=0; i<invoiceContactBox.others.length; i++){
            if(contactBox.others.indexOf(invoiceContactBox.others[i]) !== -1) {
               tempArr.push(invoiceContactBox.others[i])
            }        
       }
       invoiceContactBox.others = tempArr;
       
    }
}