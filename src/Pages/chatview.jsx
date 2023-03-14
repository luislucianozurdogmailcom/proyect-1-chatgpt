import React from 'react'
import { Fragment,useEffect } from 'react'
import Navbar from '../Componentes/Navbar'
import Sidebar from '../Componentes/Sidebar'
import Chatbox from '../Componentes/Chatbox'
import { Modal } from '../Pages/Modal'
import { Error,Success } from '../Componentes/ErrorsAndSuccess'
import { redirect } from 'react-router-dom'

const Chatview = () => {

  return (
   <Fragment>
    <div className='flex flex-row w-full h-full'>

      <Navbar></Navbar>
      <div className='h-full w-10p bg-black'></div>
      <Sidebar></Sidebar>
      <Chatbox></Chatbox>

      {/** MODAL */}
      <Modal />
      <Error>Is not possible close the session right now</Error>
      <Success>The session is closed!</Success>
    
    </div>
   
   </Fragment>
  )
}

export default Chatview