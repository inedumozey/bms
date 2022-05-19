import React from 'react';

function Opacity() {
    function addOpacity(el){
        el.style.opacity = '.4';
    };

    function removeOpacity(el){
        el.style.opacity = '1'
    }

    return {
        addOpacity, removeOpacity
    }
}

export default Opacity;