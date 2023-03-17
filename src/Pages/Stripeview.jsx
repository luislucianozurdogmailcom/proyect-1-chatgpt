import { Fragment,useEffect } from 'react'
import Navbar from "../Componentes/Navbar"
import Sidebar from "../Componentes/Sidebar"
import StripeForm from '../Componentes/StripeForm'
import PaymentCountDownForm from '../Componentes/PaymentCountdownForm'
import { Modal } from './Modal'
import { Error,Success } from '../Componentes/ErrorsAndSuccess'
import Http from "../Services/Services";


const getDaysCaduced = (showC) => {
    let url = Http.host + Http.routes.caduced;
    Http.get(url,true, rs => {
        Object.assign(localStorage, {
            daysCaduced: rs.days_caduced
        })
    });
}

const Stripeview = () => {

    useEffect(() => {
        getDaysCaduced()
    })

    return (
        <Fragment>
            <div className='flex flex-row w-full h-[100vh]'>
                <Navbar />
                <div className='h-full w-full'>
                    
                    <div className='bg-gray-100 rounded-lg h-[45vh]'></div>
                    
                    { localStorage.daysCaduced != 0 ? <PaymentCountDownForm /> : <StripeForm /> }

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