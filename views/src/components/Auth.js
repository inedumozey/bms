import React, {useState, useRef, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../App';

function Auth({}) {

    const globalState = useContext(GlobalState)
    const authInputRef = useRef();
    const navigate = useNavigate()

    const [ auth, setauth ] = useState(true)
    const [ recover, setRecover ] = useState(false)
    const [ changePass, setChangePass ] = useState(false);
    const [ sucess, setSucess ] = useState(false);

    let initialLoginVal = {
        password: ''
    }

    const initialFeedBack = {status: true, msg: ''};
    const [ loginVal, setLoginVal ] = useState(initialLoginVal);
    const [ loginFeedBack, setLoginFeedBack ] = useState(initialFeedBack);

    let initialResetVal = {
        answer: ''
    }
    const [ resetVal, setResetVal ] = useState(initialResetVal);
    const [ resetFeedBack, setResetFeedBack ] = useState(initialFeedBack);

    let initialChangePassVal = {
        password: ''
    }
    const [ changePassVal, setChangePassVal ] = useState(initialResetVal);
    const [ changePassFeedBack, setChangePassFeedBack ] = useState(initialFeedBack);


    function getAuthModal(){
        setauth(true);
        setRecover(false);
        setChangePass(false);
        setResetVal(initialResetVal);
        setLoginVal(initialLoginVal);
        setChangePassVal(initialChangePassVal);
        setLoginFeedBack(initialFeedBack)
    }
    function getChangePasswordModal(){
        setauth(false);
        setRecover(false);
        setChangePass(true);
        setLoginVal(initialLoginVal);
        setResetVal(initialResetVal);
        setChangePassVal(initialChangePassVal);
        setResetFeedBack(initialFeedBack)
        
    }
    function getResetModal(){
        setauth(false);
        setRecover(true);
        setChangePass(false);
        setLoginVal(initialLoginVal);
        setResetVal(initialResetVal);
        setChangePassVal(initialChangePassVal);
        setChangePassFeedBack(initialFeedBack)
    }



    //------------------------------------auth------------------------------------
    function getLoginVal(e){
        const {name, value} = e.target;
        setLoginVal({ ...loginVal, [name]: value })
    }

    function submitLoginData(e){
        e.preventDefault()
        //send the password
        const doc = {
            ...loginVal,
            name: globalState.auth.doc.name
        }
        window.api.auth(doc).then(res=>{
            setLoginFeedBack({...res});

            //if successfull, set a command
            if(res.status){
                if(globalState.auth.for === 'open'){
                    //Now call freeOpenDocument function
                    globalState.freeOpenDocument(globalState.auth.doc);

                    //reset login val
                    setLoginVal(initialLoginVal)

                    //reset globalState.auth
                    globalState.setAuth({
                        doc: '',
                        state: false,
                        for: ''
                    })

                    //now navigate to active documents page
                    navigate('/workspace/activeDocument');

                }else if(globalState.auth.for === 'delete'){
                    //Now call freeDeleteDocument function
                    globalState.freeDeleteDocument(globalState.auth.doc);

                    //reset login val
                    setLoginVal(initialLoginVal)

                    //reset globalState.auth
                    globalState.setAuth({
                        doc: '',
                        state: false,
                        for: ''
                    });

                    //now navigate to workspace page
                    navigate('/workspace');

                }else if(globalState.auth.for === 'itemTab'){

                    //push to item tabs if not already there
                    const data = {
                        item: globalState.auth.item,
                        activeDoc: globalState.auth.doc
                    }
                    globalState.setItemTabs(data);
                    // make active
                    globalState.setActiveItem(data);

                    //reset login val
                    setLoginVal(initialLoginVal)

                    //reset globalState.auth
                    globalState.setAuth({
                        doc: '',
                        item: '',
                        state: false,
                        for: '',
                    });
                }
            }
        })
    }





    //------------------------------------recovery answer------------------------------------
    function getResetVal(e){
        const {name, value} = e.target;
        setResetVal({ ...resetVal, [name]: value })
    }

    function submitResetData(e){
        e.preventDefault()

        //send the data
        const doc = {
            ...resetVal,
            name: globalState.auth.doc.name,
            question: globalState.auth.doc.question
        }
        window.api.checkPasswordRecoveryAnswer(doc).then(res=>{
            setResetFeedBack({...res});
            
            if(res.status){
                setResetVal(initialResetVal)
                getChangePasswordModal()

            }
        })
    }
    



     //------------------------------------change password------------------------------------
    function getChangePassVal(e){
        const {name, value} = e.target;
        setChangePassVal({ ...changePassVal, [name]: value })
    }

    function submitChangePassData(e){
        e.preventDefault()

        //send the data
        const doc = {
            ...changePassVal,
            name: globalState.auth.doc.name
        }
        window.api.changePassword(doc).then(res=>{
            setChangePassFeedBack({...res});
            
            if(res.status){
                setChangePassVal(initialChangePassVal)
                setChangePassFeedBack({...res});
                setauth(false);
                setRecover(false);
                setChangePass(false);
                setSucess(true);

            }
        })
    }


    useEffect(()=>{
        authInputRef.current.focus()
    }, [])
    

    return (
        <div className='auth'>
            {
                (function(){
                    if(auth){
                        return (
                            <h1 className="auth-title">
                                {'Enter Access Password for ' + globalState.auth.doc.name.toUpperCase()}
                            </h1>
                        )
                    }else if(recover){
                        return (
                            <>
                                <h1 className="auth-title">
                                    {'Resetting Password for ' + globalState.auth.doc.name.toUpperCase()}
                                    <div className='text-mid'>
                                        ( Answer the Question below to Reset your Password )
                                    </div>
                                </h1>
                                <div className="question">
                                    {
                                        globalState.auth.doc.question + "?"
                                    }
                                </div>
                                
                            </>
                        )
                    }else if(changePass){
                        return (
                            <h1 className="auth-title">
                                {'Enter New Password for ' + globalState.auth.doc.name.toUpperCase()}
                            </h1>
                        )
                    }else if(sucess){
                        return <div className='success text-mid'>{changePassFeedBack.msg + " for " + globalState.auth.doc.name.toUpperCase()}</div>
                    }
                }())
            }


                   
            
            {
                (function(){
                    if(auth){
                        if(!loginFeedBack.status && loginFeedBack.msg){
                            return <div className='error text-mid'>{loginFeedBack.msg}</div>
                        }else if(loginFeedBack.status && loginFeedBack.msg){
                            return <div className='success text-mid'>{loginFeedBack.msg}</div>
                        }else{
                            return ''
                        }

                    }else if(recover){
                        if(!resetFeedBack.status && resetFeedBack.msg){
                            return <div className='error text-mid'>{resetFeedBack.msg}</div>
                        }else if(resetFeedBack.status && resetFeedBack.msg){
                            return <div className='success text-mid'>{resetFeedBack.msg}</div>
                        }else{
                            return ''
                        }

                    }else if(changePass){
                        if(!changePassFeedBack.status && changePassFeedBack.msg){
                            return <div className='error text-mid'>{changePassFeedBack.msg}</div>
                        }else if(changePassFeedBack.status && changePassFeedBack.msg){
                            return <div className='success text-mid'>{changePassFeedBack.msg}</div>
                        }else{
                            return ''
                        }
                    }
                }())
            }
            



            {
                (function(){
                    if(auth){
                        return (
                            <form onSubmit={submitLoginData}>
                                <div className="form-group">
                                    <input
                                        onChange={getLoginVal}
                                        type="password"
                                        name='password'
                                        value={loginVal.password}
                                        ref={authInputRef}

                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" />
                                </div>
                            </form>
                        )
                    }else if(recover){
                        return (
                            <form onSubmit={submitResetData}>
                                <div className="form-group">
                                    <input
                                        onChange={getResetVal}
                                        type="text"
                                        name='answer'
                                        value={resetVal.answer}
                                        ref={authInputRef}

                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Submit Answer" />
                                </div>
                            </form>
                        )
                    }else if(changePass){
                        return (
                            <form onSubmit={submitChangePassData}>
                                <div className="form-group">
                                    <input
                                        onChange={getChangePassVal}
                                        type="password"
                                        name='password'
                                        value={changePassVal.password}
                                        ref={authInputRef}

                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>
                        )
                    }
                }())
            }




            {
                (function(){
                    if(auth){
                        return (
                            <div
                                onClick={getResetModal}
                                className="recoverPass"
                            >
                                Reset Password
                            </div>
                        )

                    }else if(recover){
                        return (
                            <div
                                onClick={getAuthModal}
                                className="recoverPass"
                            >
                                Login
                            </div>
                        )
                    }
                }())
            }
        </div>
    );
}

export default Auth;