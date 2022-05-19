export const types ={
    SETTING: 'SETTING',
    THEME: 'THEME',
    QUIT: 'QUIT',
    MAXIMIZE: 'MAXIMIZE',
    MINIMIZE: 'MINIMIZE',
    GENERAL_CONFIG: 'GENERAL_CONFIG',
    LAYOUT: 'LAYOUT',
    ZOOM_OUT: 'ZOOM_OUT',
    ZOOM_IN: 'ZOOM_IN',
    DOCUMENT: 'DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    GET_DOCUMENT_TABS: 'GET_DOCUMENT_TABS',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    PUSH_TO_DOCUMENT_TABS: 'PUSH_TO_DOCUMENT_TABS',
    REMOVE_FROM_DOCUMENT_TABS: 'REMOVE_FROM_DOCUMENT_TABS',
    ACTIVE_DOCUMENT: 'ACTIVE_DOCUMENT',
    GET_ACTIVE_DOCUMENT: 'GET_ACTIVE_DOCUMENT',
    FILTERED_DATA: 'FILTERED_DATA',
    ACTIVE_DASHBOARD_MENU: 'ACTIVE_DASHBOARD_MENU'
}

export function setting_(input){
    return {
        type: types.SETTING,
        payload: input
    }
}

export function winAction(type_){
    if(type_ === 'quit'){
        return {
            type: types.QUIT
        }
    }else if(type_ === 'maximize'){
        return {
            type: types.MAXIMIZE
        }
    }else if(type_ === 'minimize'){
        return {
            type: types.MINIMIZE
        }
    }
    
}

export function changeTheme(input, bg){
    if(input === 'themeDark'){
        return {
            type: types.THEME,
            payload: {input, bg}
        }
    }else if(input === 'themeSilver'){
        return {
            type: types.THEME,
            payload:  {input, bg}
        }
    }else if(input === 'themeWhite'){
        return {
            type: types.THEME,
            payload:  {input, bg}
        }
    }
}

export function changeLayout(input){
    if(input === 'leftLayout'){
        return {
            type: types.LAYOUT,
            payload: input
        }
    }else if(input === 'rightLayout'){
        return {
            type: types.LAYOUT,
            payload: input
        }
    }
}

export function zooming(type_, input){
    if(type_ === 'zoomout'){
        return {
            type: types.ZOOM_OUT,
            payload: input
        }
    }else if(type_ === 'zoomin'){
        return {
            type: types.ZOOM_IN,
            payload: input
        }
    }
}

export function document_(type_, input){
    if(type_ === 'getDocuments'){
        return {
            type: types.DOCUMENT,
            payload: input
        }
    }if(type_ === 'deleteDocument'){
        return {
            type: types.DELETE_DOCUMENT,
            payload: input
        }
    }
}

export function documentTabs_(type_, input){
    if(type_ === 'getDocumentTabs'){
        return {
            type: types.GET_DOCUMENT_TABS,
            payload: input
        }
    }else if(type_ === 'pushToDocumentTabs'){
        return {
            type: types.PUSH_TO_DOCUMENT_TABS,
            payload: input
        }
    }else if(type_ === 'removeFromDocumentTabs'){
        return {
            type: types.REMOVE_FROM_DOCUMENT_TABS,
            payload: input
        }
    }
        
}

export function activeDocument_(type_, input){
    if(type_ === 'setActiveDocument'){
        return {
            type: types.ACTIVE_DOCUMENT,
            payload: input
        }
    }else if(type_ === 'getActiveDocument'){
        return {
            type: types.GET_ACTIVE_DOCUMENT,
            payload: input
        }
    }
}

export function getFilteredData(input){
    return {
        type: types.FILTERED_DATA,
        payload: input
    }
}

export function getActiveDashboard(input){
    return {
        type: types.ACTIVE_DASHBOARD_MENU,
        payload: input
    }
}