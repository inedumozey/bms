import React , { useContext, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import DropZone from '../hook/DropZone';
import Feedback from './Feedback';

function Brand({ localState }) {
    const logoref = useRef()

    const state = useSelector(state=>state);
    const { activeDocument } = state; 
    const globalState = useContext(GlobalState);

    const [ editing, setEditing ] = useState(false);
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    const initState = {
        docName: activeDocument.name,
        name: activeDocument.name,
        logo: activeDocument.logo,
        address: activeDocument.address,
        branch: activeDocument.branch,
        about: activeDocument.about,
        digest: activeDocument.digest,
    };

    const [ val, setVal ] = useState(initState)

    function updateBrand(data){
        window.api.updateBrand(data).then(res=>{
            if(!res.status){
                setFeedBack({...res});
                setEditing(true);
            }else{
                setFeedBack({...res});
                globalState.getDocuments();
                globalState.getActiveDoc();
                globalState.getDocumentTabs();
                setEditing(false);
                setVal(initState);

                window.location.reload(false);
                
            }
        });
    }

    function getLogo(fileUrl){
        setVal({
            ...val,
            logo: fileUrl
        });
    }

    function getData(e){
        const { name, value } = e.target;
        setVal({...val, [name]: value })
    }

    function handleSave(e){
        if(e.target === e.currentTarget){
            updateBrand(val);
        }
    }

    function handleCancel(){
        setEditing(false);
        setVal(initState);
    }

    function handleEdit(e){
        if(e.target === e.currentTarget){
            setEditing(true)
            
        }
    }

    function deleteDocument(){
        if(!activeDocument.protected){
            globalState.freeDeleteDocument(activeDocument)
        }else{
            globalState.deleteDocumentWithAuth(activeDocument);
        }
    }

    function openCmd(e){
        if(e.target === e.currentTarget){
            localState.setPostion({
                x: e.offsetX,
                y: e.offsetY,
            });
            localState.setDisplay(true)
        }   

    }

    function removeLogo(){
        window.api.removeLogo(activeDocument.name);
        globalState.getActiveDoc();
        globalState.getDocuments();
    }

    useEffect(()=>{
        logoref.current.addEventListener('contextmenu', openCmd, false)
    })

    return (
            
        <div>
            <div className="box brand">
                <div className="edit">
                    {
                        editing ? 
                        (
                            <div style={{
                                display:'flex',
                                justifyContent: 'space-around'
                            }}>
                                <div
                                    className='editText'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </div>
                                <div
                                    className='editText'
                                    onClick={handleSave}
                                >
                                    Save
                                </div>
                            </div>
                        ):
                        (
                            <div
                                className='editText'
                                onClick={handleEdit}
                            >Edit</div>
                        )
                    }
                </div>
                <div className="name">
                    {activeDocument.name.toUpperCase()}
                    <div className="type text-small">({activeDocument.documentType})</div>
                </div>
                <div
                    className="logoWrapper">
                    <div className="logoBox">
                        <div
                            onContextMenu={openCmd}
                            className="logo">
                            <img
                                onContextMenu={openCmd}
                                src={activeDocument.logo ? activeDocument.logo : require('../assets/folder.png').default}
                                alt="company logo"
                            />
                        </div>
                        <div
                            ref={logoref}
                            className="logoGhostWrapper">
                            {
                                localState.display ? 
                                (
                                    <div
                                        style={{
                                            left: localState.position.x,
                                            top: localState.position.y,
                                            position: 'absolute',
                                            zIndex: 3,
                                            background: 'rgba(255, 255, 255, .9',
                                            padding: '5px 10px',
                                            cursor: 'pointer'
                                        }}
                                        className="popUpFrame text-mid">
                                        <div
                                            style={{color: '#000'}}
                                            onClick={removeLogo}>Remove</div>
                                    </div>
                                ):
                                ('')
                            }
                        </div>
                    </div>

                </div>
                <div className="address acce">Address: {activeDocument.address ? activeDocument.address : 'Nill'}</div>
                <div className="branch acce">Branch: {activeDocument.branch ? activeDocument.branch : 'Nill'}</div>
                <div className="about acce">About: {activeDocument.about ? activeDocument.about : 'Nill'}</div>
                <div className="digest acce">Digest: {activeDocument.digest ? activeDocument.digest : 'Nill'}</div>
                {
                    editing ?
                    (
                        <div className='editForm'>
                            <form className='form'>
                                <Feedback
                                    feedBack={feedBack}
                                    setFeedBack={setFeedBack}
                                    timeout={2000}
                                />
                                <div className="form-group form-group-file">
                                    <div className="dropZone">
                                        <DropZone
                                            getLogo={getLogo}
                                            size={'70'}
                                            showInitialImage={true}
                                            initialImage={ activeDocument.logo}
                                            type={'base64'}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input
                                        name='name'
                                        onChange={getData}
                                        type="text"
                                        value={val.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address: </label>
                                    <input
                                        name='address'
                                        onChange={getData}
                                        type="text"
                                        value={val.address}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Branch: </label>
                                    <input
                                        name='branch'
                                        onChange={getData}
                                        type="text"
                                        value={val.branch}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>About: </label>
                                    <input
                                        name='about'
                                        onChange={getData}
                                        type="text"
                                        value={val.about}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Digest: </label>
                                    <input
                                        name='digest'
                                        onChange={getData}
                                        type="text"
                                        value={val.digest}
                                    />
                                </div>
                            </form>
                            <div
                                onClick={deleteDocument}
                                className="deleteDoc"
                            >
                                Delete Document
                            </div>
                        </div>
                    ):
                    (
                        ''
                    )
                }
            </div>
        </div>
    );
}

export default Brand;