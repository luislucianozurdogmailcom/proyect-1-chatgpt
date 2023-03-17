import { useEffect } from "react";
import Http from "../Services/Services";


const StripeForm = () => {
    const stripeURL = "https://buy.stripe.com/test_bIYcOs8iDc9o0GA3cc";
    const list = [
        '1gb of document storage',
        '4 chat sessions',
        '6 language models',
        '24/7 support and consulting'
    ];
    const subList = [
        { text:'30 days back money guarantive',icon: 'fa fa-shield text-blue-500 text-4xl mr-3'},
        { text:'No setup fees 100% hassle free',icon: 'fa fa-cogs text-blue-500 text-4xl mr-3'},
        { text:'Automatic monthly payment via stripe',icon: 'fa fa-refresh text-blue-500 text-4xl mr-3'},
    ];

    return(
        <div className="flex flex-col w-[60%] absolute top-[13%] left-[22%] p-4">
            <h1 className="text-5xl text-gray-500">
                Rule the <span className="text-gray-800 font-bold">Legal</span> Arena
            </h1>
            <br />
            <br />
            <div className="p-[2em] w-full rounded-lg bg-white shadow-lg flex items-start">
                <div className="w-[40%] flex flex-col text-center p-3">
                    <h1 className="text-gray-800 font-bold text-lg">
                        Subscription
                    </h1>
                    <h1 className="text-[4em] font-bold text-gray-800 m-0">
                        $150
                    </h1>
                    <p className="text-gray-600">
                        Per month
                    </p>
                    <br />
                    <a href={stripeURL} target={"_blank"} className="text-white bg-blue-500 hover:bg-blue-600 transition p-3 rounded font-bold">
                        Gets Started
                    </a>
                </div>
                <div className="w-[60%] flex flex-col items-start p-3 ml-[1em] text-gray-600">
                    <p>Access all this features</p>
                    <br />
                    {list.map((el,i) => (
                        <div key={i + '-item'} className="p-1 flex flex-row items-center">
                           <i className="fa fa-check-circle text-blue-500 mr-[1em]"></i> {el}
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />
            <div className="p-2 w-full flex justify-between items-center">
                {subList.map((el,i) => (
                    <div key={'item-' + i} className={"p-1 flex flex-row w-[30%] text-gray-600"}>
                        <i className={el.icon}></i> {el.text}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default StripeForm