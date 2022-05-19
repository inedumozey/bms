import React from 'react';

function Radio({check, style, checkedOuterColor, checkedInnerColor}) {
    return (
        <div
            style={{
                width:'16px',
                height:'16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin:'2px',
                border: check ? '' : '1px solid green',
                background: check ? (checkedOuterColor ? checkedOuterColor : 'green' ) : 'transparent',
                ...style,
                borderRadius: '50%',
        }}
        >
            <div style={{
                width:'65%',
                height: '65%',
                borderRadius: '50%',
                background: check ? (checkedInnerColor ? checkedInnerColor : '#fff' ) : 'transparent',
            }}>

            </div>
        </div>
    );
}

export default Radio;