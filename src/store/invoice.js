const { ipcMain } = require('electron')
const fs = require('fs')

function addTempSales(storeURL){
    ipcMain.handle('addTempSales', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            if(!args.item){
                return {msg: 'Item is required!', status: false}

            }else if(args.price <= 0){
                return {msg: 'Price cannot be zero or less!', status: false}

            }else if(args.qty <= 0){
                return {msg: 'Quantity cannot be zero or less!', status: false}

            }else{
                //push to temp
                const obj = {
                    id: require('crypto').randomBytes(10).toString('hex'),
                    createdAt: new Date(),
                    updatedAt: '',
                    item: args.item,
                    price: args.price,
                    qty: args.qty,
                    currency: args.currency,
                    description: args.description,
                    discount: args.discount,
                    totalDiscountedPrice: args.totalDiscountedPrice,
                    totalActualPrice: args.totalActualPrice,
                }

                documents[index].temp.data.push(obj);
                documents[index].temp.id = require('crypto').randomBytes(10).toString('hex');
                documents[index].temp.createdAt = new Date();
                documents[index].temp.updatedAt = '';

                //update store and save
                store.documents = documents;
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {msg: 'Item added successfully', status: true}
            }
        }

    })
}

function updateTempSales(storeURL){
    ipcMain.handle('updateTempSales', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}
        }else{
            if(!args.item){
                return {msg: 'Item is required!', status: false}
                
            }else if(args.price <= 0){
                return {msg: 'Price cannot be zero or less!', status: false}
                
            }else if(args.qty <= 0){
                return {msg: 'Quantity cannot be zero or less!', status: false}
                
            }else{
                //find the id
                const documentTempIndex = documents[index].temp.data.findIndex(item=>item.id === args.id)

                //find the document
                if(documentTempIndex === -1){
                    return {
                        status: false,
                        msg: 'Invalid ID'
                    }

                }else{
                    const updatedObj = {
                        item: args.item,
                        price: args.price,
                        qty: args.qty,
                        description: args.description,
                        discount: args.discount,
                        totalDiscountedPrice: args.totalDiscountedPrice,
                        totalActualPrice: args.totalActualPrice,
                        currency: args.currency,
                        id: args.id,
                        createdAt: args.createdAt,
                        updateddAt: new Date()
                    }
                    
                    documents[index].temp.data[documentTempIndex] = updatedObj;
                   
                   // update store and save
                    store.documents = documents;
                    fs.writeFileSync(storeURL, JSON.stringify(store));
                    return {msg: 'Item edited successfully', status: true}
                }
            }
        }

    })
}

function deleteTempSales(storeURL){
    ipcMain.handle('deleteTempSales', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index !== -1){
            
            //find the item index
            const itemIndex = documents[index].temp.data.findIndex(item =>item.id === args.id );

            if(itemIndex !== -1){

                //filter the found item
                const filteredDocItem = documents[index].temp.data.filter(item =>item.id !== args.id );

                documents[index].temp.data = filteredDocItem
               
                //clear payment method and invoice id if temp.data is completely empty
                if(documents[index].temp.data.length < 1){
                    documents[index].temp.paymentMethod = ''
                    documents[index].temp.id = ''
                }
            
               // update store and save
                store.documents = documents;
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {msg: '', status: true}
            }
        }

    })
}

function clearTempSales(storeURL){
    ipcMain.handle('clearTempSales', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index !== -1){
            //clear data, payment method and invoice id
            documents[index].temp.data = [];
            documents[index].temp.paymentMethod = '';
            documents[index].temp.id = '';
           
           // update store and save
            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }

    })
}

function addPaymentMethod(storeURL){
    ipcMain.handle('addPaymentMethod', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            //check to make sure temp.data is not empty, only add payment payment if temp.data not empty
            if(documents[index].temp.data.length > 0){
                
                //add to paymentMethod
                const obj = {
                    clientName: args.clientName,
                    cash: args.cash,
                    POS: args.POS,
                    transfer: args.transfer,
                    amountPaid: args.amountPaid,
                    balance: args.balance
                }

                documents[index].temp.paymentMethod = obj;

                //update store and save
                store.documents = documents;
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {msg: '', status: true}

            }else{
                return {msg: 'Empty Invoice!', status: false}
            }
        }
    })
}

function updatePaymentMethod(storeURL){
    ipcMain.handle('updatePaymentMethod', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            //add to paymentMethod
            const obj = {
                clientName: args.clientName,
                cash: args.cash,
                POS: args.POS,
                transfer: args.transfer,
                amountPaid: args.amountPaid,
                balance: args.balance
            }

            documents[index].temp.paymentMethod = obj;

            //update store and save
            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }

    })
}

function removePaymentMethod(storeURL){
    ipcMain.handle('removePaymentMethod', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            //clear payment method
            documents[index].temp.paymentMethod = ''

            //update store and save
            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }

    })
}

function pushTempToInvoice(storeURL){

    ipcMain.handle('pushTempToInvoice', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            if(documents[index].temp.id && documents[index].temp.data.length > 0){
                //get all data from temp then empty temp

                //1. loop through data and add the invoice id and the last data createdAt to each of the data and store all the temp info in invoiceObj 
                let invoiceObj = {}
                for(let i=0; i<documents[index].temp.data.length; i++){
                    documents[index].temp.data[i].invoiceId = documents[index].temp.id;

                    documents[index].temp.createdAt = documents[index].temp.data[0].createdAt;
                    documents[index].temp.updatedAt = '';

                    const obj = {
                        // get available contacts from invoiceConfig
                        contacts: {
                            whatsapp: documents[index].invoiceConfig.whatsapp,
                            phone: documents[index].invoiceConfig.phone,
                            facebook: documents[index].invoiceConfig.facebook,
                            email: documents[index].invoiceConfig.email,
                            twitter: documents[index].invoiceConfig.twitter,
                            instagram: documents[index].invoiceConfig.instagram,
                            websites: documents[index].invoiceConfig.websites,
                            others: documents[index].invoiceConfig.others,
                        },
                        // get doc name, address, branch, about, digest and currency
                        doc: {
                            name: documents[index].name,
                            address: documents[index].address,
                            branch: documents[index].branch,
                            about: documents[index].about,
                            digest: documents[index].digest,
                            currency: documents[index].currency,
                        }
                    }

                    documents[index].temp = {
                        ...documents[index].temp,
                        ...obj
                    }

                    invoiceObj = documents[index].temp;
                }

                //2. push everything to invoices
                documents[index].invoices.push(invoiceObj)
                
                //4. empty temp object
                const obj = {
                    id: '',
                    createdAt: '',
                    updatedAt: '',
                    data: [],
                    paymentMethod: '',
                    contacts: '',
                    doc: ''
                }

                documents[index].temp = obj

                // 5. update store
                store.documents = documents;
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {msg: 'Invoice Saved', status: true}

            }else{
                return {msg: 'Empty Invoice!', status: false}
            }
        }
    })
}

function deleteInvoice(storeURL){
    ipcMain.handle('deleteInvoice', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}

        }else{
            //filter through invoices and remove the invoice with the args.id;
            const newInvoices = documents[index].invoices.filter(invoice => invoice.id !== args.id)
            documents[index].invoices = newInvoices;

            //update store and save
            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {msg: '', status: true}
        }

    })
}
function updateInvoice(storeURL){
    ipcMain.handle('updateInvoice', (event, args)=>{
        console.log(args);
    })
}

module.exports = {
    addTempSales,
    updateTempSales,
    deleteTempSales,
    clearTempSales,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
    pushTempToInvoice,
    deleteInvoice,
    updateInvoice,
}