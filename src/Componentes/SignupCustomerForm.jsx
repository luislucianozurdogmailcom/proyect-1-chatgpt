import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Http from '../Services/Services';
import { Error,Success } from './ErrorsAndSuccess';
import '../css/main.css'

let _user = null;
let _pass = null;
let _confirm = null;
let _email = null;
let _check = false;

const sendData = (data) => {
    let keys = Object.keys(data);
    let validate = true;

    for(let k in keys)
    {
        if(data[keys[k]].length == 0)
        {
            validate = false;
            return false
        }
    }

    let upPass = document.getElementById('up-pass')
    if(data.password != data.confirm)
    {
        upPass.classList.add('active')
        return false
    }
    else
    {   
        upPass.classList.remove('active')
    }

    if(validate)
    {
        let url = Http.host + Http.routes.signup;
        Http.post(url, data, false, d => {
            if(!d.action)
            {
                Http.showError('up-wrong',true);           
            }
            else
            {
                Http.showSuccess('up-success',true);
                clearFields();
            }
        });
    }
} 


const clearFields = () => {
    let elms = document.querySelectorAll('input[type="text"],input[type="password"],input[type="checkbox"]')
        elms.forEach((elm,i) => {
            if(elm.type == 'checkbox')
            {
                elm.checked = false;
            }
            else
            {
                elm.value = '';
            }
        })
}

const TypeForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [user,setUser] = useState(_user);
    const [pass,setPass] = useState(_pass);
    const [confirm,setConfirm] = useState(_confirm);
    const [email,setEmail] = useState(_email);
    const [check,setCheck] = useState(_check);

    useEffect(() => {
        if(localStorage.token != undefined)
        {
            return redirect('/')
        }
    }, [])

    const handleButtonPass = (event) => {
        
        setShowPassword(!showPassword);
    }

    const handleButtonConfirm = (event) => {
        
        setShowConfirm(!showConfirm);
    }

    return (
        <div className='flex justify-center items-center w-[50%] flex-col scroll-smooth'>      
            <span className='text-3xl font-bold'>Customer Sign Up</span>
            <br />
            <div className='container px-[20%]'>
                <div className='w-full mb-[1em]'>
                    <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="username">
                        E-mail
                    </label>
                    <input onChange={(event) => setEmail(event.target.value)} id='email' type='text' placeholder='Enter your username' className='p-2 w-full h-12 border-2 rounded-xl' />
                </div>

                <div className='w-full mb-[1em]'>
                    <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="password">
                        Password
                    </label>

                    <div className='w-full flex flex-row items-center relative'>
                        <input onChange={(event) => setPass(event.target.value)} id='password' type={showPassword ? 'text' : 'password'} placeholder='Enter your password' className='p-2 w-full h-12 border-2 rounded-xl' />
                        
                        <button
                        type='button'
                        className="absolute top-0 right-0 h-full px-3 py-2 text-gray-400"
                        onClick={() => handleButtonPass(showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                        
                    </div>
                </div>

                <div className='w-full mb-[1em]'>
                    <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="confirm">
                        Confirm Password
                    </label>

                    <div className='w-full flex flex-row items-center relative'>
                        <input onChange={(event) => setConfirm(event.target.value)} id='confirm' type={showConfirm ? 'text' : 'password'} placeholder='Enter your password' className='p-2 w-full h-12 border-2 rounded-xl' />

                        <button
                        type='button'
                        className="absolute top-0 right-0 h-full px-3 py-2 text-gray-400"
                        onClick={() => handleButtonConfirm(showConfirm)}
                        >
                            <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                        </button>
                        
                    </div>
                </div>

                <div className='w-full mb-[1em]'>
                    <label className="block text-gray-700 text-xl font-extralight mb-2" htmlFor="fullname">
                    Name
                    </label>
                    <input onChange={(event) => setUser(event.target.value)} id='fullname' type='text' placeholder='Enter your username' className='p-2 w-full h-12 border-2 rounded-xl' />
                </div>

                <div className='w-full mb-[1em] flex items-center text-gray-700 font-extralight'>
                    <input type="checkbox" onClick={(e) => setCheck(e.currentTarget.checked ? true : false )} className='w-[25px] h-[25px]' /> 
                    <span className='ml-[1em]'>Agree to TOS and Data Privacy Policy</span>
                </div>

                <button id='btn-send' type='submit' onClick={(e) => sendData({
                    fullname: user,
                    password: pass,
                    confirm: confirm,
                    is_active: check,
                    email: email
                })} className='w-full rounded-lg h-12 fondo-login text-white font-bold text-lg'>
                    Continue
                </button>
            </div>
            <br />
            <a href="/type" className="w-[60%] rounded-lg h-12 border-[3px] text-gray-500 font-bold text-lg flex justify-center items-center">
                Cancel
            </a>

            <Error>Wrong save the customer</Error>
            <Success>Save customer done!</Success>
            <div id='up-pass' className='fixed text-white left-0 w-full p-[1.6%] bg-red-500 shadow-lg text-center'>
                Password/confirm not match
            </div>
        </div>
    )
}   

export default TypeForm