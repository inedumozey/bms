const { ipcMain } = require('electron')
const fs = require('fs')
const bcrypt = require('bcrypt');
const resolveContacts = require('./resolveContacts');

const obj = {
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    logo: '',
    documentType: '',
    password: '',
    question: '',
    answer: '',
    address: '',
    branch: '',
    about: '',
    digest: '',

    discount: 0,
    currency: 'USD',
    temp: {
        id: '',
        createdAt: '',
        updatedAt: '',
        data: [],
        paymentMethod: ''
    },
    invoices: [],
    inventory: [],
    posConfig: [],
    invoiceConfig: {
        phone: [],
        whatsapp: [],
        facebook: [],
        email: [],
        twitter: [],
        instagram: [],
        websites: [],
        others: []
    },

    whatsapp: [],
    phone: [],
    facebook: [],
    email: [],
    twitter: [],
    instagram: [],
    websites: [],
    others: [],
    
    tabs: [],
    active: ''
}

function getAllDocuments(storeURL){
    ipcMain.handle('getDocument', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        return store
    })
}

function insertDocument(storeURL){    
    ipcMain.handle('insertDocument', async (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.name.toLowerCase())

        if(args.protected){
            if(!args.name){
                return {
                    status: false,
                    msg: 'Company Name is required!'
                }
            }
            else if(!args.password){
                return {
                    status: false,
                    msg: 'Password is required!'
                }
            }
            else if(!args.question){
                
                return {
                    status: false,
                    msg: 'Set your Account Recovery Question!'
                }
            }
            else if(!args.answer){
                return {
                    status: false,
                    msg: 'Set an Answer to your Account Recovery Question!'
                }
            }else{
                 //hash password
                 const hashedPassword = await bcrypt.hash(args.password, 10);
                 //hash recovery answer
                 const hashedAnswer = await bcrypt.hash(args.answer.toLowerCase(), 10);

                if(documents.length < 1){
                    documents.push({
                        ...obj,
                        id: require('crypto').randomBytes(10).toString('hex'),
                        createdAt: new Date(),
                        ...args,
                        name: args.name.toLowerCase(),
                        password: hashedPassword,
                        answer:hashedAnswer,
                    })
                    store.documents = documents;
                    fs.writeFileSync(storeURL, JSON.stringify(store))
                    return {
                        status: true,
                        msg: args.name.toUpperCase() + ' Created Successfully!'
                    }
                              
                }else{
                    //check if document name doesnt exist
                    if(index === -1){
                        // push the new document
                        documents.push({
                            ...obj,
                            id: require('crypto').randomBytes(10).toString('hex'),
                            createdAt: new Date(),
                            ...args,
                            name: args.name.toLowerCase(),
                            password: hashedPassword,
                            answer: hashedAnswer
                        })
                        store.documents = documents;
                        fs.writeFileSync(storeURL, JSON.stringify(store))
                        return {
                            status: true,
                            msg: args.name.toUpperCase() + ' Created Successfully!'
                        }

                    }else{
                        return {
                            status: false,
                            msg: 'Document with the name already exists, Choose a different name'
                        }
                    }
                }
            }
        }else{
            if(!args.name){
                return {
                    status: false,
                    msg: 'Company Name is required!'
                }
            }else{
                
                if(documents.length < 1){
                    //push the new document
                    //push new document into it
                    documents.push({
                        ...obj,
                        id: require('crypto').randomBytes(10).toString('hex'),
                        createdAt: new Date(),
                        ...args,
                        name: args.name.toLowerCase()
                    })
                    store.documents = documents;
                    fs.writeFileSync(storeURL, JSON.stringify(store));

                    return {
                        status: true,
                        msg: args.name.toUpperCase() + ' Created Successfully!'
                    }
                              
                }else{
                    //check if document name doesnt exist
                    if(index === -1){
                        // push the new document
                        documents.push({
                            ...obj,
                            id: require('crypto').randomBytes(10).toString('hex'),
                            createdAt: new Date(),
                            ...args,
                            name: args.name.toLowerCase()
                        })
                        store.documents = documents;
                        fs.writeFileSync(storeURL, JSON.stringify(store));

                        return {
                            status: true,
                            msg: args.name.toUpperCase() + ' Created Successfully!'
                        }
                    }else{
                        return {
                            status: false,
                            msg: 'Document with the name already exists, Choose a different name'
                        }
                    }
                }
            }
        }
    })
}

function deleteDocument(storeURL){
    ipcMain.handle('deleteDocument', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        
        //use the name to get the document;
        let indexinDocument = documents.findIndex(document=>document.name === args);

        if(indexinDocument === -1){
            return {msg: 'Document not found!', status: false}
        }else{

            //remove from documents
            const newDocuments = documents.filter(document=>document.name !== args);
            store.documents = newDocuments;
            fs.writeFileSync(storeURL, JSON.stringify(store))
        }
    })
}

function pushToDocumentTabs(storeURL){
    ipcMain.handle('pushToDocumentTabs', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documentTabs } = store;

        let index = documentTabs.findIndex(document=>document === args.toLowerCase());

        if(documentTabs.length < 1){
            documentTabs.push(args);
            store.documentTabs = documentTabs
            fs.writeFileSync(storeURL, JSON.stringify(store))
        }else{
            if(index === -1){
                documentTabs.push(args);
                store.documentTabs = documentTabs
                fs.writeFileSync(storeURL, JSON.stringify(store))
            }
        }
    })
}

function getDocumentTabs(storeURL){
    ipcMain.handle('getDocumentTabs', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documentTabs } = store;
        return documentTabs
    })
}

function removeFromDocumentTabs(storeURL){
    ipcMain.handle('removeFromDocumentTabs', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documentTabs } = store;

        //filter args from tabs
        const filteredTabs = documentTabs.filter(tab => tab !== args)

        store.documentTabs = filteredTabs
        fs.writeFileSync(storeURL, JSON.stringify(store))
    })
}

function setActiveDocument(storeURL){
    ipcMain.handle('setActiveDocument', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents, documentTabs } = store
        //args contains only document's name
        //asign the name to the activeDocument

        let indexInDocument = documents.findIndex(document=>document.name === args);
        let indexIndocumentTabs = documentTabs.findIndex(documentTab=>documentTab === args);
        if(indexInDocument !== -1 && indexIndocumentTabs !==-1 ){
            store.activeDocument = args
            fs.writeFileSync(storeURL, JSON.stringify(store))
        }else{
            store.activeDocument = ''
            fs.writeFileSync(storeURL, JSON.stringify(store))
        }
    })
}

function getActiveDocument(storeURL){
    ipcMain.handle('getActiveDocument', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents, activeDocument } = store;
        //get activeDocument

        //use the name and filter the document to get only the require document
        let activeDoc = {};
        if(activeDocument){
            activeDoc = {...(documents.filter(document=>document.name === activeDocument)[0])}
            return activeDoc
        }else{
            return activeDoc
        }
    })
}

function auth(storeURL){
    ipcMain.handle('auth', async (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        
        //use the name to get the document;
        let index = documents.findIndex(document=>document.name === args.name.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}
        }else{

            //get the document
            const doc = documents[index];
            
            //get the password in this document
            const dbPassword = doc.password
            const userPassword = args.password

            //compare this two, if matches, grant the user access, if otherwise send error msg
            const match = await bcrypt.compare(userPassword, dbPassword);
        
            if(match){
                return {msg: 'Access Granted!', status: true}
            }else{
                return {msg: 'Access Denied!', status: false}
            }
        }
    })
}

function checkPasswordRecoveryAnswer(storeURL){
    ipcMain.handle('checkPasswordRecoveryAnswer', async (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        
        let index = documents.findIndex(document=>document.name === args.name.toLowerCase());
        if(index === -1){
            return {msg: 'Document not found!', status: false}
        }else{

            //get the document
            const doc = documents[index];
            
            //get the question answer in this document
            const dbAnswer = doc.answer;
            const userAnswer = args.answer.toLowerCase();

            //compare this answer with the user answer
            const match = await bcrypt.compare(userAnswer, dbAnswer);

            if(match){
                return {msg: 'Matched!', status: true}
            }else{
                return {msg: 'Incorrect!', status: false}
            }
        }
    })
}

function changePassword(storeURL){
    ipcMain.handle('changePassword', async (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        
        let index = documents.findIndex(document=>document.name === args.name.toLowerCase());
        
        if(index === -1){
            return {msg: 'Document not found!', status: false}
        }else{
            if(!args.password){
                return {
                    status: false,
                    msg: 'Set a Password!'
                }
            }else{
                //get the document
                const doc = documents[index];

                // hash the new password
                const hashedPassword = await bcrypt.hash(args.password, 10);

                //set this hashed password in the document
                doc.password = hashedPassword;
                
                //update the documents
                documents[index] = doc;
                store.documents = documents;
                fs.writeFileSync(storeURL, JSON.stringify(store))

                return {
                    status: true,
                    msg: 'New Password has been set'
                }
            }
        }
    })
}

function removeLogo(storeURL){
    ipcMain.handle('removeLogo', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, `utf8`))
        const { documents } = store;
       const index = documents.findIndex(doc=>doc.name === args);
        documents[index].logo = "";

        store.documents = documents;
        fs.writeFileSync(storeURL, JSON.stringify(store));
    })
}

function updateBrand(storeURL){
    ipcMain.handle('updateBrand', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        let { documents, documentTabs, activeDocument } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        let nameAlreadyExist = documents.findIndex(document=>document.name === args.name.toLowerCase());
        if(index === -1){
            return {
                status: false,
                msg: 'No document found!'
            }
        }else{
            // validate
            if(!args.name){
                return {
                    status: false,
                    msg: 'Name is required!'
                }
            }
            //check if name already exists and not equal to the current name
            else if(args.name.toLowerCase() !== args.docName.toLowerCase()){
                if(nameAlreadyExist !== -1){
                    return {
                        status: false,
                        msg: 'Document with the name already exists, Choose a different name'
                    }
                }else{
                     //find the particular document and update
                    documents[index].name = args.name.toLowerCase();
                    documents[index].logo = args.logo;
                    documents[index].address = args.address;
                    documents[index].branch = args.branch;
                    documents[index].about = args.about;
                    documents[index].digest = args.digest;

                    //update document tabs incase the name is changed
                    let tabIndex = documentTabs.indexOf(args.docName);
                    documentTabs[tabIndex] = args.name.toLowerCase();
                    activeDocument = args.name.toLowerCase();

                    //update the store
                    store.documents = documents;
                    store.documentTabs = documentTabs;
                    store.activeDocument = activeDocument;
                    fs.writeFileSync(storeURL, JSON.stringify(store));
                    return {
                        status: true,
                        msg: 'Updated successfully!'
                    }
                }
            }else{

                //find the particular document and update
                documents[index].name = args.name.toLowerCase();
                documents[index].logo = args.logo;
                documents[index].address = args.address;
                documents[index].branch = args.branch;
                documents[index].about = args.about;
                documents[index].digest = args.digest;

                //update document tabs incase the name is changed
                let tabIndex = documentTabs.indexOf(args.docName);
                documentTabs[tabIndex] = args.name;

                //update the store
                store.documents = documents;
                store.documentTabs = documentTabs;
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {
                    status: true,
                    msg: 'Updated successfully!'
                }
            }
        }
    })
}

function updateContacts(storeURL){
    ipcMain.handle('updateContacts', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());

        if(index === -1){
            return {
                status: false,
                msg: 'No document found!'
            }
        }else{
            //save to documents
            resolveContacts(documents[index], args)
            
            //update store
            store.documents = documents;

            // save store
            fs.writeFileSync(storeURL, JSON.stringify(store))
            return { status: true, msg: 'Successful!' }
        }
    })
}

function updatePosConfig(storeURL){
    ipcMain.handle('updatePosConfig', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());

        if(index === -1){
            return {
                status: false,
                msg: 'No document found!'
            }
        }else{
            
            // validate
            if(!args.currency){
                return { status: false, msg: 'Currency is required!' }

            }else if(!args.discount){
                return {status: false, msg: 'Discount is required!'}

            }else{
                 //find the particular document and update
                 documents[index].currency = args.currency;
                 documents[index].discount = args.discount;

                 //update the store
                 store.documents = documents;
                 fs.writeFileSync(storeURL, JSON.stringify(store));
                 return { status: true,  msg: 'Updated successfully!' }
            }
        }
    })
}

module.exports = {
    getAllDocuments,
    insertDocument,

    updateBrand,
    updateContacts,
    updatePosConfig,

    deleteDocument,
    pushToDocumentTabs,
    getDocumentTabs,
    getActiveDocument,
    setActiveDocument,
    removeFromDocumentTabs,
    auth,
    checkPasswordRecoveryAnswer,
    changePassword,
    removeLogo
}