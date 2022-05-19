import React, { useContext, useRef, useEffect} from 'react';
import { GlobalState } from '../App';

function WarnerModal() {
    const focusRef = useRef()
    const globalState = useContext(GlobalState)
    function closeModal(e){
        if(e.target === e.currentTarget){
            globalState.setWarnerModal({
                state: false,
                data: '',
                for: ''
            })
        }
    }

    function handleClick(e){
        e.preventDefault();
        if(e.target.name === 'confirm'){
            if(globalState.warnerModal.for === 'deleteDocument'){
                if(!globalState.warnerModal.data.protected){
                    globalState.freeDeleteDocument(globalState.warnerModal.data);
                    globalState.setWarnerModal({
                        state: false,
                        data: '',
                        for: ''
                    })
                }else{
                    globalState.deleteDocumentWithAuth(globalState.warnerModal.data);
                    globalState.setWarnerModal({
                        state: false,
                    })
                }
            }else if(globalState.warnerModal.for === 'clearInventory'){
                window.api.clearInventory({ docName: globalState.warnerModal.data});
                globalState.getDocuments();
                globalState.getActiveDoc();

                globalState.setWarnerModal({
                    state: false,
                    data: '',
                    for: '',
                    text: '',
                    title: ''
                })
            }else if(globalState.warnerModal.for === 'deleteInventory'){
                window.api.deleteInventory({ docName:globalState.warnerModal.data.docName, id:globalState.warnerModal.data.id});
                globalState.getDocuments();
                globalState.getActiveDoc();

                globalState.setWarnerModal({
                    state: false,
                    data: '',
                    for: '',
                    text: '',
                    title: ''
                })
            }else if(globalState.warnerModal.for === 'deleteInvoice'){
                //delete invoice
                window.api.deleteInvoice({docName: globalState.warnerModal.data.docName, id: globalState.warnerModal.data.id});
                globalState.getDocuments();
                globalState.getActiveDoc();

                globalState.setWarnerModal({
                    state: false,
                    data: '',
                    for: '',
                    text: '',
                    title: ''
                })
            }
        }
        
        else if(e.target.name === 'cancel'){
            globalState.setWarnerModal({
                state: false,
                data: '',
                for: ''
            });
        }
    }

    useEffect(()=>{
        focusRef.current.focus()
    }, [])

    return (
        <div
            onClick={closeModal}
            className='modal'>
            <div className="child">
                <div
                    onClick={closeModal}
                    className="closeBtn"
                >
                    <div onClick={closeModal}></div>
                </div> 
                <div className="warner">
                    <div className='warner-title'>
                        <div><h1>?</h1></div>
                        <h2>{globalState.warnerModal.title ? globalState.warnerModal.title : 'Delete'}</h2>
                    </div>
                    <div className='warner-body'>{globalState.warnerModal.text ? globalState.warnerModal.text : 'Are you sure you want to parmanently delete this?'}</div>
                    <form onClick={handleClick} className='warner-actions'>
                        <button name='confirm' ref={focusRef}>Confirm</button>
                        <button name='cancel'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WarnerModal;