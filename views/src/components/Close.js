import React from 'react';

function Close({close, style={}}) {
    return (
        <div
            onClick={close}
            style={{
                position: 'absolute',
                right: '10px',
                width: '17px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '17px',
                cursor: 'pointer',
                top: '5px',
                background: '',
                borderRadius: '50%',
                ...style,
            }}
        >
            <div onClick={close} className="quit">
                <div onClick={close}></div>
            </div>
        </div>
    );
}


export default Close;