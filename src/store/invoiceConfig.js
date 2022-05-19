const { ipcMain } = require('electron')
const fs = require('fs');
const handleContacts = require('./handleContacts');
const resolveFilterInvoice = require('./resolveFilterInvoice');

function addWhatsapp(storeURL){
    ipcMain.handle('addWhatsapp', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.whatsapp, 'whatsapp')
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addPhone(storeURL){
    ipcMain.handle('addPhone', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.phone, 'phone')
            store.documents = documents;
            
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addFacebook(storeURL){
    ipcMain.handle('addFacebbok', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.facebook, 'facebook');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addEmail(storeURL){
    ipcMain.handle('addEmail', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.email, 'email');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addTwitter(storeURL){
    ipcMain.handle('addTwitter', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.twitter, 'twitter');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addFacebook(storeURL){
    ipcMain.handle('addFacebook', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.facebook, 'facebook');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addInstagram(storeURL){
    ipcMain.handle('addInstagram', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.instagram, 'instagram');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addWebsites(storeURL){
    ipcMain.handle('addWebsites', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.websites, 'websites');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function addOthers(storeURL){
    ipcMain.handle('addOthers', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
                        
            handleContacts(documents[index].invoiceConfig, args.others, 'others');
            store.documents = documents;

            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }
    })
}

function filterInvoiceContacts(storeURL){
    ipcMain.handle('filterInvoiceContacts', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());

        //check invoiceConfig to remove whatever not found in contacts
        //1. whatsapp
        resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'whatsapp');

         //2. phone
         resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'phone')

          //3. facebook
        resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'facebook');

         //4. email
         resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'email');

          //5. twitter
        resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'twitter');

         //6. instagram
        resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'instagram');

         //7. websites
         resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'websites');

         //8. others
         resolveFilterInvoice(documents[index], documents[index].invoiceConfig, 'others');

        //update store
        store.documents = documents;

        // save store
        fs.writeFileSync(storeURL, JSON.stringify(store))
    })
    
}

module.exports = {
    addWhatsapp,
    addPhone,
    addFacebook,
    addEmail,
    addTwitter,
    addInstagram,
    addWebsites,
    addOthers,
    filterInvoiceContacts
}