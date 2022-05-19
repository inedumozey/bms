import React from 'react';

function Mark({style, mark, markColor, unmarkOutline}) {
    return (
        <div
            style={{
                ...style,
                margin: '5px',
                border: mark ? '' : (unmarkOutline ? unmarkOutline : '1px solid #444'),
                background: mark ? ( markColor ? markColor : 'green') : 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'rotate(135deg)',
                position: 'relative',
                width: '14px',
                height: '3px',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '9px',
                    height: '3px',
                    border: mark ? '' : (unmarkOutline ? unmarkOutline : '1px solid #444'),
                    background: mark ?( markColor ? markColor : 'green') : 'transparent',
                    top: '3px',
                    left: '7px',
                    transform: 'rotate(100deg)',
                }}
            >

            </div>
        </div>
    );
}

export default Mark;