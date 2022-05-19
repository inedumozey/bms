import React , { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../App';
import Feedback from './Feedback';

function Contacts({}) {
    const state = useSelector(state=>state);
    const { activeDocument } = state; 
    const globalState = useContext(GlobalState);

    const [ editing, setEditing ] = useState(false);
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    let whatsapp = ''
    let phone = ''
    let facebook = ''
    let email = ''
    let twitter = ''
    let instagram = ''
    let websites = ''
    let others = ''

    let whatsappF = (function(){ whatsapp += activeDocument.whatsapp.filter(whatsapp=>whatsapp) })();
    let phonef = (function(){  phone += activeDocument.phone.filter(phone=>phone) })();
    let facebookF = (function(){ facebook  += activeDocument.facebook.filter(facebook=>facebook) })();
    let emailF = (function(){ email += activeDocument.email.filter(email=>email) })();
    let twitterF = (function(){ twitter += activeDocument.twitter.filter(twitter=>twitter) })();
    let instagramF = (function(){ instagram += activeDocument.instagram.filter(instagram=>instagram) })();
    let websitesF = (function(){ websites += activeDocument.websites.filter(websites=>websites) })();
    let othersF = (function(){ others += activeDocument.others.filter(others=>others) })();
    
    const initState = {
        docName: activeDocument.name,
        whatsapp,
        phone,
        facebook,
        email,
        twitter,
        instagram,
        websites,
        others,
    };

    const [ val, setVal ] = useState(initState);

    function updateContacts(data){
        window.api.updateContacts(data).then(res=>{

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

    //filter invoice config to remove any contact in invoice not found in contact list

    function filterInvoiceContacts(){
        window.api.filterInvoiceContacts({docName: activeDocument.name})
    }

    useEffect(()=>{
        filterInvoiceContacts()
    }, [])

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
                <div className="name">CONTACTS</div>
                <div className='contactBody'>
                    {
                        activeDocument.whatsapp.length > 0 ?                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/whatsapp.png').default} alt="" />
                                </div>
                                <div className="link">{whatsapp}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.phone.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/whatsapp.png').default} alt="" />
                                </div>
                                <div className="link">{phone}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.facebook.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/facebook.png').default} alt="" />
                                </div>
                                <div className="link">{facebook}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.email.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/email.png').default} alt="" />
                                </div>
                                <div className="link">{email}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.twitter.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/twitter.png').default} alt="" />
                                </div>
                                <div className="link">{twitter}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.instagram.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/instagram.png').default} alt="" />
                                </div>
                                <div className="link">{instagram}</div>
                            </div>
                        ):''
                    }

                    {
                        activeDocument.websites.length > 0 ?
                        (
                            <div className="linkWrapper">
                                <div className="linkIcon">
                                    <img src={require('../assets/facebook.png').default} alt="" />
                                </div>
                                <div className="link">{websites}</div>
                            </div>
                        ):''
                    }
                    
                    {
                        activeDocument.others.length > 0 ?
                        (
                            <div className="linkWrapper facebook">
                                <div className="linkIcon">
                                    <img src={require('../assets/facebook.png').default} alt="" />
                                </div>
                                <div className="link">{others}</div>
                            </div>
                        ):''
                    }

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
                                    <label>whatsApp:</label>
                                    <input
                                        name='whatsapp'
                                        onChange={getData}
                                        type="text"
                                        value={val.whatsapp}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Phone </label>
                                    <input
                                        name='phone'
                                        onChange={getData}
                                        type="text"
                                        value={val.phone}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Facebook: </label>
                                    <input
                                        name='facebook'
                                        onChange={getData}
                                        type="text"
                                        value={val.facebook}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Email:</label>
                                    <input
                                        name='email'
                                        onChange={getData}
                                        type="text"
                                        value={val.email}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>twitter:</label>
                                    <input
                                        name='twitter'
                                        onChange={getData}
                                        type="text"
                                        value={val.twitter}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Instagram</label>
                                    <input
                                        name='instagram'
                                        onChange={getData}
                                        type="text"
                                        value={val.instagram}
                                    />
                                </div>

                                <div style={{border: '1px soli'}} className="form-group tog">
                                    <label>Websites</label>
                                    <input
                                        name='websites'
                                        onChange={getData}
                                        type="text"
                                        value={val.websites}
                                    />
                                </div>

                                <div className="form-group tog">
                                    <label>Others:</label>
                                    <input
                                        name='others'
                                        onChange={getData}
                                        type="text"
                                        value={val.others}
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

export default Contacts;