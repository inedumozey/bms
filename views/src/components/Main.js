import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../routes/Dashboard';
import Home from '../routes/Home';
import Setting from '../routes/Setting';
import Explorer from '../routes/Explorer';
import Workspace from '../routes/Workspace';

function Main() {

    return (
        <div className='main'>
           <Routes>
               <Route path='/' exac element={ <Home /> }/>
               <Route path='/workspace' element={ <Workspace /> }>
                   <Route path='' element={ <Explorer /> } />
                   {/* render Active document page if not empty */}
                   <Route path='activeDocument' element={ <Dashboard /> } />
               </Route>
               <Route path='/setting' element={ <Setting /> }/>
           </Routes>
        </div>
    );
}

export default Main;