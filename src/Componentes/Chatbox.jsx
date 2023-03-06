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
  const dispatch            = useDispatch();

  return (
    <div className={`${bool_isChatExpanded ? 'w-90p' : 'w-66p'} h-screen gris-buscador overflow-hidden relative`}>
      <Header />
      <VerticalCarouselChat items={[
        {'bool_isUser': true, 'str_message': 'Can you recommend a good restaurant in the area?'},
        {'bool_isUser': false, 'str_message': 'Absolutely! I highly recommend trying the Italian restaurant down the street called La Trattoria. Their pasta is amazing!'},
        {'bool_isUser': false, 'str_message': 'Have you tried any good wine bars in the area?'},
        {'bool_isUser': true, 'str_message': 'Not yet, do you have any recommendations?'},
        {'bool_isUser': false, 'str_message': 'Yes, there is a great wine bar called Vino y Tapas on Main Street. Their selection is fantastic!'},
        {'bool_isUser': true, 'str_message': 'Thanks for the recommendation!'},
        {'bool_isUser': false, 'str_message': 'You re welcome, enjoy!'}]}>
      </VerticalCarouselChat>

      <button className='w-4 h-14 text-center flex flex-col justify-center fixed top-1/2 chat-user text-white rounded-full rounded-tl rounded-bl'  onClick={()=> dispatch(change()) }>
        <i class={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
      </button>

      <MessageSender />
      

    </div>
  )
}

export default Chatbox