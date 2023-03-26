import { useEffect } from 'react'
import '../css/main.css';
import { useSelector, useDispatch } from 'react-redux'
import {changeModel} from '../Reducers/modelSelected'
import {changeCount} from '../Reducers/countAnswer'
import styled from 'styled-components';
import Hamburger from 'hamburger-react';

const welcomeMessages = {
    shortLegal: "Welcome to the Short Legal Hypo Question module. Here, you can ask me a legal hypothetical. I will follow-up with a few clarifying questions, then provide an answer with citations and some background information. I'm not perfect - so check my citations. Example of a typical question you could ask: 'In the case that a large business employs a full-time employee and asks her to perform dangerous work that results in substantial injury to the employee, what claims can the employee make against the company, if any?'.",
    legalResearchModule: "Hi! I am Callidus. Welcome to the Legal Research modul. This is for long-form replies with extensive citations based on fact-patterns you give. The results provide a much faster answer than using typical legal search engines, although you should review the work and apply your judgment. Please provide relevant facts along with the question you're trying to answer (e.g., 'Evaluate whether a cause of action could be brought by [the person/entity] against [defendant] and evaluate the legal jurisprudence to ascertain the likely outcome.' I'll first respond with some clarifying questions and will then provide an answer to your question.",
    memoWriting: "Hi there! I am Callidus. This is the Memo Writing module. Here, you provide me with a fact pattern and I output a ~2-4 page legal memo into a Word document, listing the facts of the case, analysis of questions of law, and a summary. I can write in a way that is persuasive or objective.",
    factPattern: "1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat earum aliquid veritatis illum aspernatur eligendi assumenda, delectus, tempora omnis repellat praesentium minima? Minima earum voluptatibus, ea non esse sequi veniam!",
    Proofread: "Hi there! I'm Callidus. This is the Proofreading module. Here, you can upload a Word or PDF document, copy/paste (or write) text, or provide a link, and I will proofread what you wrote, paying attention to the areas you on which you want me to focus. Then, I will redline the document in Word format for you to review.",
    draft: "2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto veniam quia rem repellat modi maxime ratione, consequuntur earum quis quas inventore itaque impedit, suscipit ab laborum deserunt beatae cum tempora?",
    basicBot: "Hello, I am Callidus. You have entered the 'general bot' module. Here, I am very similar to ChatGPT, although I do have the power to search the web and have API integration into legal databases. I can answer legal questions but can also chat about anything with you. For example, you could ask me to write poetry that rhymes regarding a certain topic in the style of your favorite poet. And much more! Go ahead and get started.",
    summarize: "Hello! I am Callidus. Welcome to the Summarize module. Here, you can upload a Word or PDF document, copy/paste (or write) text, or provide a link, and I will summarize the text for you. For now, please stay under about 5 pages."
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
          dropdownDefaultButton.innerHTML = '<i class="fa fa-bars m-0 icon-dropdown-hamburger-header"></i>' + '<span class="mr-[1em]">'+str+'</span> <i class="fa fa-angle-down m-0 icon-dropdown-arrow-header"></i>';

    setWelcome(name);
}

const setWelcome = (str) => {
    let slickTrack = document.querySelector('.gris-buscador .slick-track');
        slickTrack.innerHTML = '';
        slickTrack.innerHTML = '<div class="slick-slide m-[2em] p-6 text-[14px] bg-white text-gray-500 rounded-lg shadow-lg text-justify">' 
            + welcomeMessages[str] + 
        '</div>';
}

const Dropdown = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setWelcome('shortLegal');
    }, []);

    const handleClickModel = (item) => {
        dispatch(changeModel(item.getAttribute('name')));
        dispatch(changeCount(0));
        setBtnText(item);
    };

    return (
        <DropdownWrapper>
            <DropdownButton id="dropdownDefaultButton" onBlur={() => openDrop()} onClick={() => openDrop()} data-dropdown-toggle="dropdown" type="button">
                <p>Short Legal Hypo</p>
                <HamburgerIcon className="fa fa-bars m-0"></HamburgerIcon>
                {/* <Hamburger size={18} color="#718096" onBlur={() => openDrop()} onClick={(toggled) => openDrop()} /> */}
                <DropdownIcon className="fa fa-angle-down m-0"></DropdownIcon>
            </DropdownButton>
            <DropdownMenu id="dropdown" className='container'>
                <DropdownList aria-labelledby="dropdownDefaultButton" className='mt-1'>
                    {[
                        { name: 'shortLegal', label: 'Short Legal Hypo' },
                        { name: 'legalResearchModule', label: 'Legal Research Modul' },
                        { name: 'memoWriting', label: 'Memo Writing' },
                        { name: 'Proofread', label: 'Proofread' },
                        { name: 'factPattern', label: 'Fact Pattern' },
                        { name: 'draft', label: 'Draft' },
                        { name: 'summarize', label: 'Search Summarize' },
                    ].map((item) => (
                        <DropdownItem key={item.name} name={item.name} onClick={(e) => handleClickModel(e.currentTarget)}>
                            <DropdownIconItem className="fa fa-angle-right mr-2"></DropdownIconItem>
                            
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            </DropdownMenu>
        </DropdownWrapper>
    );

};


const DropdownWrapper = styled.div`
    position: relative;
`;

const DropdownButton = styled.button`
    width: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #cbd5e0;
    color: #718096;
    border-radius: 10px;
    padding: 0.6em 1em;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    font-size: 0.8rem;

    p {
        margin: 0px;
        padding: 0px;
    }

    span {
            display: flex;
            justify-content: flex-start;
        }

    .icon-dropdown-arrow-header {
            display: flex;
        }

    .icon-dropdown-hamburger-header {
        display: none
    }

    @media (max-width: 767px) {
        width: auto;
        padding-top: 0.7rem;
        p {
            display: none;
        }
        span {
            display: none
        }
        .icon-dropdown-arrow-header {
            display: none;
        }
        .icon-dropdown-hamburger-header {
            display: flex;
        }

    }
`;

const DropdownIcon = styled.i`
    margin: 0;

    @media (max-width: 767px) {
        display: none;
    }
`;

const HamburgerIcon = styled.i`
    display: none;

    @media (max-width: 767px) {
        display: inline;
    }
`;

const DropdownMenu = styled.div`
    width: 230px;
    z-index: 10;
    position: absolute;  
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    @media (max-width: 767px) {
        right: 0px
    }
`;

const DropdownList = styled.ul`
    padding: 0;
    font-size: 0.875rem;
    color: #4a5568;
`;

const DropdownItem = styled.li`
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        color: #718096;
        background-color: #edf2f7;
    }
`;

const DropdownIconItem = styled.i`
    margin-right: 0.5rem;
`;

export default Dropdown;