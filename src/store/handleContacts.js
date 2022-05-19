module.exports = function handleContacts(contactBox, contacts, type){
    if(type==='whatsapp'){
        if(contacts === ''){
            contactBox.whatsapp = []
        }else{

            // resolveContacts(type)
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.whatsapp.includes(contacts[i])){
                    contactBox.whatsapp.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.whatsapp.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.whatsapp = newArr
                }
            }
        } 
    }else if (type==='phone'){
        if(contacts === ''){
            contactBox.phone = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.phone.includes(contacts[i])){
                    contactBox.phone.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.phone.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.phone = newArr
                }
            }
        } 
    }else if (type==='facebook'){
        if(contacts === ''){
            contactBox.facebook = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.facebook.includes(contacts[i])){
                    contactBox.facebook.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.facebook.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.facebook = newArr
                }
            }
        } 
    }else if (type==='email'){
        if(contacts === ''){
            contactBox.email = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.email.includes(contacts[i])){
                    contactBox.email.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.email.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.email = newArr
                }
            }
        } 
    }else if (type==='twitter'){
        if(contacts === ''){
            contactBox.twitter = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.twitter.includes(contacts[i])){
                    contactBox.twitter.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.twitter.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.twitter = newArr
                }
            }
        } 
    }else if (type==='instagram'){
        if(contacts === ''){
            contactBox.instagram = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.instagram.includes(contacts[i])){
                    contactBox.instagram.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.instagram.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.instagram = newArr
                }
            }
        } 
    }else if (type==='websites'){
        if(contacts === ''){
            contactBox.websites = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.websites.includes(contacts[i])){
                    contactBox.websites.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.websites.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.websites = newArr
                }
            }
        } 
    }else if (type==='others'){
        if(contacts === ''){
            contactBox.others = []
        }else{
            for(let i=0; i<contacts.length; i++){
                if(!contactBox.others.includes(contacts[i])){
                    contactBox.others.push(contacts[i])
    
                }else{
                    //if contacts is in contactBox, then remove it
                    newArr = contactBox.others.filter(contact=>{
                        return contact !== contacts[i]
                    });
                    contactBox.others = newArr
                }
            }
        } 
    }
}