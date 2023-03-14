import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'react-router-dom'

const goTo = async () => {
    let seletType = document.getElementById('select-type');

    if(seletType.value != 0)
    {
        window.location.href = '/' + seletType.value;
    }
}

const TypeForm = () => {

    useEffect(() => {
        if(localStorage.token != undefined)
        {
            return redirect('/')
        }
    }, [])

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
            <button onClick={(e) => goTo()} className="w-[60%] rounded-lg h-12 fondo-login text-white font-bold text-lg">
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