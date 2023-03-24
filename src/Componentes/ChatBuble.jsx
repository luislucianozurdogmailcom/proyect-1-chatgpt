import React from 'react'
import style from '../css/styles.css'
import { Fragment } from 'react'
import avatar from '../assets/avatar.png'
import robot from '../assets/images.png'
import callidus from '../assets/callidus 1.png'
import TypingText from './TypedText'
import Http from '../Services/Services'
import '../css/main.css'
import styled from 'styled-components';


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

            <TextMessageContainer className={`d-flex flex-row w-100 h-100 align-items-center justify-content-start h-full w-full text-black ${item.bool_isUser == true ? 'bg-transparent' : 'bg-white'}`}>
              
              {item.bool_isUser ? (
              
              <div className="w-14 h-14 rounded-xl border p-[.4em] m-3 mt-0 mb-0 bg-white shadow-sm flex items-center">
                <img src={avatar} className="img-fluid rounded" />
              </div> 
              
              ) : (
                
              <div className="w-14 h-14 rounded-xl border bg-blue-500 p-[.5em] m-3 mt-0 mb-0 flex items-center">
                <img src={callidus} className="img-fluid" />
              </div> 
                  
              )}
              

              {item.bool_isUser ? 
                  <div className='flex space-between items-center w-100'>
                    {item.str_message}
                  </div> 
                  : 
                  <div className='flex space-between items-center w-100'>
                      <TypingText text={item.str_message}></TypingText>
                      <button onClick={(e) => copy(e)} 
                        className='transition text-[.9em] 
                                    w-[45px] h-[45px] 
                                    bg-gray-100 
                                    hover:bg-blue-100 
                                    p-2 ml-[1em] 
                                    flex 
                                    items-center 
                                    justify-center 
                                    rounded-full 
                                    text-gray-300 
                                    hover:text-blue-400 
                                    outline-none 
                                    oyline-blue-200 
                                    ring-4 
                                    ring-gray-200 
                                    focus:ring-blue-200 
                                    m-1'
                                    >
                        <i className='fa fa-copy'></i>
                      </button>
                  </div>
                      
                      
                      }
              
            
            </TextMessageContainer>

        </div>
    
    </Fragment>
  )
}

export default ChatBuble

const TextMessageContainer = styled.div`
  padding: 1rem 5rem;
`;