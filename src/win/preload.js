const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld("api", {
    getSetting: ()=>ipcRenderer.invoke('getSetting'),
    version: ()=>ipcRenderer.invoke('version'),

    auth: (data)=>ipcRenderer.invoke('auth', data),
    checkPasswordRecoveryAnswer: (data)=>ipcRenderer.invoke('checkPasswordRecoveryAnswer', data),
    changePassword: (data)=>ipcRenderer.invoke('changePassword', data),

    quit: ()=>ipcRenderer.invoke('quit'),
    maximize: ()=>ipcRenderer.invoke('maximize'),
    minimize: ()=>ipcRenderer.invoke('minimize'),

    theme: (theme)=>ipcRenderer.invoke('theme', theme),

    layout: (position)=>ipcRenderer.invoke('layout', position),

    zoomin: (val)=>ipcRenderer.invoke('zoomin', val),
    zoomout: (val)=>ipcRenderer.invoke('zoomout', val),

    getDocument: ()=>ipcRenderer.invoke('getDocument'),
    insertDocument: (data)=>ipcRenderer.invoke('insertDocument', data),
    deleteDocument: (name)=>ipcRenderer.invoke('deleteDocument', name),

    pushToDocumentTabs: (docName)=>ipcRenderer.invoke('pushToDocumentTabs', docName),
    removeFromDocumentTabs: (docName)=>ipcRenderer.invoke('removeFromDocumentTabs', docName),
    getDocumentTabs: ()=>ipcRenderer.invoke('getDocumentTabs'),

    getActiveDocument: ()=>ipcRenderer.invoke('getActiveDocument'),
    setActiveDocument: (docName)=>ipcRenderer.invoke('setActiveDocument', docName),

    //items tabs
    pushToItemTabs: (item)=>ipcRenderer.invoke('pushToItemTabs', item),
    removeFromItemTabs: (item)=>ipcRenderer.invoke('removeFromItemTabs', item),
    setActiveItem: (item)=>ipcRenderer.invoke('setActiveItem', item),
    removeLogo: (name)=>ipcRenderer.invoke('removeLogo', name),
    updateBrand: (data)=>ipcRenderer.invoke('updateBrand', data),
    updateContacts: (data)=>ipcRenderer.invoke('updateContacts', data),
    updatePosConfig: (data)=>ipcRenderer.invoke('updatePosConfig', data),

    //inventory
    getInventory: (docName)=>ipcRenderer.invoke('getInventory', docName),
    addInventory: (data)=>ipcRenderer.invoke('addInventory', data),
    updateInventory: (data)=>ipcRenderer.invoke('updateInventory', data),
    deleteInventory: (data)=>ipcRenderer.invoke('deleteInventory', data),
    clearInventory: (docName)=>ipcRenderer.invoke('clearInventory', docName),

    //invoice
    addTempSales: (data)=>ipcRenderer.invoke('addTempSales', data),
    updateTempSales: (data)=>ipcRenderer.invoke('updateTempSales', data),
    deleteTempSales: (data)=>ipcRenderer.invoke('deleteTempSales', data),
    clearTempSales: (docName)=>ipcRenderer.invoke('clearTempSales', docName), 
    addPaymentMethod: (data)=>ipcRenderer.invoke('addPaymentMethod', data), 
    updatePaymentMethod: (data)=>ipcRenderer.invoke('updatePaymentMethod', data), 
    removePaymentMethod: (docName)=>ipcRenderer.invoke('removePaymentMethod', docName), 
    pushTempToInvoice: (data)=>ipcRenderer.invoke('pushTempToInvoice', data), 
    deleteInvoice: (data)=>ipcRenderer.invoke('deleteInvoice', data), 
    
    //invoiceConfig
    addWhatsapp: (data)=>ipcRenderer.invoke('addWhatsapp', data),    
    addPhone: (data)=>ipcRenderer.invoke('addPhone', data),    
    addFacebook: (data)=>ipcRenderer.invoke('addFacebook', data),    
    addEmail: (data)=>ipcRenderer.invoke('addEmail', data),    
    addTwitter: (data)=>ipcRenderer.invoke('addTwitter', data),    
    addInstagram: (data)=>ipcRenderer.invoke('addInstagram', data),    
    addWebsites: (data)=>ipcRenderer.invoke('addWebsites', data),    
    addOthers: (data)=>ipcRenderer.invoke('addOthers', data),    
    filterInvoiceContacts: (data)=>ipcRenderer.invoke('filterInvoiceContacts', data),
    
    //export excel
    exportExcel: (data)=>ipcRenderer.invoke('exportExcel', data),

    
})