const {xl} = require('@mozeyinedu/xl')
const { ipcMain } = require('electron')

function exportExcel(win){
    ipcMain.handle("exportExcel", async (event, args)=>{

        let filepath = await xl.jsonToExcel({
            window: win,
            data: args.data,
            save: true,
            title: 'Save',
            filename: args.filename
        });

        if(filepath){
            return filepath;
        }
    })
}

module.exports = {
    exportExcel
}