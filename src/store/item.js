const { ipcMain } = require('electron')
const fs = require('fs');

function pushToItemTabs(storeURL){
    ipcMain.handle('pushToItemTabs', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { documents, activeDocument } = store;
        //look for doc in the args in activeDocument and documents;
        const found = activeDocument === args.docName;
        let index = documents.findIndex(document=>document.name === args.docName)
        
        if(found && index !==-1){
            //get the documents and push into its tabs if not in the tab already
            const docTabIndex = documents[index].tabs.findIndex(tab=>tab === args.item)
            if(docTabIndex === -1){
                documents[index].tabs.push(args.item);
                //update the store document tabs and activeDocument tabs at same time
                store.documents = documents
                fs.writeFileSync(storeURL, JSON.stringify(store));
                return {status: true, msg: ''}
            }
        }
    })
}

function setActiveItem(storeURL){
    ipcMain.handle('setActiveItem', (event, args)=>{
        
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { activeDocument, documents } = store;
        //look for doc in the args in activeDocument and documents;
        
        const found = activeDocument === args.docName;
        let index = documents.findIndex(document=>document.name === args.docName)
        
        if(found && index !==-1){
            //get the documents and replace the active
            documents[index].active = args.item;
            //update the store document
            store.documents = documents
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {status: true, msg: ''}
        }
    })
}

function removeFromItemTabs(storeURL){
    ipcMain.handle('removeFromItemTabs', (event, args)=>{
        const store = JSON.parse(fs.readFileSync(storeURL, 'utf8'));
        const { activeDocument, documents } = store;
        //look for doc in the args in activeDocument and documents;
        const found = activeDocument === args.docName;       
        let index = documents.findIndex(document=>document.name === args.docName);
        
        if(found && index !==-1){
            //get the documents and filter args.name from its tabs array
            const filteredDocTab = documents[index].tabs.filter(tab=>tab !== args.item);
            documents[index].tabs = filteredDocTab;

            // update the store
            store.documents = documents;
            fs.writeFileSync(storeURL, JSON.stringify(store));
            return {status: true, msg: ''}
        }
    })
}

module.exports ={
    pushToItemTabs,
    setActiveItem,
    removeFromItemTabs
}