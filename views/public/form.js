import React, {useRef, useEffect, useState} from 'react';
import DragFile from './DragFile';

function DocForm({}) {
    const nameRef = useRef(null);

    const initialState = {
        name: '',
        address: '',
        branch: '',
        about: '',
        appreciation: '',
        documentType: '',
        logo: '',
        facebook: [],
        twitter: [],
        instagram: [],
        whatsapp: [],
        call: [],
        createdAt: new Date(),

    }
    const [ val, setVal ] = useState(initialState)

    useEffect(()=>{
        nameRef.current.focus()
    }, [])

    return (
        <div className='addForm'>
            <h3 className="form-title">Create A Document</h3>
            <form className='scrollY'>
                <div className="form-group-board">
                    <div className="form-group">
                        <label htmlFor="">Company Name: <span>*</span></label>
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder='Your Company Name'
                        />
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">Address:</label>
                            <textarea
                                    name=""
                                    style={{padding: '5px 10px 0 10px'}}
                                    placeholder='Address'
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Branch:</label>
                            <input
                                type="text"
                                placeholder='Branch'
                            /> 
                        </div>             
                    </div>
                </div>

                <div className="form-group-board">
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">About:</label>
                            <textarea
                                    name=""
                                    style={{padding: '5px 10px 0 10px'}}
                                    placeholder='About'
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Appreciation:</label>
                            <textarea
                                    name=""
                                    style={{padding: '5px 10px 0 10px'}}
                                    placeholder='A World For Your Customer'
                            ></textarea>
                        </div>  
                    </div>           
                </div>

                <div className="form-group-board">
                    <div className="form-group">
                        <label htmlFor="">Document Type: <span>*</span></label>
                        <select name="" id="">
                            <option value="">Regular</option>
                        </select>
                    </div>           
                </div>

                <div className="form-group-board">
                    <label htmlFor="" style={{textAlign: 'center'}}>Contacts</label>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">Facebook</label>
                            <input 
                                type="text"
                                placeholder='Your Facebook URL'
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="">Twitter</label>
                            <input 
                                type="text"
                                placeholder='Your Twitter Handle'
                            />
                        </div> 
                    </div> 

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">Instagram</label>
                            <input 
                                type="text"
                                placeholder='Instagram'
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="">WhatsApp</label>
                            <input 
                                type="text"
                                placeholder='Your WhatsApp Contact'
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="">Phone</label>
                            <input 
                                type="text"
                                placeholder='Your Mobile Contact'
                            />
                        </div>  
                    </div>         
                </div>
            </form>
        </div>
    );
}

export default DocForm;