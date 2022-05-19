import React, { useContext } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import UserTab from './UserTab';
import Modal from './Modal';
import { GlobalState } from '../App';
import Auth from './Auth';
import WarnerModal from './WarnerModal';

function AppContainer() {
    const state = useSelector(state=>state);
    const { setting, documentTabs, activeDocument } = state;
    const globalState = useContext(GlobalState)
    
    if(setting && documentTabs && activeDocument){
        return(
            <div
                style={{height: '100vh'}} 

                className={`appContainer ${setting.layout} ${setting.theme} ${setting.sidebarPosition}`}
            >

                <Header />
                { 
                    documentTabs.length > 0 ? <UserTab documentTabs={documentTabs}/> : ''
                }
                <div className={documentTabs.length > 0 ? 'wrapper isTabs' : 'wrapper'}>
                    <Main />
                    <Sidebar />
                </div>
                
                <Footer />
                {
                    globalState.auth.state ? <Modal>{<Auth />}</Modal> : ''
                }
                {
                    globalState.warnerModal.state ? <WarnerModal /> : ''
                }
                            
            </div>
        )
    }else{
        return ''
    }
}

export default AppContainer;