import React from 'react';

function Remove({check, style, checkedOuterColor, checkedInnerColor}) {
    return (
        <div
            style={{
                width:'16px',
                height:'16px',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                margin:'2px',
                border: check ? '' : '1px solid red',
                background: check ? (checkedOuterColor ? checkedOuterColor : 'red' ) : 'transparent',
                ...style,
                borderRadius: '50%',

        }}
        >
            <div style={{
                width: '10px',
                height: '2px',
                position: 'absolute',
                transform: 'rotate(45deg)',
                background: check ? (checkedInnerColor ? checkedInnerColor : '#fff' ) : 'transparent',
            }}>

            </div>
            <div style={{
                width: '10px',
                height: '2px',
                position: 'absolute',
                transform: 'rotate(-45deg)',
                background: check ? (checkedInnerColor ? checkedInnerColor : '#fff' ) : 'transparent',
            }}>

            </div>
        </div>
    );
}

export default Remove;