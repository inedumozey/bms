import React, { useState, useRef, useEffect, useContext } from 'react';
import DocumentList from '../components/DocumentList';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import FormModel from '../components/FormModel';

function Explorer() {
    const globalState = useContext(GlobalState)

    let explorerBoxRef = useRef();
    let documentRef = useRef();
    let showAddDocModalBtnRef = useRef();

    const state = useSelector(state=>state);
    const {documents, activeDocument} = state;
    const [docIsReady, setDocIsReady] = useState(false)
    const [docIsEmpty, setDocIsEmpty] = useState(true)

    documents.documents && setTimeout(()=>{
        setDocIsReady(true);
        if(Object.keys(documents.documents).length < 1){
            setDocIsEmpty(true);
        }else{
            setDocIsEmpty(false)
        }
    }, 1000)

    const [ showAddDocModalBtn, setShowAddDocModalBtn ] = useState('hide');


    //right click to show showAddDocModalBtn
    function handleShowAddDocModalBtn(e){
        if(e.target === e.currentTarget){
            const position = { x: e.offsetX, y: e.offsetY }
            showAddDocModalBtnRef.current.style.top = position.y + "px";
            showAddDocModalBtnRef.current.style.left = position.x + "px";
            setShowAddDocModalBtn('show')
        }
    }

    //show FormModal and hide setShowAddDocModalBtn
    function handleShowAddDocModal(){
        setShowAddDocModalBtn('hide');
        globalState.setFormModal(true);
    }

    function removeAddDocModalBtn(e){
        setShowAddDocModalBtn('hide');
    }

    useEffect(()=>{
        document.addEventListener('click', removeAddDocModalBtn, false);
        explorerBoxRef.current.addEventListener('contextmenu', handleShowAddDocModalBtn, false);

        return ()=>{
            setShowAddDocModalBtn('hide')
        }
    }, [])

    return (
        <div className='explorer' ref={documentRef}>
            <div className="workspaceHeader">
                <h1 className="title">EXPLORER</h1>
                <div className="lineWrapper">
                    <div className="line"></div>
                </div>
            </div>
            <div 
                ref={explorerBoxRef}
                className='explorerBox scrolY'>
                    <div
                        ref={showAddDocModalBtnRef}
                        onClick={handleShowAddDocModal}
                        className={`showAddDocModalBtn text-mid ${showAddDocModalBtn}`}
                    >
                        Create a Document
                    </div>
                    {
                        
                        (function(){
                            if(!docIsReady){
                                return (
                                    <div className="waiting">
                                        <div className="waitingImg">
                                            <img src={require('../assets/loading-spinner.gif').default} alt="" />
                                        </div>
                                    </div>
                                )
                            }else{
                                if(docIsEmpty){
                                    return (
                                        <h1 className='text-large' style={{color: '#ccc', height: '40px', marginTop: '30px', fontSize: '2rem', textAlign: 'center'}}> Create A document by right clicking on any empty space</h1>
                                    )
                                }{
                                    return (
                                        documents.documents.map((doc, i)=>{
                                            return (
                                                <div
                                                    key={i}
                                                    className={(function(){
                                                        if(doc.name === activeDocument.name){
                                                            return 'document active'
                                                        }else{
                                                            return 'document'
                                                        }
                                                    }())}
                                                >
                                                    <DocumentList doc={doc}/>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            }
                        }())
                    }
                    
            </div>

            {
                globalState.formModal ? <FormModel /> : ''
            }
        </div>
    );
}

export default Explorer;