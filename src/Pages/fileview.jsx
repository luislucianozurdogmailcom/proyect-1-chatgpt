import React from 'react'
import { Fragment } from 'react'
import Navbar from '../Componentes/Navbar'
import Sidebar from '../Componentes/Sidebar'
import FilesCharge from '../Componentes/FilesCharge'

const fileview = () => {
  return (
   <Fragment>
    <div className='flex flex-row w-full h-full'>

      <Navbar></Navbar>
      <div className='h-full w-10p bg-black'></div>
      <Sidebar></Sidebar>

      <FilesCharge />
    </div>
   
   </Fragment>
  )
}

export default fileview