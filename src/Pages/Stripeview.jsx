import { Fragment,useEffect } from 'react'
import Navbar from "../Componentes/Navbar"
import Sidebar from "../Componentes/Sidebar"
import { Modal } from './Modal'
import { Error,Success } from '../Componentes/ErrorsAndSuccess'


const Stripeview = () => {

    return (
        <Fragment>
            <div className='flex flex-row w-full h-[100vh]'>
                <Navbar />
                <div className='h-full w-full'>
                    
                    <div className='bg-gray-100 rounded-lg h-[45vh]'></div>

                </div>
            </div>

            {/** MODAL */}
            <Modal />
            <Error>Is not possible close the session right now</Error>
            <Success>The session is closed!</Success>

        </Fragment>
    )

}

export default Stripeview