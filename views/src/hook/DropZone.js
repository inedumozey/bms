import React, {useState, useRef } from 'react';

function DropZone({getLogo, fileSize=60, showInitialImage=false, initialImage='', type='blob'}) {
    const dragFileRef = useRef(null)
    const [ draggedIn, setDraggedIn ] = useState(false)
    const [ dropped, setDropped ] = useState(false)
    const [ validFile, setValidFile ] = useState(true)
    const [ dropMsg, setDropMsg ] = useState('')
    const [ fileURL, setFileURL ] = useState('')

    function handleClickToUpload(e){

        const memeType = e.target.files[0].type.split('/')[1];
        
        if(memeType === 'png' || memeType === 'jpg' || memeType === 'jpeg'){
            const size =e.target.files[0].size / 1000;
            if(size > fileSize){
                setDropped(true);
                setDraggedIn(false)
                setValidFile(false)
                setDropMsg(`File Size must not be more than ${fileSize}`)
            }else{
                setDropped(true);
                setValidFile(true)
                setDraggedIn(false)
                setDropMsg('')

                //get object url
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                setFileURL(url);
                if(type === 'base64'){
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload =function(){
                        const base64data = reader.result
                        getLogo(base64data);
                    }
                }else{
                    getLogo(url)
                }
            }
        }else{
            setDropped(true);
            setValidFile(false)
            setDraggedIn(false)
            setDropMsg('File must be PNG, JPG or JPEG')
        }
    }

    function handleDragOver(e){
        e.preventDefault();
        e.stopPropagation();
        setDraggedIn(true);
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
    }
    function handleDragEnter(e){
        e.preventDefault();
        e.stopPropagation();
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
            setDraggedIn(true);
            setDropped(false);
            setValidFile(true)
            setDropMsg('')
        }
    }

    function handleDragLeave(e){
        e.preventDefault();
        e.stopPropagation();
        setDraggedIn(false);
        setDropped(false);
        setValidFile(true)
        setDropMsg('')
    }

    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();
        dragFileRef.current.removeEventListener('dragover', handleDragOver, false)
        dragFileRef.current.removeEventListener('dragenter', handleDragEnter, false)

        setDropped(true);
        setValidFile(true)
        setDraggedIn(false)
        setDropMsg('')

        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const memeType = e.dataTransfer.files[0].type.split('/')[1];
            if(memeType === 'png' || memeType === 'jpg' || memeType === 'jpeg'){
                const size = e.dataTransfer.files[0].size / 1000;
                if(size > fileSize){
                    setDropped(true);
                    setDraggedIn(false)
                    setValidFile(false)
                    setDropMsg(`File Size must not be more than ${fileSize}kb`)
                }else{
                    setDropped(true);
                    setValidFile(true)
                    setDraggedIn(false)
                    setDropMsg('')

                    //get object url

                    const file = e.dataTransfer.files[0];
                    const url = URL.createObjectURL(file)
                    setFileURL(url);
                    
                    if(type === 'base64'){
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload =function(){
                            const base64data = reader.result
                            getLogo(base64data);
                        }
                    }else{
                        getLogo(url)
                    }
                }
            }else{
                setDropped(true);
                setValidFile(false)
                setDraggedIn(false)
                setDropMsg('File must be PNG, JPG or JPEG')
            }
           
        }        
    }

    return (
        <div
            className='dragZone'
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <label
                ref={dragFileRef}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'block',
                }}
                className={(function(){
                    if(draggedIn && !dropped){
                        return 'file draggedIn';
                    }
                    if(dropped){
                        if(!validFile){
                            return 'file invalid';

                        }else{
                            return 'file-img';

                        }
                    }else{
                        return 'file';
                    }
                }())} htmlFor="logo">
                <small>
                    
                    {
                        (function(){
                            if(draggedIn && !dropped){
                                return 'You Can Drop Now!';

                            }
                            if(dropped){
                                if(!validFile){
                                    return dropMsg;

                                }else{
                                    return (
                                        <>
                                            <div 
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            >
                                                <img 
                                                    style={{
                                                        objectFit: 'contain',
                                                    }}
                                                    src={fileURL}/>
                                            </div>
                                        </>
                                    );

                                }
                            }else{
                                return <div style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'centre',
                                    alignItems: 'centre',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '100%',
                                        color: '#fff',
                                        fontWeight: 600,
                                        zIndex: 1
                                    }}>
                                        Drag & Drop Your Logo here or Click to Upload
                                    </div>
                                    {
                                        (function(){
                                            if(showInitialImage){
                                                return (
                                                    <img 
                                                        style={{
                                                            objectFit: 'contain',
                                                            filter: 'blur(2px)'
                                                        }}
                                                        src={initialImage} alt="" 
                                                    />
                                                )
                                            }
                                        }())
                                    }
                                </div>;
                            }
                        }())
                    }
                
                </small>   
                <input
                    onChange={handleClickToUpload}
                    type="file"
                    id='logo'
                    accept='image/*'
                    placeholder='Upload your company logo'
                />         
            </label>
        </div>
    );
}

export default DropZone;