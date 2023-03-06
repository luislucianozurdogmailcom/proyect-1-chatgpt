import React, { Fragment } from 'react'
import Header from './Header'
import style from '../css/styles.css'
import VerticalCarouselChat from './VerticalCarouselChat'
import MessageSender from './MessageSender'

const Chatbox = () => {
  return (
    <div className='w-3/5 h-screen gris-buscador overflow-hidden'>
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
      <MessageSender />
      

    </div>
  )
}

export default Chatbox