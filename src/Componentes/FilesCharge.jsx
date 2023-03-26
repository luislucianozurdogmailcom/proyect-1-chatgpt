import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {change} from '../Reducers/chatExpand'
import FileUpload from './FileUpload';
import FileList from './FileList';
import styled from 'styled-components';



const FilesCharge = () => {

    const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);
    //const list_filesSelected  = useSelector((state) => state.filesSelected.list_filesSelected)
    const dispatch            = useDispatch();



  return (
    <div className={`w-100 h-screen items-center overflow-hidden relative d-flex justify-content-start align-items-center m-0`}>
      <div className='position: relative'>
        <ToggleButton className='w-4 h-14 btn btn-primary position-absolute top-50 translate-middle-y start-0 chat-user text-white'  onClick={()=> dispatch(change()) }>
          <i className={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
        </ToggleButton> 
      </div>

      <div className='w-100 h-100 d-flex justify-content-center align-items-center flex-column'>
        <FileUpload />
        <FileList />
      </div>
        
    </div>
  )
}

export default FilesCharge

const ToggleButton = styled.button`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 15px 15px 0px;
`;