import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filter from '@mozeyinedu/filter';
import { getFilteredData } from '../redux/action';

function Search({}) {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const { activeDocument, activeDashboard } = state;
    const [ input, getInput ] = useState('');
    
    useEffect(()=>{
        activeDocument.inventory && filter({
            data: ()=>{
                if(activeDocument.active === 'inventory'){
                    return activeDocument.inventory

                }else if(activeDocument.active === 'invoices'){
                    return activeDocument.invoices

                }else{
                    return []
                }
            },
            input: input,
            keys: ()=>{
                if(activeDocument.active === 'inventory'){
                    return [ 'item', 'category', 'description', 'price']

                }else if(activeDocument.active === 'invoices'){
                    return [ 'id', ]
                }else{

                    return []
                }
            },
            paths: ()=>{
                if(activeDocument.active === 'invoices'){
                    return {
                        clientName: [],
                        price: [],
                    }
                }else{
                    return {
                        empty: []
                    }
                }
            },
            cb: (data)=>dispatch(getFilteredData(data))       
        }) 
    }, [input, activeDocument.inventory])


    return (
        <>
            {
                activeDocument && activeDocument.active && (function(){
                    if(activeDocument.active === 'inventory' && activeDashboard==="Home"){
                        return (
                            <>
                                <input
                                    onInput={(e)=>getInput(e.target.value)}
                                    type="text"
                                    title='Search Inventory with item name, categories, or description'
                                    placeholder='Search Inventory with item name, categories, or description'
                                />
                                <div className='searchIcon'>
                                    <div></div>
                                </div>
                            </>
                        )
                    }
                    else if(activeDocument.active === 'sales' && activeDashboard==="Home"){
                        return (
                            <>
                                <input
                                    onInput={(e)=>getInput(e.target.value)}
                                    type="text"
                                    title='Search Sales with item name, total price'
                                    placeholder='Search Sales with item name, total price'
                                />
                                <div className='searchIcon'>
                                    <div></div>
                                </div>
                            </>
                        )
                    }
                    else if(activeDocument.active === 'invoices' && activeDashboard==="Home"){
                        return (
                            <>
                                <input
                                    title='Search Invoices with invoice ID'
                                    onInput={(e)=>getInput(e.target.value)}
                                    type="text"
                                    placeholder='Search Invoices with invoice ID'
                                />
                                <div className='searchIcon'>
                                    <div></div>
                                </div>
                            </>
                        )
                    }else {
                        return (
                            <>
                                <input
                                    type="text"
                                    title='Disabled!'
                                    disabled
                                />
                                <div className='searchIcon'>
                                    <div></div>
                                </div>
                            </>
                        )
                    }
                }())
            }
        </>
    );
}

export default Search;