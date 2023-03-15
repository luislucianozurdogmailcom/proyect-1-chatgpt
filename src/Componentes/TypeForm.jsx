import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, redirect, useNavigate } from 'react-router-dom'


const GoTo = (navigate) => {
    let seletType = document.getElementById('select-type');

    if(seletType.value != 0)
    {
       //window.location.href = './' + seletType.value;
       let url = '/' + seletType.value
       navigate(url)
    }
}

const TypeForm = () => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center w-[50%] flex-col'>      
            <p className='text-lg w-full text-gray-400 flex flex-row justify-center mt-2'>
                what kind of registration do you want to do?
            </p>
            <br />
            <div className='w-full flex flex-row items-center relative'>
                <select name="" id="select-type" className='w-[60%] p-4 border broder-gray-500 ml-auto mr-auto rounded-lg'>
                    <option value="0">Select...</option>
                    <option value="signup">Customer</option>
                    <option value="business">Company</option>
                </select> 
            </div>
            <br />
            <button onClick={(e) => GoTo(navigate)} className="w-[60%] rounded-lg h-12 bg-blue-500 text-white font-bold text-lg">
                Continue
            </button>
            <br />
            <a href="/" className="w-[60%] rounded-lg h-12 border-[3px] text-gray-500 font-bold text-lg flex justify-center items-center">
                Cancel
            </a>

        </div>
    )
}   

export default TypeForm