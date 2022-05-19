import React, { useEffect } from 'react';

function Feedback({feedBack, setFeedBack, timeout}) {

    function remove(){
        setFeedBack({
            status: '',
            msg: ''
        })
        timeout = timeout;
    }

   useEffect(()=>{
        const set_timeout = setTimeout(()=>{
            remove()
        }, timeout);

        return ()=>{
            clearTimeout(set_timeout)
        }

   }, [])

    return (
        <>
            {
                (function(){
                    if(!feedBack.status && feedBack.msg){
                        return(
                            <div className='error text-mid'>
                                {feedBack.msg}
                                <div
                                    onClick={remove}   
                                    className="removeBtn">
                                    <div></div>
                                </div>
                            </div>
                        )
                    }else if(feedBack.status && feedBack.msg){
                        return(
                            <div className='success text-mid'>
                                {feedBack.msg}
                                <div
                                    onClick={remove}
                                    className="removeBtn">
                                    <div></div>
                                </div>
                            </div>
                        )
                    }else{
                        return ''
                    }
                }())
            } 
        </>
    );
}

export default Feedback;