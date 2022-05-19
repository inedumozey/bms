const { ipcMain } = require('electron')
const fs = require('fs')

function sendConfig(configURL){
     //send to user
     ipcMain.handle('getSetting', (event, args)=>{
        return JSON.parse(fs.readFileSync(configURL, 'utf8'))
    })
}

function changeTheme(configURL){
    ipcMain.handle('theme', (event, args)=>{
        //read config and updat with the new theme

        const config = JSON.parse(fs.readFileSync(configURL, 'utf8'))
        config.theme = args.input;
        config.winBg = args.bg;

        // write the new config
        fs.writeFileSync(configURL, JSON.stringify(config))
    })
}

function changeLayout(configURL){
    ipcMain.handle('layout', (event, args)=>{
        //read config and updat with the new theme

        const config = JSON.parse(fs.readFileSync(configURL, 'utf8'))
        config.layout = args;

        // write the new config
        fs.writeFileSync(configURL, JSON.stringify(config))
    })
}

function changeZoomVal(win, configURL, zoomVal, zoomState, allConfigsCallBack ){
    //read config and get current zoom level

    const config = JSON.parse(fs.readFileSync(configURL, 'utf8'))
    const currentZoomLevel = Number(config.arch.zoomVal);

    if(zoomState == 'zoomout'){
        if(currentZoomLevel  <= 3){
            //add zoom level from the user to the current zoom level;
            const newZoomLevel = currentZoomLevel + Number(zoomVal);

            //update config with the new zoom level
            config.arch.zoomVal = newZoomLevel.toFixed(1)
            fs.writeFileSync(configURL, JSON.stringify(config))
            allConfigsCallBack()
            win.webContents.setZoomFactor(newZoomLevel)
        }

    }else if(zoomState == 'zoomin'){
        if(currentZoomLevel  >= 0.8){
            //subtract zoom level from the user to the current zoom level;
            const newZoomLevel = currentZoomLevel - Number(zoomVal);

            //update config with the new zoom level
            config.arch.zoomVal = newZoomLevel.toFixed(1)
            fs.writeFileSync(configURL, JSON.stringify(config))
            allConfigsCallBack();
            win.webContents.setZoomFactor(newZoomLevel)
        }
    }
}

function zoomout(win, configURL, allConfigsCallBack){
    ipcMain.handle('zoomout', (event, args)=>{
        changeZoomVal(win, configURL, args, 'zoomout', allConfigsCallBack);
    })
}

function zoomin(win, configURL, allConfigsCallBack){
    ipcMain.handle('zoomin', (event, args)=>{
        changeZoomVal(win, configURL, args, 'zoomin', allConfigsCallBack);
    })
}

function sendVersion(version){
    ipcMain.handle('version', (event, args)=>{
        return version
    })
}

module.exports = { sendConfig, changeTheme, changeLayout, zoomin, zoomout, sendVersion }