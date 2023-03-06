import React from 'react'
import style from '../css/styles.css'
import { Fragment } from 'react'

const ChatBuble = (item) => {
  return (
    <Fragment>
        
        <div className={`w-full min-h-100 flex flex-col my-auto p-4 justify-center ${item.bool_isUser == true ? 'items-end ' : 'items-start'} `}>
            <div className={`min-h-50 h-full max-w-66p contenedor-central p-5 ${item.bool_isUser == true ? 'chat-user text-white rounded-full rounded-tr' : 'bg-white negro-palabras rounded-full rounded-tl'}`}>
                {item.str_message}
            </div>
        </div>
    
    </Fragment>
  )
}

export default ChatBuble