import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {change} from '../Reducers/chatExpand'
import FileUpload from './FileUpload';
import FileList from './FileList';

const FilesCharge = () => {

    const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);
    const dispatch            = useDispatch();



  return (
    <div className={`${bool_isChatExpanded ? 'w-90p' : 'w-66p'} h-screen items-center overflow-hidden relative`}>
        
        <FileUpload />

        <FileList />

        <button className='w-4 h-14 text-center flex flex-col justify-center fixed top-1/2 chat-user text-white rounded-full rounded-tl rounded-bl'  onClick={()=> dispatch(change()) }>
            <i class={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
        </button>

    </div>
  )
}

export default FilesCharge