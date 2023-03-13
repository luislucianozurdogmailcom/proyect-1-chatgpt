import React from 'react'
import { Fragment } from 'react'
import LoginImage from '../Componentes/LoginImage';
import LoginForm from '../Componentes/LoginForm';


const chatview = () => {
  return (
   <Fragment>
        <div className='w-sreen h-screen flex'>
            
            <LoginImage />
            <LoginForm />

        </div>
        
   </Fragment>
  )
}

export default chatview