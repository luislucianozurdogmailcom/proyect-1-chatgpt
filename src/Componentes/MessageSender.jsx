import React, { Fragment } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addText} from '../Reducers/chatText'
import {change} from '../Reducers/answerResponse'
import {change_wait} from '../Reducers/waitingResponse'
import {changeCookie} from '../Reducers/cookie'
import Cookies from 'universal-cookie'
import {changeCount} from '../Reducers/countAnswer'
import { Error,Success,TextCopied } from './ErrorsAndSuccess';
import styled from 'styled-components';
import { writeCookie,readCookie } from '../Services/Storage'
import Http from '../Services/Services'


const assignIntoStorage = (count) => {
    let cnt = count;

    if(localStorage.messages_send != undefined)
    {
        cnt = parseInt(localStorage.messages_send);
    }

    Object.assign(localStorage,{
        messages_send: cnt + 1
    });

    writeCookie("ms",cnt,1)
}

const MessageSender = () => {
  
    // Ponemos la lógica del texto
    const [texto, setTexto]              = useState(''); // Variable de estado para el texto en input + su funcion setTexto
    const int_countAnswer                = useSelector((state) => state.countAnswer.int_countAnswer); // Comenzamos en cero contando las respuestas
    const textos                         = useSelector((state) => state.chatText.textos); // Selector para leer el estado actual de los textos
    const bool_isAnswer                  = useSelector((state) => state.answerResponse.bool_isAnswer);
    const bool_isWaiting                 = useSelector((state) => state.waitingResponse.bool_isWaiting);
    const session_cookie                 = useSelector((state) => state.cookie.cookie);




    // Elección del modelo
    const str_model                      = useSelector((state) => state.modelSelected.str_model);
    
    const dispatch          = useDispatch();// funcion para despachar la accion de actualizar el estado de redux
    

    const handleSubmit      = async (event) => {
        event.preventDefault(); //evitamos que la página recargue

        let host = Http.host;

        // Activamos el spin animation
        dispatch(change_wait());

        // Texto del usuario
        dispatch(addText({str_message: texto, bool_isUser: true})); 
        
        // Petición para legal question
        if (texto && (str_model == 'shortLegal' || str_model == 'legal_question')) {
            
            let url_legal_api = int_countAnswer == 1 ? host + '/legal_research/legal_question/question_answer' : host + '/legal_research/legal_question/question_intake';
           
            console.log(url_legal_api)
            
            // Intentamos tirar la petición a la API
            
            try{
                
                // Tiramos la peti
                
                const response = bool_isAnswer ? await fetch(url_legal_api, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body    : JSON.stringify({
                        request : texto
                    }),
                }) : await fetch(url_legal_api, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body    : JSON.stringify({
                        request : texto
                    }),
                });
                

                // Logica en función de lo respondido
                if (response.ok){

                    if (int_countAnswer == 0){
                        dispatch(changeCount(1));
                    }else{
                        dispatch(changeCount(0));
                    }
                    
                    const res  = await response.json();
                    
                    // Logica de obtención de las cookies

                    //console.log(response.headers.get('set-cookie'))
                    
                    //const storedObject = localStorage.getItem('session');
                    //const sessionID    = JSON.parse(storedObject);
                    //console.log(sessionID)

                    
                    //const cookies       = new Cookies();
                    //const allCookies    = cookies.getAll(); 
                    //console.log('Cookie', allCookies);
                    
                    //const setCookieHeader = response.headers.get('Set-Cookie');
                    //const cookies         = setCookieHeader.split(';').map(cookie => cookie.trim());
                    //console.log('Cookies:', cookies);

                    // Se despacha la acción al store, se agrega el texto.
                    //dispatch(addText({str_message: texto, bool_isUser: true})); 

                    // Agregamos la respuesta de la API
                    dispatch(addText({str_message: res.response, bool_isUser: false}));
                
                    // Limpiamos el texto en el input
                    setTexto(''); 

                    // Cambiamos el estado de bool_isAnswer a true o false
                    dispatch(change());

                    console.log(bool_isAnswer);

                }else{

                    console.error('Hubo un error en la petición');

                    // Se despacha la acción al store, se agrega el texto.
                    //dispatch(addText({str_message: texto, bool_isUser: true})); 
                    
                    // Agregamos la respuesta de la API
                    dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
                
                    // Limpiamos el texto en el input
                    setTexto(''); 
                }

            }catch(error){

                console.log('Hubo un error y fue: ',error);

                // Se despacha la acción al store, se agrega el texto.
                //dispatch(addText({str_message: texto, bool_isUser: true})); 

                // Agregamos la respuesta de la API
                dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
            
                // Limpiamos el texto en el input
                setTexto(''); 
            }
            
        }

        // Petición para Fact Pattern
        if (texto && str_model == 'legalResearchModule'){

            let url_1 = host + '/legal_research/fact_pattern/intake';
            let url_2 = host + '/legal_research/fact_pattern/answer';
            let url_3 = host + '/legal_research/fact_pattern/continued_conversation';
            
            // Intentamos tirar la petición a la API
            
            try{
                
                let response;
                // Tiramos la peti

                if(int_countAnswer == 0){
                    response = await fetch(url_1, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Accept': '*/*',
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        }),
                        cookie: []
                    })

                    dispatch(changeCount(1));
                }else if(int_countAnswer == 1){
                    response = await fetch(url_2, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Accept': '*/*',
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(2));
                }else{
                    response = await fetch(url_3, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Accept': '*/*',
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(0));
                }

                
                // Verificamos si existe respuesta
                if(typeof response !== 'undefined'){
                    // Logica en función de lo respondido
                    if (response.ok){

                        const res = await response.json();

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: res.response, bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 

                        // Cambiamos el estado de bool_isAnswer a true o false
                        dispatch(change());

                    }else{

                        console.error('Hubo un error en la petición');

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 
                    }
                }

                

            }catch(error){

                console.log('Hubo un error y fue: ',error);

                // Se despacha la acción al store, se agrega el texto.
                //dispatch(addText({str_message: texto, bool_isUser: true})); 

                // Agregamos la respuesta de la API
                dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
            
                // Limpiamos el texto en el input
                setTexto(''); 
            }

        }

        // Petición para draft
        if (texto && str_model == 'memoWriting'){

            let url_1 = host + '/legal_research/draft_1';
            let url_2 = host + '/legal_research/draft_2';
            let url_3 = host + '/legal_research/draft_3';
            let url_4 = host + '/legal_research/draft_4';
            let url_5 = host + '/legal_research/draft_5';
            let url_6 = host + '/legal_research/draft_6';
            let url_7 = host + '/legal_research/draft_7';
            // Intentamos tirar la petición a la API
            
            try{
                
                let response;
                // Tiramos la peti

                if(int_countAnswer == 0){
                    response = await fetch(url_1, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(1));
                }else if(int_countAnswer == 1){
                    response = await fetch(url_2, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(2));
                }else if(int_countAnswer == 2){
                    response = await fetch(url_3, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(3));
                }else if(int_countAnswer == 3){
                    response = await fetch(url_4, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(4));
                }else if(int_countAnswer == 4){
                    response = await fetch(url_5, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(5));
                }else if(int_countAnswer == 5){
                    response = await fetch(url_6, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(6));
                }else if(int_countAnswer == 6){
                    response = await fetch(url_7, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(0));
                }

                
                // Verificamos si existe respuesta
                if(typeof response !== 'undefined'){
                    // Logica en función de lo respondido
                    if (response.ok){

                        const res = await response.json();

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: res.response, bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 

                        // Cambiamos el estado de bool_isAnswer a true o false
                        dispatch(change());

                    }else{

                        console.error('Hubo un error en la petición');

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 
                    }
                }

                

            }catch(error){

                console.log('Hubo un error y fue: ',error);

                // Se despacha la acción al store, se agrega el texto.
                //dispatch(addText({str_message: texto, bool_isUser: true})); 

                // Agregamos la respuesta de la API
                dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
            
                // Limpiamos el texto en el input
                setTexto(''); 
            }
        }

        /**
         * BASIV BOT FETCH DATA
         * 
         */
        if(texto && str_model == 'basicBot')
        {
            try
            {
                let url = host + "/basic_bot";
                let response = await fetch(url, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body    : JSON.stringify({
                        request : texto
                    })
                });


                // Verificamos si existe respuesta
                if(typeof response !== 'undefined')
                {
                    // Logica en función de lo respondido
                    if (response.ok){

                        const res = await response.json();

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: res.response, bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 

                        // Cambiamos el estado de bool_isAnswer a true o false
                        dispatch(change());

                    }else{

                        console.error('Hubo un error en la petición');

                        // Se despacha la acción al store, se agrega el texto.
                        //dispatch(addText({str_message: texto, bool_isUser: true})); 

                        // Agregamos la respuesta de la API
                        dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
                    
                        // Limpiamos el texto en el input
                        setTexto(''); 
                    }
                }
            }
            catch(error)
            {
                console.log('Hubo un error y fue: ',error);

                // Se despacha la acción al store, se agrega el texto.
                //dispatch(addText({str_message: texto, bool_isUser: true})); 

                // Agregamos la respuesta de la API
                dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
            
                // Limpiamos el texto en el input
                setTexto(''); 
            }
        }

        
        // Apagamos la animación del spiner
        dispatch(change_wait());
      
        assignIntoStorage(int_countAnswer);
    };

    return (
    <Fragment>
        <FormSenderTag onSubmit={handleSubmit} className='h-1/6 d-flex flex-column align-items-center justify-content-center'>
            <div className='rounded-full my-auto bg-white d-flex flex-row justify-content-between align-items-center p-1 w-100'>
                
                <FormSenderInput name='message' value={texto} onChange={(event) => setTexto(event.target.value)} className='w-100 rounded-full h-100 outline-none focus:outline-none' placeholder='Send a message'></FormSenderInput>
                
                <button type='submit' className='chat-user rounded-full rounded-circle img-fluid flex items-center justify-center p-3 m-1'>
                    <svg width="23" height="23" viewBox="0 0 21 21" fill="none" >
                        <path d="M20.3803 0.619692C20.2664 0.506353 20.1225 0.427882 19.9656 0.393504C19.8087 0.359127 19.6452 0.370272 19.4943 0.425629L0.931845 7.17563C0.771759 7.23635 0.633934 7.34434 0.536676 7.48525C0.439418 7.62616 0.387329 7.79332 0.387329 7.96453C0.387329 8.13575 0.439418 8.30291 0.536676 8.44382C0.633934 8.58473 0.771759 8.69272 0.931845 8.75344L8.17966 11.6475L13.529 6.28125L14.7187 7.47094L9.34403 12.8456L12.2465 20.0934C12.3091 20.2504 12.4173 20.385 12.5572 20.4798C12.6971 20.5746 12.8622 20.6252 13.0312 20.625C13.2017 20.6215 13.3672 20.5664 13.5058 20.467C13.6443 20.3676 13.7495 20.2285 13.8075 20.0681L20.5575 1.50563C20.615 1.35635 20.6288 1.1938 20.5975 1.03695C20.5661 0.880087 20.4908 0.735378 20.3803 0.619692Z" fill="white"/>
                    </svg>
                </button>

            </div>
        </FormSenderTag>
        <TextCopied>Text copied!</TextCopied>
    </Fragment>

  )
}

export default MessageSender

const FormSenderTag = styled.form`
    width: 90%;
`;

const FormSenderInput = styled.input`
    padding: 0.8rem 1rem;
    background: transparent;
`;