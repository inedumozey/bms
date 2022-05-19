import React, {useRef, useEffect, useContext, useState} from 'react';
import Radio from './Radio';
import { GlobalState } from '../App';
import Feedback from './Feedback';

function DocForm({}) {
    const globalState = useContext(GlobalState)
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    

    const [ protection, setProtection ] = useState(false);
    const [ feedBack, setFeedBack ] = useState({
        status: '',
        msg: ''
    });

    const initialState = {
        name: '',
        documentType: 'Regular',
        password: '',
        question: '',
        answer: '',
    }

    const [ val, setVal ] = useState(initialState);

    function toggleProtection(){
        setProtection(!protection);
    }

    function getVal(e){
        const { name, value } = e.target
        setVal({...val, [name]: value})
    }

    function submitForm(e){
        e.preventDefault()
        const data = {...val, protected: protection};
        window.api.insertDocument(data).then(res=>{
            if(!res.status){
                setFeedBack({...res});
            }else{
                setFeedBack({...res});
                setVal(initialState);
                globalState.getDocuments()
            }
        })
        
    }

    useEffect(()=>{
        nameRef.current.focus()
        passwordRef.current.focus()
    }, [protection])

    return (
        <div className='addForm'>
            <h3 className="form-title">Create A Document</h3>
            
            <form onSubmit={submitForm} className='scrollY'>
                <Feedback
                    feedBack={feedBack}
                    setFeedBack={setFeedBack}
                    timeout={10000}
                />
      
                <div className="form-group-board">
                    <div className="form-group">
                        <label htmlFor="">Company Name: <span>*</span></label>
                        <input
                            ref={nameRef}
                            onChange={getVal}
                            type="text"
                            placeholder='Your Company Name'
                            name='name'
                            value={val.name}
                        />
                    </div>
                </div>

                <div className="form-group-board">
                    <div className="form-group">
                        <label htmlFor="">Document Type: <span>*</span></label>
                        <select
                            onInput={getVal}
                            name="documentType"
                            value={val.documentType}
                        >
                            <option value="Regular">Regular</option>
                            <option value="Pharmacy">Pharmacy/Patent Med Store</option>
                            <option value="Telecom">Telecom</option>
                        </select>
                    </div>           
                </div>

                <div className="form-group-board protect-board">
                    <div>
                        <div
                            className="protect"
                            onClick={toggleProtection}
                        >
                            <Radio check={protection} style={{border: '2px solid white'}}/>
                            <div>Protect The Document?</div>
                        </div>
                        <div
                            style={{
                                fontStyle: 'italic', 
                                margin: '5px 0 5px 0', 
                                userSelect:'none', 
                                WebkitUserSelect: 'none'
                            }}
                            className='text-mid'
                        >
                            Note: This protects your Document and Collections from accidental or incidental operations. Also prevents unauthorized users from accessing the document.
                        </div>
                    </div>

                    <div className={protection ? "protect-field" : "protect-field hide"}>
                        <div>
                            <label htmlFor="">Password: <span>*</span></label>
                            <input
                                ref={passwordRef}
                                onChange={getVal}
                                placeholder='Choose a Password'
                                type="password"
                                name="password"
                                value={val.password}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Recovery Question: <span>*</span></label>
                            <input 
                                onChange={getVal}
                                type='text' 
                                placeholder='Type a Recovery Question' 
                                name="question" 
                                value={val.question}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Recovery Answer: <span>*</span></label>
                            <input
                                onChange={getVal}
                                type='text'
                                placeholder='Type the Answer to the Recovery Question'
                                name="answer"
                                value={val.answer}
                            />
                        </div>
                    </div>            
                </div>

                <div className="form-group">
                    <input type="submit" value="Submit" />
                </div>
                       
            </form>
        </div>
    );
}

export default DocForm;