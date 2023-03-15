import React from 'react'
import { Fragment } from 'react'
import Navbar from '../Componentes/Navbar'
import Sidebar from '../Componentes/Sidebar'
import Chatbox from '../Componentes/Chatbox'
//import { useSelector, useDispatch } from 'react-redux'
//import {changePage} from '../Reducers/pageState'
//import { useEffect } from 'react'

const chatview = () => {
  return (
   <Fragment>
    <div className='flex flex-row w-full h-full'>

      <Navbar></Navbar>
      <div className='h-full w-10p bg-black'></div>
      <Sidebar></Sidebar>
      <Chatbox></Chatbox>
    
    </div>
   
   </Fragment>
  )
}

export default chatview