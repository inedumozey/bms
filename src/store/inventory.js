const { ipcMain } = require("electron") ;
const fs = require("fs") ;

function addInventory(storeURL){
    ipcMain.handle('addInventory', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());

        if(index === -1){
            return {
                msg: 'Document not found!',
                status: false
            }
        }else{
            if(args.item == ''){
                return {
                    msg: 'Item is required!',
                    status: false
                }
            }
            const obj = {
                id: require('crypto').randomBytes(10).toString('hex'),
                createdAt: new Date(),
                updatedAt: '',
                item: args.item,
                price: args.price,
                description: args.description,
                category: args.category,
                currency: args.currency,
            }
            documents[index].inventory.push(obj);

            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store))
            return {
                msg: args.item + ' added to Inventory!',
                status: true
            }
        }        
    })
}

function updateInventory(storeURL){
    ipcMain.handle('updateInventory', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        
        if(index === -1){
            return {
                status: false,
                msg: 'Document not Found!'
            }
        }else{
            //find the id
            const documentInventoryIndex = documents[index].inventory.findIndex(inventory=>inventory.id === args.id)

            //find the document
            if(documentInventoryIndex === -1){
                return {
                    status: false,
                    msg: 'Invalid ID'
                }
            }else{

                documents[index].inventory[documentInventoryIndex].updatedAt = new Date();
                documents[index].inventory[documentInventoryIndex].item = args.item;
                documents[index].inventory[documentInventoryIndex].price = args.price;
                documents[index].inventory[documentInventoryIndex].description = args.description;
                documents[index].inventory[documentInventoryIndex].category = args.category;
            
                store.documents = documents
                fs.writeFileSync(storeURL, JSON.stringify(store))
                return { status: true, msg: 'Updated Successfully!' }
            }

        }
    })
}

function deleteInventory(storeURL){
    ipcMain.handle('deleteInventory', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());
        const filteredDocumentInventory = documents[index].inventory.filter(inventory=>inventory.id !== args.id)

        documents[index].inventory = filteredDocumentInventory;

        store.documents = documents
        fs.writeFileSync(storeURL, JSON.stringify(store))
        return {
            status: true,
            msg: 'Deleted Successfully!'
        }
    })
}

function clearInventory(storeURL){
    ipcMain.handle('clearInventory', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'))
        const { documents } = store;
        let index = documents.findIndex(document=>document.name === args.docName.toLowerCase());

        documents[index].inventory = [];
        store.document = documents;

        fs.writeFileSync(storeURL, JSON.stringify(store))
        return {
            status: true,
            msg: 'Deleted Successfully!'
        }
    })
}

function exportInventory(window){
    ipcMain.handle('export', async (event, args)=>{
        if(args.data === '' || args.data===[]){
            return {
                status: false,
                msg: 'Empty data cannot be exported!'
            }
        }else{

            // read data to excel

            //open save dialog
        }
    })  
}
module.exports = {
    addInventory,
    updateInventory,
    deleteInventory,
    clearInventory,
    exportInventory
}