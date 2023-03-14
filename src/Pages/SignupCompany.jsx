import React from 'react'
import { Fragment } from 'react'
import LoginImage from '../Componentes/LoginImage';
import SignupCompanyForm from '../Componentes/SignupCompanyForm';


const chatview = () => {
  return (
   <Fragment>
        <div className='w-sreen h-screen flex'>
            
            <LoginImage />
            <SignupCompanyForm />

        </div>
        
   </Fragment>
  )
}

export default chatview