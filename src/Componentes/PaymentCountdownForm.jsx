import { Link } from "react-router-dom";

const PaymentCountDownForm = () => {

    return(
        <div className="flex flex-col w-[60%] absolute top-[13%] left-[22%] p-4">
            <h1 className="text-5xl text-gray-500">
                Time <span className="text-gray-800 font-bold">Legal</span> Arena
            </h1>
            <br />
            <br />
            <div className="p-[2em] w-full rounded-lg bg-white shadow-lg flex items-start">
                <div className="w-[40%] flex flex-col text-center p-3">
                    <h1 className="text-gray-800 font-bold text-lg">
                        Subscription
                    </h1>
                    <h1 className="text-[4em] font-bold text-gray-800 m-0">
                        { localStorage.daysCaduced }
                    </h1>
                    <p className="text-gray-600">
                        Valid day
                    </p>
                    <br />
                    <Link to="/chat" className="text-white bg-blue-500 hover:bg-blue-600 transition p-3 rounded font-bold">
                        <i className="fa fa-arrow-left"></i> Go to chat
                    </Link>
                </div>
                <div className="w-[60%] flex flex-col items-start p-3 ml-[1em] text-gray-600">
                    <p className="text-3xl">Reminder of days of <b>availability</b></p>
                    <br />
                    <div className="flex flex-row items-c  enter">
                        <i className="fa fa-check-circle text-4xl text-green-500"></i>
                        <i className="fa fa-star text-yellow-500 text-4xl ml-2"></i>
                        <i className="fa fa-user-circle text-gray-300 text-4xl ml-2"></i>
                    </div>
                    <br />
                    <p className="text-gray-400">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, temporibus? Recusandae doloremque corrupti.
                    </p>
                </div>
            </div>
        </div>
    )
}


export default PaymentCountDownForm