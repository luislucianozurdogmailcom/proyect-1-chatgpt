import React from 'react'
import style from '../css/styles.css'
import { Fragment } from 'react'
import avatar from '../assets/avatar.png'
import robot from '../assets/images.png'
import callidus from '../assets/callidus 1.png'
import TypingText from './TypedText'
import Http from '../Services/Services'
import '../css/main.css'


const copy = (e) => {
  let parent = e.target.parentElement.parentElement;
  let letter = parent.querySelector('.chat-letter');

  navigator.clipboard.writeText(letter.innerText);

  let success = document.getElementById('text-copied');
      success.classList.add('active');

    setTimeout(() => {
      success.classList.remove('active');
    }, 1500);
}


const ChatBuble = (item) => {
  return (
    <Fragment>
        
        <div className={`w-full flex flex-col`}>

            <div className={`flex flex-row min-h-100 items-center p-3 h-full w-full text-black ${item.bool_isUser == true ? 'bg-transparent' : 'bg-white'}`}>
              
              <div className='w-10p'></div>
              {item.bool_isUser ? (
              
              <div className="w-14 h-14 rounded-xl border overflow-hidden">
                <img src={avatar} className="w-full h-full object-cover" />
              </div> 
              
              ) : (
                
              <div className="w-14 h-14 rounded-xl border overflow-hidden bg-blue-500 p-[.5em]">
                <img src={callidus} className="w-full h-full object-cover" />
              </div> 
                  
              )}
              
              <div className='mr-5'></div>

              {item.bool_isUser ? 
                  <div className='max-w-66p'>{item.str_message}</div> : 
                      <div className='flex space-between items-center'>
                        <TypingText text={item.str_message}></TypingText>
                        <button onClick={(e) => copy(e)} className='transition text-[.9em] w-[45px] h-[45px] bg-gray-100 hover:bg-blue-100 p-2 ml-[1em] flex items-center justify-center rounded-full text-gray-300 hover:text-blue-400 outline-none oyline-blue-200 ring-4 ring-gray-200 focus:ring-blue-200'>
                          <i className='fa fa-copy'></i>
                        </button>
                      </div>}
              
            
            </div>

        </div>
    
    </Fragment>
  )
}

export default ChatBuble