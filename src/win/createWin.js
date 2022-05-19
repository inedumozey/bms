const { ipcMain } = require("electron");
 const fs = require('fs');

function createWin(BrowserWindow, path, allConfigs={
    width: 900,
    height: 600,
    x: 123,
    y: 17,
}){
    return new BrowserWindow({
        width: allConfigs.arch.width,
        height: allConfigs.arch.height,
        minWidth: allConfigs.arch.minWidth,
        minHeight: allConfigs.arch.minHeight,
        x: allConfigs.arch.Xcord, 
        y: allConfigs.arch.Ycord,
        frame: false,
        autoHideMenuBar: true,
        title: 'BMS',
        backgroundColor: allConfigs.winBg,
        webPreferences:{
            preload: path.join(__dirname, "./preload.js")
        }
    });
}


function winArch(win,  configURL, component, allConfigsCallBack){
    const data = JSON.parse(fs.readFileSync(configURL, "utf8"));

    if(component === "size"){
        data.arch.width =  win.getBounds().width;
        data.arch.height = win.getBounds().height;

        fs.writeFileSync(configURL, JSON.stringify(data));

        // call allConfigs function to fetch the updated config as the window resizes
        allConfigsCallBack();

    }else if(component === 'cord'){
        data.arch.Xcord =  win.getBounds().x;
        data.arch.Ycord = win.getBounds().y;

         // call allConfigs function to fetch the updated config as the window moves
        fs.writeFileSync(configURL, JSON.stringify(data));

        allConfigsCallBack();
    }
}


 function quitWin(win){
    ipcMain.handle('quit', (event, args)=>{
        win.close();
    })
 }

 function maximizeWin(win){
    ipcMain.handle('maximize', (event, args)=>{
        !win.isMaximized() ? win.maximize() : win.unmaximize()
    })
 }

 function minimizeWin(win){
    ipcMain.handle('minimize', (event, args)=>{
        win.minimize();
    })
 }
module.exports = { createWin, quitWin, maximizeWin, minimizeWin, winArch }