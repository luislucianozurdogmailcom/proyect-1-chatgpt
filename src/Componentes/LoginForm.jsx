import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { redirect, useNavigate } from 'react-router-dom';
import Http from '../Services/Services'
import { Error,Success } from './ErrorsAndSuccess';
import '../css/main.css'
import credentials from '../assets/google_credentials.json'
import { auth } from '../Services/firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const SendData = (e,navigate) => {
    e.preventDefault()
    
    let user = document.getElementById('username');
    let pass = document.getElementById('password');
    let btnSend = document.getElementById('btn-send');
    let btnGoogle = document.getElementById('btn-google');
    let data = {username: user.value, password: pass.value}

    let url = Http.host + Http.routes.login;
    Http.post(url,data,false,d => {
        if(!d.action)
        {
            user.classList.remove('border-gray-500');
            pass.classList.remove('border-gray-500');
            ////////////////////////////////////
            user.classList.add('border-red-500');
            pass.classList.add('border-red-500');
        }
        else
        {
            user.classList.add('border-gray-500');
            pass.classList.add('border-gray-500');
            ////////////////////////////////////
            user.classList.remove('border-red-500');
            pass.classList.remove('border-red-500');

            user.classList.add('opacity-75');
            pass.classList.add('opacity-75');
            btnSend.classList.add('opacity-75');

            user.setAttribute('disabled','disabled');
            pass.setAttribute('disabled','disabled');
            btnSend.setAttribute('disabled','disabled');
            btnGoogle.setAttribute('disabled','disabled');

            Object.assign(localStorage,{
                token: d.token,
                daysCaduced: d.daysCaduced,
                isCaduced: d.isCaduced,
                isLogin: d.action
            })

            setTimeout(() => {
                window.location.href = '/stripe';
            },1000);
        }
    });
}

const responseGoogle = async (res) => {
    try
    {
        let provider = new GoogleAuthProvider()
        let data = await signInWithPopup(auth, provider)
        
        if(data.user.emailVerified)
        {
            let user = document.getElementById('username');
            let pass = document.getElementById('password');
            let btnSend = document.getElementById('btn-send');
            let btnGoogle = document.getElementById('btn-google');

            let url = Http.host + Http.routes.google
            Http.post(url,data.user,false,d => {
                if(d.action)
                {
                    user.setAttribute('disabled','disabled');
                    pass.setAttribute('disabled','disabled');
                    btnSend.setAttribute('disabled','disabled');
                    btnGoogle.setAttribute('disabled','disabled');
    
                    Object.assign(localStorage,{
                        token: d.token,
                        daysCaduced: d.daysCaduced,
                        isCaduced: d.isCaduced,
                        isLogin: d.action
                    })
    
                    setTimeout(() => {
                        window.location.href = '/stripe';
                    },1000);
                }

            });
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

const LoginForm = () => {
  
    // Variables que vamos a utilizar
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser]                 = useState('');
    const [pass, setPass]                 = useState('');
    const navigate = useNavigate();


    const handleButton = (event) => {
        setShowPassword(!showPassword);
    }
  
    return (
    <div className='flex flex-col w-1/2 h-full justify-center items-center'>
        
        <div className='w-full px-[20%]'>

            <span className='text-3xl font-bold'>Log In</span>
            <br />
            <br />
            <div className='w-full mb-[1em]'>
                <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="username">
                    Username
                </label>
                <input autoFocus={"autofocus"} onChange={(event) => setUser(event.target.value)} id='username' type='text' placeholder='Enter your username' className='py-2 px-4 w-full h-12 border-2 rounded-xl outline-0 ring-0 focus:ring-2 focus:ring-blue-300' />
            </div>
            <div className='w-full'>
                <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="password">
                    Password
                </label>

                <div className='w-full flex flex-row items-center relative'>
                    <input onChange={(event) => setPass(event.target.value)} id='password' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' className='py-2 px-4 w-full h-12 border-2 rounded-xl outline-0 ring-0 focus:ring-2 focus:ring-blue-300' />
                    
                    <button
                        type='button'
                        className="absolute top-0 right-0 h-full px-3 py-2 text-gray-400"
                        onClick={() => handleButton(showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                    
                </div>
            </div>
            <br />
            <button id='btn-send' type='submit' onClick={(e) => SendData(e,navigate)} className='w-full rounded-lg h-12 bg-blue-500 text-white font-bold text-lg '>
                Continue
            </button>
            <br />
            <br />
            <button id="btn-google" onClick={() => responseGoogle()} className='w-full flex flex-row justify-center items-center rounded-lg h-12 fondo-boton-google text-blue-500 font-bold text-lg'>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_110_61)">
                    <path d="M26.1594 13.804C26.1594 12.907 26.0866 12.0053 25.9315 11.1229H13.4861V16.2038H20.613C20.3172 17.8425 19.367 19.2921 17.9755 20.2133V23.5101H22.2275C24.7243 21.212 26.1594 17.8183 26.1594 13.804Z" fill="#4285F4"/>
                    <path d="M13.486 26.6954C17.0446 26.6954 20.0457 25.527 22.2322 23.5101L17.9803 20.2133C16.7974 21.0181 15.2702 21.4738 13.4909 21.4738C10.0486 21.4738 7.12999 19.1515 6.08277 16.0293H1.69513V19.4279C3.93501 23.8834 8.49719 26.6954 13.486 26.6954Z" fill="#34A853"/>
                    <path d="M6.07798 16.0293C5.52529 14.3906 5.52529 12.6161 6.07798 10.9774V7.57882H1.69519C-0.176228 11.3071 -0.176228 15.6996 1.69519 19.4279L6.07798 16.0293Z" fill="#FBBC04"/>
                    <path d="M13.486 5.52801C15.3671 5.49892 17.1852 6.20676 18.5476 7.50608L22.3146 3.73901C19.9293 1.49913 16.7634 0.267683 13.486 0.306469C8.49719 0.306469 3.93501 3.11844 1.69513 7.57881L6.07792 10.9774C7.12029 7.85031 10.0438 5.52801 13.486 5.52801Z" fill="#EA4335"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_110_61">
                    <rect width="26.3889" height="26.3889" fill="white" transform="translate(0.02771 0.30558)"/>
                    </clipPath>
                    </defs>
                </svg>
                &nbsp; 
                &nbsp; 
                <div>
                    Continue with Google
                </div>
            </button>
            <br />

            <div className='hidden text-lg w-full text-gray-400 flex flex-row justify-center'>
                Already have an account?&nbsp;  
                <Link to='/' className='text-blue-500'><button>Log in</button></Link>
            </div>

            <div className='text-lg w-full text-gray-400 flex flex-row justify-center mt-2'>
                do you want to register?&nbsp;  
                <Link to='/type' className='text-blue-500'><button>Sign Up</button></Link>
            </div>
        </div>


        <Error>Wrong username/password</Error>
        <Success>Login success!</Success>
    </div>
  )
}

export default LoginForm