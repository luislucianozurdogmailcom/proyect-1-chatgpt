import React from 'react'
import { Fragment } from 'react'
import styles from '../css/styles.css'
import {changeModel} from '../Reducers/modelSelected'
import { useSelector, useDispatch } from 'react-redux'
import { changeCount } from '../Reducers/countAnswer'
import { useState } from 'react'
import Dropdown from './Dropdown'

const Header = () => {
    
    const [bool_viewList, setViewList] = useState(false);
    const int_countAnswer              = useSelector((state) => state.countAnswer.int_countAnswer); // Comenzamos en cero contando las respuestas
    const str_model                    = useSelector((state) => state.modelSelected.str_model);    
    const dispatch                     = useDispatch();

    
    const handleClick = (event) => {
        dispatch(changeModel(event.target.value));
        setViewList(!bool_viewList);
        dispatch(changeCount(0));
        console.log(int_countAnswer);
    }


    return (
    <Fragment>
        <div className='w-full h-1/6 min-h-100 bg-white flex flex-row border-b border-gray-300 items-center'>
            <div className='w-1/2 h-full flex flex-col'>
                <span className='text-3xl mt-auto mx-10 font-light'>Messages</span>
                <div className='h-1/6'></div>
                <span className='mb-auto text-xl mb-auto mx-10 font-light gris-palabras'>1.520 messages</span>
            </div>

            <div className='w-1/2 h-full flex flex-row justify-end items-center pr-[3em]'>
                <div className='hidden my-auto min-w-100 overflow-hidden flex h-1/4 border border-gray-300 min-h-50 mx-20 rounded-full w-1/5'>
                    <div className='w-1/2 h-full m-auto flex flex'>
                        <div className='m-auto'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 16C1.45 16 0.979002 15.804 0.587002 15.412C0.195002 15.02 -0.000664969 14.5493 1.69779e-06 14V11H2V14H14V11H16V14C16 14.55 15.804 15.021 15.412 15.413C15.02 15.805 14.5493 16.0007 14 16H2ZM8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12Z" fill="#2A85FF"/>
                            </svg>
                        </div>
                    </div>

                    <button onClick={(event) => setViewList(!bool_viewList)} className='w-1/2 h-full m-auto flex flex '>
                        <div className='m-auto'>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3577 5.40268C14.3416 5.3302 14.3102 5.26203 14.2654 5.20278C14.2207 5.14352 14.1638 5.09456 14.0985 5.05921L12.5561 4.20377C12.4735 4.03611 12.3804 3.87378 12.2775 3.71773L12.3099 1.95501C12.3105 1.88107 12.2958 1.80781 12.2668 1.73979C12.2378 1.67178 12.1951 1.61047 12.1414 1.55969C11.3734 0.863398 10.4652 0.339684 9.47786 0.0237965C9.40696 0.00168789 9.33217 -0.00512281 9.25844 0.00381429C9.18471 0.0127514 9.11371 0.0372329 9.05015 0.0756412L7.54017 0.982922C7.35223 0.976442 7.17078 0.976442 6.98284 0.982922L5.47286 0.0756412C5.4093 0.0372329 5.3383 0.0127514 5.26457 0.00381429C5.19084 -0.00512281 5.11605 0.00168789 5.04515 0.0237965C4.05651 0.339924 3.14791 0.866071 2.38163 1.56617C2.32741 1.6152 2.28432 1.67527 2.25526 1.74234C2.2262 1.80941 2.21183 1.88192 2.21313 1.95501L2.24554 3.71773C2.14185 3.87326 2.05112 4.03528 1.96039 4.20377L0.418013 5.05921C0.353675 5.09493 0.297794 5.1441 0.254178 5.20337C0.210563 5.26265 0.180238 5.33063 0.16527 5.40268C-0.0550901 6.41475 -0.0550901 7.4624 0.16527 8.47447C0.181368 8.54694 0.212842 8.61511 0.257564 8.67437C0.302286 8.73363 0.359213 8.78259 0.424494 8.81794L1.96687 9.67338C2.04955 9.84103 2.14262 10.0034 2.24554 10.1594L2.21313 11.9221C2.21254 11.9961 2.2272 12.0693 2.25619 12.1374C2.28518 12.2054 2.32788 12.2667 2.38163 12.3175C3.1496 13.0138 4.05781 13.5375 5.04515 13.8534C5.11605 13.8755 5.19084 13.8823 5.26457 13.8733C5.3383 13.8644 5.4093 13.8399 5.47286 13.8015L6.98284 12.8942H7.54017L9.05663 13.8015C9.13546 13.8533 9.22799 13.8804 9.32233 13.8793C9.37504 13.877 9.42727 13.8683 9.47786 13.8534C10.4665 13.5372 11.3751 13.0111 12.1414 12.311C12.1956 12.2619 12.2387 12.2019 12.2677 12.1348C12.2968 12.0677 12.3112 11.9952 12.3099 11.9221L12.2775 10.1594C12.3812 10.0039 12.4719 9.84187 12.5626 9.67338L14.105 8.81794C14.1693 8.78222 14.2252 8.73305 14.2688 8.67377C14.3124 8.6145 14.3428 8.54652 14.3577 8.47447C14.5781 7.4624 14.5781 6.41475 14.3577 5.40268ZM13.3857 8.02731L11.9146 8.84386C11.8212 8.89811 11.7466 8.97948 11.7007 9.07717C11.5941 9.29805 11.4706 9.51038 11.3313 9.71226C11.2721 9.80283 11.2406 9.90867 11.2406 10.0168L11.2665 11.6953C10.7086 12.1704 10.0698 12.5414 9.38065 12.7905L7.93548 11.9221C7.85483 11.8752 7.76311 11.8506 7.66978 11.8509H7.6309C7.38502 11.8703 7.13799 11.8703 6.89211 11.8509C6.78586 11.8451 6.68017 11.8698 6.58752 11.9221L5.14236 12.7905C4.45404 12.5426 3.81544 12.1739 3.25651 11.7018L3.28243 10.0168C3.28239 9.90867 3.25086 9.80283 3.1917 9.71226C3.0548 9.50888 2.9314 9.29672 2.82231 9.07717C2.77446 8.98078 2.70032 8.8999 2.60845 8.84386L1.13736 8.02731C1.0077 7.30728 1.0077 6.56987 1.13736 5.84984L2.60845 5.03328C2.70178 4.97904 2.77637 4.89767 2.82231 4.79998C2.92893 4.5791 3.05242 4.36677 3.1917 4.16489C3.25086 4.07431 3.28239 3.96848 3.28243 3.8603L3.25651 2.18183C3.81445 1.70676 4.45322 1.33579 5.14236 1.08661L6.58752 1.95501C6.67989 2.00806 6.78579 2.03284 6.89211 2.0263C7.13799 2.00685 7.38502 2.00685 7.6309 2.0263C7.73715 2.0321 7.84284 2.00736 7.93548 1.95501L9.38065 1.08661C10.069 1.33459 10.7076 1.70327 11.2665 2.17535L11.2406 3.8603C11.2406 3.96848 11.2721 4.07431 11.3313 4.16489C11.4682 4.36827 11.5916 4.58043 11.7007 4.79998C11.7485 4.89637 11.8227 4.97725 11.9146 5.03328L13.3857 5.84984C13.5153 6.56987 13.5153 7.30728 13.3857 8.02731ZM7.2615 3.30945C6.54373 3.30945 5.84208 3.52229 5.24527 3.92107C4.64846 4.31984 4.18331 4.88663 3.90863 5.54977C3.63395 6.2129 3.56208 6.9426 3.70211 7.64658C3.84214 8.35056 4.18778 8.99721 4.69533 9.50475C5.20287 10.0123 5.84952 10.3579 6.5535 10.498C7.25748 10.638 7.98717 10.5661 8.65031 10.2914C9.31345 10.0168 9.88024 9.55161 10.279 8.95481C10.6778 8.358 10.8906 7.65635 10.8906 6.93857C10.8906 5.97607 10.5083 5.05299 9.82768 4.3724C9.14709 3.6918 8.22401 3.30945 7.2615 3.30945ZM7.2615 9.53081C6.74881 9.53081 6.24763 9.37877 5.82134 9.09394C5.39505 8.8091 5.06279 8.40425 4.86659 7.93058C4.67039 7.45691 4.61906 6.9357 4.71908 6.43286C4.8191 5.93001 5.06599 5.46812 5.42852 5.10559C5.79105 4.74306 6.25294 4.49617 6.75579 4.39615C7.25863 4.29613 7.77984 4.34746 8.25351 4.54366C8.72718 4.73986 9.13203 5.07212 9.41687 5.49841C9.70171 5.9247 9.85374 6.42588 9.85374 6.93857C9.85374 7.62608 9.58063 8.28542 9.09449 8.77156C8.60835 9.2577 7.94901 9.53081 7.2615 9.53081Z" fill="#7C7C7C"/>
                            </svg>
                        </div>
                    </button>

                    
                </div>
                <Dropdown />
            </div>


        </div>
    </Fragment>
  )
}

export default Header