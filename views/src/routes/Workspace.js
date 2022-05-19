import React from 'react';
import { Outlet } from 'react-router-dom'

function Workspace({}) {
    return (
        <div className='workspace'>
            <Outlet />
        </div>
    );
}

export default Workspace;