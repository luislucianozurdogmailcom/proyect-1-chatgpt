import React, { Fragment } from 'react'
import Header from './Header'
import style from '../css/styles.css'
import VerticalCarouselChat from './VerticalCarouselChat'
import MessageSender from './MessageSender'
import { useSelector, useDispatch } from 'react-redux'
import {change} from '../Reducers/chatExpand'
import {change_wait} from '../Reducers/waitingResponse'
import carga from '../assets/loguito-carga-removebg-preview.png'
import styled from 'styled-components';


const Chatbox = () => {

  // Ponemos la lógica del botón de expansión
  const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);
  const textos              = useSelector((state) => state.chatText.textos);
  const bool_isWaiting      = useSelector((state) => state.waitingResponse.bool_isWaiting);
  const dispatch            = useDispatch();

  return (
    <div className={`w-100 h-screen items-center gris-buscador overflow-hidden relative d-flex`}>

      {/* BUTTON SIDEMENU EXPANDER */}
      <div className='position: relative'>
        <ToggleButton className='w-4 h-14 btn btn-primary position-absolute top-50 translate-middle-y start-0 chat-user text-white'  onClick={()=> dispatch(change()) }>
          <i className={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
        </ToggleButton> 
      </div>

      <div className='w-100 h-100 d-flex justify-content-between align-items-center flex-column'>
        <Header />
        <VerticalCarouselChat items={textos}></VerticalCarouselChat>
        
        {/* LOADER CONTAINER */}
        <div className={`${bool_isChatExpanded ? 'inset-1/2' : 'left-2/3 top-1/2'} h-20 w-20 fixed`}>
          <img src={carga} className={`w-full h-full object-cover animacion-giro ${bool_isWaiting ? '' : 'hidden'}`} />
        </div>
        
        <MessageSender />

      </div>

      
      

    </div>
  )
}

export default Chatbox

const ToggleButton = styled.button`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 15px 15px 0px;
`;