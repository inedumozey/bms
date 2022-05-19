import { types } from "./action";
import {combineReducers} from 'redux';

const setting=(state=null, {type, payload})=>{

    switch(type){
        case types.SETTING:
            return {...payload};
        break;

        default:
            return state;
    }
}

const winAction=(state={}, {type, payload} )=>{
    switch(type){
        case types.QUIT:
            return window.api.quit();
        break;

        case types.MAXIMIZE:
            return window.api.maximize();
        break;

        case types.MINIMIZE:
            return window.api.minimize();
        break;

        default:
            return state;
    }
}

const changeTheme=(state={}, {type, payload})=>{
    switch(type){
        case types.THEME:
            return window.api.theme(payload)
        break;

        default:
            return state;

    }
}

const layout=(state={}, {type, payload})=>{
    switch(type){
        case types.LAYOUT:
            return window.api.layout(payload);
        break;

        default:
            return state;
    }
}

const zooming=(state={}, {type, payload})=>{
    switch(type){
        case types.ZOOM_OUT:
            return window.api.zoomout(payload);
        break;

        case types.ZOOM_IN:
            return window.api.zoomin(payload);
        break;

        default:
            return state
    }
}

const documents=(state={}, {type, payload})=>{
    switch(type){
        case types.DOCUMENT:
            return payload;
        break;

        default:
            return state;
    }
}

const deleteDocument=(state={}, {type, payload})=>{
    switch(type){
        case types.DELETE_DOCUMENT:
            return window.api.deleteDocument(payload);
        break;

        default:
            return state
    }
}

const documentTabs=(state=null, {type, payload})=>{
    switch(type){
        case types.GET_DOCUMENT_TABS:
            return payload;
        break;

        case types.PUSH_TO_DOCUMENT_TABS:
            return window.api.pushToDocumentTabs(payload);
        break;

        case types.REMOVE_FROM_DOCUMENT_TABS:
            return window.api.removeFromDocumentTabs(payload);
        break;

        default: 
            return state
    }
}

const activeDocument=(state=null, {type, payload})=>{
    switch(type){
        case types.GET_ACTIVE_DOCUMENT:
            return payload;
        break;

        case types.ACTIVE_DOCUMENT:
            return window.api.setActiveDocument(payload);
        break;

        default:
            return state;
    }
}

const filteredData=(state=null, {type, payload})=>{
    switch(type){
        case types.FILTERED_DATA:
            return payload;
        break;

        default:
            return state;
    }
}

const activeDashboard=(state='Home', {type, payload})=>{
    switch(type){
        case types.ACTIVE_DASHBOARD_MENU:
            return payload;
        break;

        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    setting,
    winAction,
    changeTheme,
    layout,
    activeDashboard,
    zooming,
    documents,
    documentTabs,
    activeDocument,
    deleteDocument,
    filteredData
    
})

