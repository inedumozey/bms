import React, { useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AppContainer from './components/AppContainer';
import { document_, setting_, documentTabs_, activeDocument_ } from './redux/action';

export const GlobalState = createContext();

function App() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const navigate = useNavigate();
    const [ version, setVersion ] = useState('');
    
    const [ auth, setAuth ] = useState({
        doc: '',
        item: '',
        state: false,
        for: '',
    })
    const [ formModal, setFormModal ] = useState(false)
    const [ warnerModal, setWarnerModal ] = useState({
        state: false,
        data: '',
        for: '',
        title: '',
        text: '',
    })

    function getSetting(){
        window.api.getSetting().then(config=>{
            dispatch(setting_(config));
        });
    }
    
    function getVersion(){
        window.api.version().then(res=>{
            setVersion(res);
        });
    }

    // documents
    function getDocuments(){
        window.api.getDocument().then(res=>{
            dispatch(document_('getDocuments', res))
        });
    }
    function getActiveDoc(){
        window.api.getActiveDocument().then(res=>{
            dispatch(activeDocument_('getActiveDocument', res));
        });
    }

    function getDocumentTabs(){
        window.api.getDocumentTabs().then(res=>{
            dispatch(documentTabs_('getDocumentTabs', res))
        });
    }

    function setActiveDocument(docName){
        dispatch(activeDocument_('setActiveDocument', docName));
        getActiveDoc();
    }

    function removeFromTab(tab, tabs){
        //get the index of tab to be removed
        const index = tabs.indexOf(tab)
        const tabAbove = tabs[index + 1];
        const tabBelow = tabs[index - 1];

        //check if there is tab above, make it active and remove current tab
        if(tabAbove){
            //remove current tab
            dispatch(documentTabs_('removeFromDocumentTabs', tab))
            setActiveDocument(tabAbove);
            getDocumentTabs();
            getActiveDoc();

        }else if(tabBelow){
            //remove current tab
            dispatch(documentTabs_('removeFromDocumentTabs', tab))
            setActiveDocument(tabBelow);
            getDocumentTabs();
            getActiveDoc();

        }else{

            //Neither there is tab above or below the current tab, remove the current tab, and clear active Tab
            
            //remove tab
            dispatch(documentTabs_('removeFromDocumentTabs', tab))
            setActiveDocument({});
            getDocumentTabs();
            getActiveDoc();
        }
    }

    function freeDeleteDocument(doc){
        dispatch(document_('deleteDocument', doc.name));
        getDocuments();
        // navigate('/workspace')

        //check if its in tab, then handle
        let name = doc.name;
        const index = state.documentTabs.findIndex(doc=>doc === name)
        if(index !== -1){
            //handle remove from tab
            removeFromTab(doc.name, state.documentTabs);
        }

        //check if its the active document, then handle
        const activeTab = state.activeDocument.name === doc.name
        if(activeTab){
            //handle remove active tab
            dispatch(documentTabs_('removeFromDocumentTabs', doc))
        }
    }

    function deleteDocumentWithAuth(doc){
        //show auth for delete
        setAuth({
            doc: doc,
            state: true,
            for: 'delete'
        })
    }

    function freeOpenDocument(doc){
        dispatch(documentTabs_('pushToDocumentTabs', doc.name));
        getDocumentTabs();
        setActiveDocument(doc.name);
        navigate('/workspace/activeDocument');
    }

    function openDocumentWithAuth(doc){
        //show auth for open
        setAuth({
            doc: doc,
            state: true,
            for: 'open'
        })
    }

    //items
    function setItemTabs(data){
        const obj = {
            item: data.item,
            docName: data.activeDoc.name
        }
        window.api.pushToItemTabs(obj)
        getDocuments();
        getActiveDoc()
    }

    function setActiveItem(data){
        const obj = {
            item: data.item,
            docName: data.activeDoc.name
        }
        window.api.setActiveItem(obj)
        getDocuments();
        getActiveDoc();
    }

    function removeItemTabs(data){
        const obj = {
            item: data.item,
            docName: data.activeDoc.name
        }
        const index = data.tabs.indexOf(data.item);
        const tabAbove = data.tabs[index + 1];
        const tabBelow = data.tabs[index - 1];

        const tabAboveObj = {
            item: tabAbove,
            activeDoc: data.activeDoc
        }
        const tabBelowObj = {
            item: tabBelow,
            activeDoc: data.activeDoc
        }
        const noTabObj = {
            item: '',
            activeDoc: data.activeDoc
        }

        if(tabAbove){
            window.api.removeFromItemTabs(obj);
            setActiveItem(tabAboveObj)
            getDocuments();
            getActiveDoc();
        }else if(tabBelow){
            window.api.removeFromItemTabs(obj);
            setActiveItem(tabBelowObj)
            getDocuments();
            getActiveDoc();
        }else{
            window.api.removeFromItemTabs(obj);
            setActiveItem(noTabObj)
            getDocuments();
            getActiveDoc();
        }
    }

    function exportData(data){
        window.api.exportExcel(data)
    }

    const globalState={
        getSetting,
        getDocuments,
        getDocumentTabs,
        setActiveDocument,
        removeFromTab,
        formModal,
        setFormModal,
        warnerModal,
        setWarnerModal,
        auth,
        setAuth,
        freeOpenDocument,
        openDocumentWithAuth,
        freeDeleteDocument,
        deleteDocumentWithAuth,
        setItemTabs,
        removeItemTabs,
        setActiveItem,
        getActiveDoc,
        version,
        exportData
    }

    useEffect(()=>{
        getSetting();
        getDocuments();
        getDocumentTabs();
        getActiveDoc();
        getVersion();  
    }, [])

    return (
        <>
            <GlobalState.Provider value={globalState}>
                <AppContainer />
            </GlobalState.Provider>
        </>
    );
}

export default App;