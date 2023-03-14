import React from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import LoginImage from '../Componentes/LoginImage';
import TypeForm from '../Componentes/TypeForm';
import { redirect } from "react-router-dom";

const SignupType = () => {

    useEffect(() => {
        if(localStorage.token !== undefined)
        {
            return redirect('/')
        }
    }, [])

    return (
        <Fragment>
                <div className='w-sreen h-screen flex'>
                    
                    <LoginImage />
                    <TypeForm />        

                </div>
                
        </Fragment>
    )
}

export default SignupType