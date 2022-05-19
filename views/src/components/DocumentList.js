import React, {useEffect, useState, useRef, useContext} from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GlobalState } from '../App';

function DocumentList({doc}) {
    const docRef = useRef(null);
    const state = useSelector(state=>state);
    const { activeDocument } = state;

    const [ position, setPostion ] = useState({x: 0, y: 0});
    const [ display, setDisplay ] = useState(false);

    const globalState = useContext(GlobalState);

    function openCmd(e){
        if(e.target === e.currentTarget){
            setPostion({
                x: e.offsetX,
                y: e.offsetY,
            });
            setDisplay(true)
        }   
    }

    function closeCmd(e){
        setTimeout(()=>{
            setDisplay(false);
            setPostion({
                x: 0,
                y: 0,
            });
        }, 0)
    }
   
    function openDocument(doc){
        if(!doc.protected){
            globalState.freeOpenDocument(doc)
        }else{
            if(doc.name === activeDocument.name){
                globalState.freeOpenDocument(doc)
            }else{
                globalState.openDocumentWithAuth(doc);
            }
        }
    }

    function deleteDocument(doc){
        globalState.setWarnerModal({
            state: true,
            data: doc,
            type: 'deleteDocument'
        });
    }
    
    useEffect(()=>{
        docRef.current.addEventListener('contextmenu', openCmd, false)
        docRef.current.parentNode.parentNode.addEventListener('click', closeCmd, false);
        
    }, [])

    return (
        <>
            <div className="lock icon mid">
                <img src={doc.protected ? require('../assets/padlock-close.png').default : require('../assets/padlock-open.png').default} alt="" />
            </div>

            <div title={doc.name.toUpperCase()} className='doclist'>
                <div className="img">
                    <img src={doc.logo ? doc.logo : require('../assets/folder.png').default} alt="" />
                </div>
                <div className="nam text-mid text-center">{doc.name.toUpperCase()}</div>
                <div className="type text-mid text-center">{doc.documentType}</div>
                <div className="date text-small text-center">{moment(doc.createdAt).calendar()}</div>
            </div>

            <div
                onDoubleClick={()=>openDocument(doc)}
                className='frame'
                ref={docRef}
            >
                {

                    display ? 
                    (
                        <div
                            style={{
                                left: position.x,
                                top: position.y
                            }}
                            className="popUpFrame text-mid">
                            <div onClick={()=>openDocument(doc)}>Open</div>
                            <div onClick={()=>deleteDocument(doc)}>Delete</div>
                        </div>
                    ):''
                }
            </div>
        </>
    );
}

export default DocumentList;