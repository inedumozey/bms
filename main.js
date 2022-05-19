const { app, BrowserWindow, ipcMain, dialog,  } = require("electron");
let isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const appDir = app.getPath("appData");
const baseURL = path.join(appDir, "bmsdb");
const configURL = path.join(appDir, `bmsdb/config.json`);
const storeURL = path.join(appDir,  `bmsdb/store.json`);
const { version } = require('./package.json');

const {
    createWin,
    quitWin,
    maximizeWin,
    minimizeWin,
    winArch
} = require("./src/win/createWin");

const { createDetabase } = require("./src/db/createDatabase");

const {
    sendConfig, 
    changeTheme, 
    changeLayout, 
    zoomin, 
    zoomout, 
    sendVersion 
} = require("./src/config/config");

const {
    getAllDocuments,
    insertDocument,

    updateBrand,
    updateContacts,

    deleteDocument,
    pushToDocumentTabs,
    getDocumentTabs,
    getActiveDocument,
    setActiveDocument,
    removeFromDocumentTabs,
    auth,
    checkPasswordRecoveryAnswer,
    changePassword,
    removeLogo,
    updatePosConfig,
} = require("./src/store/doc");

const {
    pushToItemTabs,
    setActiveItem,
    removeFromItemTabs
} = require("./src/store/item");

const {
    addInventory,
    updateInventory,
    deleteInventory,
    clearInventory,
} = require("./src/store/inventory");
const {
    addTempSales,
    deleteTempSales,
    clearTempSales,
    updateTempSales,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
    pushTempToInvoice,
    deleteInvoice,
    updateInvoice,
} = require("./src/store/invoice");

const {
    addWhatsapp,
    addPhone,
    addFacebook,
    addEmail,
    addTwitter,
    addInstagram,
    addWebsites,
    addOthers,
    filterInvoiceContacts
} = require("./src/store/invoiceConfig");

const {
    exportExcel,
} = require("./src/win/export");


// create database
createDetabase(baseURL, configURL, storeURL)

//get all configs
let allConfigs={}

function getAllConfigs(){
    const config = JSON.parse(fs.readFileSync(configURL, 'utf8'));
    allConfigs = config;
}
getAllConfigs()


let win;
function createMainWin(){
    //create main window
    win = createWin(BrowserWindow, path, allConfigs)
    //loads render view
    isDev ? win.loadURL('http://localhost:3000') : win.loadFile('views/build/index.html')
    
    // update window size in config.json when the system resizes
    win.on('resized', ()=>{
        winArch(win, configURL, "size", getAllConfigs)
    })
    
    // update window cordinate in confiq.json when the window moves
    win.on('move', ()=>{
        winArch(win, configURL, "cord", getAllConfigs)
    });

    //global shortcuts

    //set default zoom level limits
    // win.webContents.setVisualZoomLevelLimits(0, 5);

    //set zoom val    
    zoomin(win, configURL, getAllConfigs)
    zoomout(win, configURL, getAllConfigs);

    win.on("closed", ()=>win = null);
    
    quitWin(win)
    maximizeWin(win)
    minimizeWin(win)

    //export data to excel
    exportExcel(win)
    
}

app.on("ready", ()=>{
    //create window
    createMainWin();
    
    sendConfig(configURL);
    sendVersion(version);
    changeTheme(configURL);
    changeLayout(configURL);

    getAllDocuments(storeURL);
    insertDocument(storeURL);
    deleteDocument(storeURL);
    getDocumentTabs(storeURL);
    pushToDocumentTabs(storeURL);
    removeFromDocumentTabs(storeURL);
    getActiveDocument(storeURL);
    setActiveDocument(storeURL);
    auth(storeURL);
    checkPasswordRecoveryAnswer(storeURL)
    changePassword(storeURL)
    pushToItemTabs(storeURL)
    setActiveItem(storeURL)
    removeFromItemTabs(storeURL)
    removeLogo(storeURL);

    updateBrand(storeURL);
    updateContacts(storeURL);
    updatePosConfig(storeURL);

    //inventory
    addInventory(storeURL);
    updateInventory(storeURL);
    deleteInventory(storeURL);
    clearInventory(storeURL);

    //invoice
    addTempSales(storeURL);
    deleteTempSales(storeURL);
    clearTempSales(storeURL);
    updateTempSales(storeURL);
    addPaymentMethod(storeURL);
    updatePaymentMethod(storeURL);
    removePaymentMethod(storeURL);
    pushTempToInvoice(storeURL);
    deleteInvoice(storeURL);
    updateInvoice(storeURL);

    //invoice config
    addWhatsapp(storeURL);
    addPhone(storeURL);
    addFacebook(storeURL);
    addEmail(storeURL);
    addTwitter(storeURL);
    addInstagram(storeURL);
    addWebsites(storeURL);
    addOthers(storeURL);
    filterInvoiceContacts(storeURL);
})




app.on("window-all-closed", ()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('active', ()=>{
    if(win===null){
        createWin()
    }
})

