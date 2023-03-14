import React from 'react'
import { Fragment } from 'react'
import LoginImage from '../Componentes/LoginImage';
import LoginForm from '../Componentes/LoginForm';
import SignupCustomerForm from '../Componentes/SignupCustomerForm'

const chatview = () => {
  return (
   <Fragment>
        <div className='w-sreen h-screen flex'>
            
            <LoginImage />
            <SignupCustomerForm />


        </div>
        
   </Fragment>
  )
}

export default chatview