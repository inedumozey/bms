import React, { useContext, useRef } from 'react';
import Opacity from '../hook/Opacity';
import { useDispatch } from 'react-redux'
import { changeTheme, changeLayout, zooming } from '../redux/action';
import { GlobalState } from '../App';
import { useSelector } from 'react-redux';
import Radio from './Radio';
import dexToHex from '../resource/dexToHex';

function HeaderMenu({}) {
    const zoomoutRef = useRef() 
    const zoominRef = useRef()
    const globalState = useContext(GlobalState);
    const state = useSelector(state=>state)
    const { setting } = state

    const dispatch = useDispatch()

    function whiteTheme(){
        // dispatch(changeTheme('themeWhite', dexToHex(38, 38, 38)));
        // globalState.getSetting()
    }
    function silverTheme(){
        dispatch(changeTheme('themeSilver', dexToHex(153, 149, 149)))
        globalState.getSetting()
    }
    function darkTheme(){
        dispatch(changeTheme('themeDark', dexToHex(38, 38, 38)));
        globalState.getSetting()
    }

    function leftLayout(){
        dispatch(changeLayout('leftLayout'));
        globalState.getSetting()
    }
    function rightLayout(){
        dispatch(changeLayout('rightLayout'));
        globalState.getSetting()
    }

    function zoomOut(){
        dispatch(zooming('zoomout', .2))
    }

    function zoomIn(){
        dispatch(zooming('zoomin', .2))
    }

    const { addOpacity, removeOpacity } = Opacity()

    return (
        <div className="menu">
            <div className="menu-list text-mid">
                <div className='text-mid menu-item ellipsis'>Window</div>
                <div className='drop-down'>

                    <li className='flex sidebarItem list'>
                        Theme
                        <div className='lar'></div>
                        <div className='drop-down2'>
                            <div
                                onClick={whiteTheme}
                                className='flex list'>
                                <Radio check={setting.theme === 'themeWhite'}/>
                                <div className='text-mid'>White (default)</div>
                            </div>
                            <div
                                onClick={silverTheme} 
                                className='flex list'>
                                <Radio check={setting.theme === 'themeSilver'}/>
                                <div className='text-mif'>Silver</div>
                            </div>
                            <div onClick={darkTheme} className='flex list'>
                                <Radio check={setting.theme === 'themeDark'}/>
                                <div className='text-mid'>Dark</div>
                            </div>
                        </div>
                    </li>
                    
                    <li className='flex sidebarItem list'>
                        Layout
                        <div className='lar'></div>
                        <div className='drop-down2'>
                            <div
                                onClick={leftLayout}
                                className='flex list'>
                                <Radio  check={setting.layout === 'leftLayout'}/>
                                <div className='text-mid'>Left (default)</div>
                            </div>
                            <div
                                onClick={rightLayout}
                                className='flex list'>
                                <Radio  check={setting.layout === 'rightLayout'}/>
                                <div className='text-mid'>Right</div>
                            </div>
                        </div>
                    </li>

                </div>
            </div>
            <div className="menu-list text-mid">
                <div className='text-mid menu-item ellipsis'>Get Started</div>
            </div>
            <div className="zoom">
                <div
                    ref={zoomoutRef}
                    onClick={zoomOut}
                    onMouseDown={()=>addOpacity(zoomoutRef.current)}
                    onMouseUp={()=>removeOpacity(zoomoutRef.current)}
                    onMouseLeave={()=>removeOpacity(zoomoutRef.current)}
                    className="out icon small round"><div></div>
                </div>
                <div
                    ref={zoominRef}
                    onClick={zoomIn}
                    onMouseDown={()=>addOpacity(zoominRef.current)}
                    onMouseUp={()=>removeOpacity(zoominRef.current)}
                    onMouseLeave={()=>removeOpacity(zoominRef.current)}
                    className="in icon small round"><div></div>
                </div>
            </div>
        </div>
    );
}

export default HeaderMenu;