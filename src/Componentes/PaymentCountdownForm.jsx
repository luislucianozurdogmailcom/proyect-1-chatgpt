import { parse } from "@fortawesome/fontawesome-svg-core";
import { formToJSON } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/main.css'
import Http from "../Services/Services";

let _trackData = {};
let _setTrack

const getTrackRegister = () => {
    let url = Http.host + Http.routes.trackRegister;
    Http.get(url,true, rs => {
        _setTrack(rs)
    })
}

const PaymentCountDownForm = () => {

    const navigate = useNavigate()
    const [trackData,setTrackData] = useState(_trackData);

    useEffect(() => {
        _setTrack = setTrackData;
        getTrackRegister();
    },[]);

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
                    <h1 id="count-down" className="text-[4em] font-bold text-gray-800 m-0">
                        { localStorage.daysCaduced }
                    </h1>
                    <p className="text-gray-600">
                        Valid day
                    </p>
                    <br />
                    <button onClick={() => navigate('/chat')} className="text-white bg-blue-500 hover:bg-blue-600 transition p-3 rounded font-bold mb-[1em]">
                        <i className="fa fa-arrow-left"></i> Go to chat
                    </button>
                    <div className="columns-2 flex items-center gap-4 border-2 border-gray-200 p-2 rounded-lg">
                        <div className="p-4 w-1/2 rounded-lg border-4 border-green-200 text-gray-300 bg-green-50">
                            <i className="fa fa-check text-4xl text-green-400"></i>
                        </div>
                        <div className="p-4 w-1/2 rounded-lg border-4 border-gray-200 text-gray-400 bg-gray-100">
                            <i className="fa fa-credit-card text-4xl"></i>
                        </div>
                    </div>
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
                    <div className="text-gray-400">
                        <table>
                            <thead className="hidden">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="text-gray-400">Tokens price</span></td>
                                    <td></td>
                                    <td><b className="text-xl">${trackData.token_price}</b></td>
                                </tr>
                                <tr>
                                    <td><span className="text-gray-400">Month subscription</span></td>
                                    <td>
                                        &nbsp;
                                        &nbsp;
                                    </td>
                                    <td><b className="text-2xl">${parseFloat(trackData.mounth_subscription).toFixed(2)}</b></td>
                                </tr>
                                <tr>
                                    <td><span className="text-gray-400">Message spend</span></td>
                                    <td></td>
                                    <td><b>{trackData.message_spend}</b> <i className="fa fa-commenting text-gray-400"></i></td>
                                </tr>
                                <tr>
                                    <td><span className="text-gray-400">Top message send</span></td>
                                    <td></td>
                                    <td><b>{trackData.top_message_send}</b> <i className="fa fa-commenting text-gray-400"></i></td>
                                </tr>
                                <tr>
                                    <td><span className="text-gray-400">Cumulate</span></td>
                                    <td></td>
                                    <td><b>${trackData.cumulate}</b></td>
                                </tr>
                                <tr>
                                    <td><span className="text-gray-400">Top Message spend</span></td>
                                    <td></td>
                                    <td><b className="text-xl">${parseFloat(trackData.top_message_spend).toFixed(2)}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PaymentCountDownForm