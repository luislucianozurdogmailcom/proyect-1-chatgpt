import React from 'react'
import { useState } from 'react'
import {addFiles, removeFiles} from '../Reducers/filesSelected';
import { useDispatch, useSelector } from 'react-redux';

const bold = {
    fontWeight: "bold"
  };
const FileUpload = () => {

    const list_filesSelected = useSelector((state) => state.filesSelected.list_filesSelected);
    const dispatch           = useDispatch();

    const handleFileDrop = event => {
        event.preventDefault();

        // Serializamos el archivo
        const fileList = event.dataTransfer.files;

        // Lo guardamos en la variable de estado list_filesSelected
        dispatch(addFiles(fileList[0]));

        console.log(list_filesSelected[0]);
    };
      

    return (
    <form className='w-90p h-1/4 m-auto my-10'>
        <div onDrop={handleFileDrop} onDragOver={event => event.preventDefault()} onDragEnter={event => event.preventDefault()} className='bg-gray-200 rounded-xl w-full h-full flex flex-col justify-center items-center'>

            <svg width="90" height="72" viewBox="0 0 90 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.3143 58.4321H49.2383V39.6917L56.3775 46.8309L62.6243 40.5841L44.7763 22.7361L26.9283 40.5841L33.1751 46.8309L40.3143 39.6917V58.4321ZM9.08031 71.8181C6.62621 71.8181 4.52461 70.9436 2.77551 69.1945C1.02641 67.4454 0.153344 65.3452 0.156319 62.8941V9.35015C0.156319 6.89605 1.03087 4.79445 2.77997 3.04535C4.52908 1.29624 6.62919 0.42318 9.08031 0.426155H35.8523L44.7763 9.35015H80.4723C82.9264 9.35015 85.028 10.2247 86.7771 11.9738C88.5262 13.7229 89.3992 15.823 89.3963 18.2741V62.8941C89.3963 65.3482 88.5217 67.4498 86.7726 69.1989C85.0235 70.948 82.9234 71.8211 80.4723 71.8181H9.08031Z" fill="#2A85FF"/>
            </svg>

            <span className='text-lg font-light mt-2' style={bold}>
                Drag & drop your files here
            </span>

            <span className='text-md font-light mt-2 text-gray-400'>
                Maximun file size 500MB
            </span>
        </div>
    </form>
  )
}

export default FileUpload