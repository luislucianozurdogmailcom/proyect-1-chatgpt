import React, { Fragment } from 'react'
import Header from './Header'
import style from '../css/styles.css'
import VerticalCarouselChat from './VerticalCarouselChat'
import MessageSender from './MessageSender'
import { useSelector, useDispatch } from 'react-redux'
import {change} from '../Reducers/chatExpand'


const Chatbox = () => {

  // Ponemos la lógica del botón de expansión
  const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);
  const textos              = useSelector((state) => state.chatText.textos);
  const dispatch            = useDispatch();

  return (
    <div className={`${bool_isChatExpanded ? 'w-90p' : 'w-66p'} h-screen gris-buscador overflow-hidden relative`}>
      <Header />
      <VerticalCarouselChat items={textos}>
      </VerticalCarouselChat>

      <button className='w-4 h-14 text-center flex flex-col justify-center fixed top-1/2 chat-user text-white rounded-full rounded-tl rounded-bl'  onClick={()=> dispatch(change()) }>
        <i class={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
      </button>

      <MessageSender />
      

    </div>
  )
}

export default Chatbox