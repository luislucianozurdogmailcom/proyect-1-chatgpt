import { useEffect } from "react";
import { Error,Success } from "../Componentes/ErrorsAndSuccess";


let modal = HTMLElement;
let container = HTMLElement;

const close = (e) => {
    container.classList.remove('active');
    setTimeout(() => {
        modal.classList.remove('active');
    }, 300)
}

const show = () => {
    modal.classList.add('active');
    setTimeout(() => {
        container.classList.add('active');
    }, 300)
}

const doIt = (method) => {
    method()
}

const set = (cb) => {
    let header = document.getElementById('modal-header');
    let title = document.getElementById('modal-title');
    let letter = document.getElementById('modal-letter');

    cb({
        header: header,
        title: title,
        letter : letter
    })
}

const Modal = (arg) => {

    useEffect(() => {
        modal = document.getElementById('defaultModal');
        container = document.getElementById('modal-content');
    }, [])

    return(
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 z-[9999] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center bg-gray-600/75">
            <div id="modal-content" className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow-lg">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
                        <h3 id="modal-header" className="text-xl font-semibold text-gray-600"></h3>
                        <button onClick={(ev) => close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <p id="modal-title" className="text-2xl"></p>
                        <p id="modal-letter" className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
                    </div>
                    <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-300">
                        <button id="btn-modal-send" data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">log out</button>
                        <button id="btn-modal-close" onClick={(ev) => close(ev)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-200 dark:text-gray-600 dark:border-gray-500">cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export {
    Modal,
    show,
    close,
    set
}