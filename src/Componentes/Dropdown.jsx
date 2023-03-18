import { useEffect } from 'react'
import '../css/main.css';
import { useSelector, useDispatch } from 'react-redux'
import {changeModel} from '../Reducers/modelSelected'
import {changeCount} from '../Reducers/countAnswer'

const welcomeMessages = {
    shortLegal: "Welcome to the Short Legal Hypo Question module. Here, you can ask me a legal hypothetical. I will follow-up with a few clarifying questions, then provide an answer with citations and some background information. I'm not perfect - so check my citations. Example of a typical question you could ask: 'In the case that a large business employs a full-time employee and asks her to perform dangerous work that results in substantial injury to the employee, what claims can the employee make against the company, if any?'.",
    legalResearchModule: "Hi! I am Callidus. Welcome to the Legal Research modul. This is for long-form replies with extensive citations based on fact-patterns you give. The results provide a much faster answer than using typical legal search engines, although you should review the work and apply your judgment. Please provide relevant facts along with the question you're trying to answer (e.g., 'Evaluate whether a cause of action could be brought by [the person/entity] against [defendant] and evaluate the legal jurisprudence to ascertain the likely outcome.' I'll first respond with some clarifying questions and will then provide an answer to your question.",
    memoWriting: "Hi there! I am Callidus. This is the Memo Writing module. Here, you provide me with a fact pattern and I output a ~2-4 page legal memo into a Word document, listing the facts of the case, analysis of questions of law, and a summary. I can write in a way that is persuasive or objective.",
}

const openDrop = () => {
    const dropDown = document.getElementById('dropdown');

    if(!dropDown.classList.contains('active'))
    {
        dropDown.classList.add('active')
    }
    else
    {
        dropDown.classList.remove('active')
    }
}

const setBtnText = (elm) => {
    let name        = elm.getAttribute('name')
    let str         = elm.innerText
    const dropdownDefaultButton = document.getElementById('dropdownDefaultButton');
          dropdownDefaultButton.innerHTML = '<span class="mr-[1em]">'+str+'</span> <i class="fa fa-angle-down m-0"><i>';

    setWelcome(name);
}

const setWelcome = (str) => {
    let slickTrack = document.querySelector('.gris-buscador .slick-track');
        slickTrack.innerHTML = '';
        slickTrack.innerHTML = '<div class="slick-slide m-[2em] p-6 text-[14px] bg-white text-gray-500 rounded-lg shadow-lg">' 
            + welcomeMessages[str] + 
        '</div>';
}

const Dropdown = () => {

    useEffect(() => {
        setWelcome('shortLegal');
    },[])

    const dispatch  = useDispatch();

    const handleClickModel = (item) =>{
        
        // Cambiamos el modelo en el reducer
        dispatch(changeModel(item.getAttribute('name')));

        // Seteamos el numero de respuesta en cero
        dispatch(changeCount(0));

        // Ejecutamos la función setBtnText
        setBtnText(item);
    }

    return (
        <div>
            <button id="dropdownDefaultButton" onBlur={() => openDrop()} onClick={() => openDrop()} data-dropdown-toggle="dropdown" className="flex space-between items-center border border-gray-300 text-gray-500 rounded-full px-[1em] py-[.6em] shadow-lg" type="button">
                <span className='mr-[1em]'>Short Legal Hypo</span>
                <i className='fa fa-angle-down m-0'></i>
            </button>
            <div id="dropdown" className="w-[14em] z-10 absolute top-[5.8em] right-[2.5em] bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownDefaultButton">
                    <li name="shortLegal" onClick={(e) => handleClickModel(e.currentTarget)} className="block px-4 py-2 hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
                        <i className='fa fa-angle-right mr-2'></i> Short Legal Hypo
                    </li>
                    <li name="legalResearchModule" onClick={(e) => handleClickModel(e.currentTarget)} className="block px-4 py-2 hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
                        <i className='fa fa-angle-right mr-2'></i> Legal Research Modul
                    </li>
                    <li name="memoWriting" onClick={(e) => handleClickModel(e.currentTarget)} className="block px-4 py-2 hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
                        <i className='fa fa-angle-right mr-2'></i> Memo Writing
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown