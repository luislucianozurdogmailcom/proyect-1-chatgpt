import React from 'react'
import style from '../css/styles.css'
import { Fragment } from 'react'
import avatar from '../assets/avatar.png'
import robot from '../assets/images.png'
import TypingText from './TypedText'


const ChatBuble = (item) => {
  return (
    <Fragment>
        
        <div className={`w-full flex flex-col`}>

            <div className={`flex flex-row min-h-100 items-center p-3 h-full w-full text-black ${item.bool_isUser == true ? 'bg-transparent' : 'bg-white'}`}>
              
              <div className='w-10p'></div>
              {item.bool_isUser ? (
              
              <div class="w-14 h-14 rounded-xl border overflow-hidden">
                <img src={avatar} class="w-full h-full object-cover" />
              </div> 
              
              ) : (
                
              <div class="w-14 h-14 rounded-xl border overflow-hidden">
                <img src={robot} class="w-full h-full object-cover" />
              </div> 
                  
              )}
              
              <div className='mr-5'></div>

              {item.bool_isUser ? <div className='max-w-66p'>{item.str_message}</div> : <TypingText text={item.str_message}></TypingText> }
              
            
            </div>

        </div>
    
    </Fragment>
  )
}

export default ChatBuble