import React, { useContext} from 'react';
import { GlobalState } from '../App';

function Modal({children}) {
    const globalState = useContext(GlobalState)

    function closeModal(e){
        if(e.target === e.currentTarget){
            globalState.setAuth({
                doc: '',
                state: false,
                for: ''
            });

            globalState.setWarnerModal({
                state: false,
                data: '',
                for: ''
            })
        }
    }
    
    return (
        <div
            onClick={closeModal}
            className='modal'>
            <div className="child">
                <div
                    onClick={closeModal}
                    className="closeBtn"><div onClick={closeModal}></div></div>
                {children}
            </div>
        </div>
    );
}

export default Modal;