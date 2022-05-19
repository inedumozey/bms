import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Analysis from './Analysis';
import DashboardMainMenu from './DashboardMainMenu';
import Import from './Import';
import Inventory from './Inventory';
import Invoices from './Invoices';
import NoActive from './NoActive';
import POS from './POS';
import Profile from './Profile';
import Sales from './Sales';
import Upload from './Upload';

function DashboardMain() {
    const state = useSelector(state=>state);
    const { activeDocument, activeDashboard } = state;
    const [editingInvoice, setEditingInvoice] = useState(false)
    const initialInvoiceData = {
        id: '',
        createdAt: '',
        updatedAt: '',
        data: [],
        paymentMethod: '',
        contacts: '',
        doc: ''
    };
    const [editingInvoiceData, setEditingInvoiceData] = useState()

    return (
        <>
            <DashboardMainMenu />
            <div className="dashboardMain">
                {
                    (function(){
                        if(activeDashboard === 'Home'){
                            return (
                                activeDocument.active ? 
                                (
                                    activeDocument.active && (function(){
                                        if(activeDocument.active === 'pos'){
                                            return <POS
                                                editingInvoice={editingInvoice}
                                                setEditingInvoice={setEditingInvoice}
                                                editingInvoiceData={editingInvoiceData}
                                                setEditingInvoiceData={setEditingInvoiceData}
                                                initialInvoiceData={initialInvoiceData}
                                            />
                                        }else if(activeDocument.active === 'sales'){
                                            return <Sales />
                                        }else if(activeDocument.active === 'invoices'){
                                            return <Invoices
                                                setEditingInvoice={setEditingInvoice}
                                                setEditingInvoiceData={setEditingInvoiceData}
                                            />
                                        }else if(activeDocument.active === 'inventory'){
                                            return <Inventory />
                                        }else if(activeDocument.active === 'analysis'){
                                            return <Analysis />
                                        }else if(activeDocument.active === 'profile'){
                                            return <Profile />
                                        }
                                    }())
                                ):
                                (
                                    <NoActive />
                                )
                            )
                        }else if(activeDashboard === 'Import'){
                            return (
                                <Import />
                            )
                        }
                        else if(activeDashboard === 'Upload'){
                            return (
                                <Upload />
                            )
                        }
                    }())
                }
            </div>
        </>
    );
}

export default DashboardMain;