import React , { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import Feedback from './Feedback';

function POSConfig({}) {
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
        currency: activeDocument.currency,
        discount: activeDocument.discount
    };

    const [ val, setVal ] = useState(initState);

    function updateContacts(data){
        window.api.updatePosConfig(data).then(res=>{

            if(!res.status){
                setFeedBack({...res});
                setEditing(true);
            }else{
                setFeedBack({...res});
                globalState.getDocuments();
                globalState.getActiveDoc();
                setEditing(false);
                setVal(initState);

                window.location.reload(false)
            }
        });
    }

    function getData(e){
        const { name, value } = e.target;
        setVal({...val, [name]: value })
    }

    function handleSave(e){
        if(e.target === e.currentTarget){
            updateContacts(val);
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

    return (
            
        <div>
            <div className="box contacts">
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
                <div className="name">POS CONFIGURATION</div>
                <div className='contactBody'>
                    <div className="linkWrapper">
                        <div className="link">Discount: {activeDocument.discount}%</div>
                    </div>

                    <div className="linkWrapper">
                        <div className="link">Currency: {activeDocument.currency}</div>
                    </div>

                </div>
                
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

                                <div className="form-group tog">
                                    <label>Discount:</label>
                                    <input
                                        name='discount'
                                        onChange={getData}
                                        type="text"
                                        value={val.discount}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Currency </label>
                                    <input
                                        name='currency'
                                        onChange={getData}
                                        type="text"
                                        value={val.currency}
                                    />
                                </div>
                            </form>
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

export default POSConfig;