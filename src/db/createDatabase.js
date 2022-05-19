const fs = require('fs');
const { dexToHex } = require("../packages/dexToHex");

const defaultConfig = {
    theme: 'themeDark',
    layout: 'leftLayout',
    winBg: dexToHex(38, 38, 38),
    arch: {
        zoomVal: 1,
        flap: 0,
        Xcord: 217,
        Ycord: 0,
        width: 932,
        height: 768,
        minWidth: 400,
        minHeight: 269,
    },
    hotkeys: {
        quitKeys: 'CommandOrControl + Q',
        ctrlKeys: 'CommandOrControl + shift + C',
        print: 'CommandOrControl + P',
        settingKeys: 'CommandOrControl + shift + S',
        zoomOutKeys: 'CommandOrControl + +',
        zoomInKeys: 'CommandOrControl + -',
    }
}

const defaultStore = {
    documents: [],
    documentTabs: [],
    activeDocument: ''
}


function createDetabase(baseURL, configURL, storeURL){
    const isBaseURL = fs.existsSync(baseURL);
    const isConfigURL = fs.existsSync(configURL);
    const isStoreURL = fs.existsSync(storeURL);

    //if bms dir does not exist, create it
    if(!isBaseURL){
        fs.mkdirSync(baseURL);
    }

    //if config file does not exist, create default config
    if(!isConfigURL){
        fs.writeFileSync(configURL, JSON.stringify(defaultConfig), 'utf8');
    }

    //if user file does not exist, create default store
    if(!isStoreURL){
        fs.writeFileSync(storeURL, JSON.stringify(defaultStore), 'utf8');
    }
}

module.exports = { createDetabase }