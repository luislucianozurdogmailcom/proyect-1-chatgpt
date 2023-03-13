import React, { Fragment } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addText} from '../Reducers/chatText'
import {change} from '../Reducers/answerResponse'
import {change_wait} from '../Reducers/waitingResponse'
import {changeCookie} from '../Reducers/cookie'
import Cookies from 'universal-cookie'

const MessageSender = () => {
  
    // Ponemos la lógica del texto
    const [texto, setTexto] = useState(''); // Variable de estado para el texto en input + su funcion setTexto
    const textos            = useSelector((state) => state.chatText.textos); // Selector para leer el estado actual de los textos
    const bool_isAnswer     = useSelector((state) => state.answerResponse.bool_isAnswer);
    const bool_isWaiting    = useSelector((state) => state.waitingResponse.bool_isWaiting);
    const session_cookie    = useSelector((state) => state.cookie.cookie);
    const dispatch          = useDispatch();// funcion para despachar la accion de actualizar el estado de redux
    

    const handleSubmit      = async (event) =>{
        event.preventDefault(); //evitamos que la página recargue

        // Activamos el spin animation
        dispatch(change_wait());
        
        // Petición versión fetch
        if (texto) {
            
            let url_legal_api = bool_isAnswer ? 'https://callidus.eastasia.cloudapp.azure.com/question/question_answer' : 'https://callidus.eastasia.cloudapp.azure.com/question/question_intake';
           
            
            // Intentamos tirar la petición a la API
            
            try{
                
                // Tiramos la peti
                
                const response = bool_isAnswer ? await fetch(url_legal_api, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',
                        'Set-Cookie'   : 'session=.eJxtkM1OxDAMhF_F6rlCAm5c-hhcKq1M4ramqR3ys1WFeHfcaEFixSnKZDzzOZ9doBnD5aNSLqzSvXSvCxZwiTfKgOJhP-9FU8k98GTS0QMmzgQsUJbzyAXFkV3MiWKC5yv7igFmKhl8qrLCGx1qcedE64TAG5dWYZrAyiFkyLqRCtmMRcg8dP0d4WXSEHSv0VBHGeXxARqxMRQCTfBeDc6zO83A-Ybo2JPYHrhaKsSA7lSHUZ5sHn9cv9y3ekC40sIutGSNlLA0WQ5QG0lQjmhvE2zoFhZKh0U-_xuJO6Zmvf8BkzA4XTSAU8l1iw09JrbOon8WGLqvb5Axnk8.ZAyeig.PQHu-I7RnM6ca_7LTzZj_zKesAw; SameSite=None; Secure',
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
                        'Set-Cookie'   : 'session=.eJxtkM1OxDAMhF_F6rlCAm5c-hhcKq1M4ramqR3ys1WFeHfcaEFixSnKZDzzOZ9doBnD5aNSLqzSvXSvCxZwiTfKgOJhP-9FU8k98GTS0QMmzgQsUJbzyAXFkV3MiWKC5yv7igFmKhl8qrLCGx1qcedE64TAG5dWYZrAyiFkyLqRCtmMRcg8dP0d4WXSEHSv0VBHGeXxARqxMRQCTfBeDc6zO83A-Ybo2JPYHrhaKsSA7lSHUZ5sHn9cv9y3ekC40sIutGSNlLA0WQ5QG0lQjmhvE2zoFhZKh0U-_xuJO6Zmvf8BkzA4XTSAU8l1iw09JrbOon8WGLqvb5Axnk8.ZAyeig.PQHu-I7RnM6ca_7LTzZj_zKesAw; SameSite=None; Secure',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body    : JSON.stringify({
                        request : texto
                    }),
                });
                

                // Logica en función de lo respondido
                if (response.ok){
                    
                    console.log('La soli se envió con éxito');
                    const res           = await response.json();
                    
                    // Logica de obtención de las cookies

                    console.log(response.headers.get('set-cookie'))
                    
                    //const storedObject = localStorage.getItem('session');
                    //const sessionID    = JSON.parse(storedObject);
                    //console.log(sessionID)

                    
                    const cookies       = new Cookies();
                    const allCookies    = cookies.getAll(); 
                    console.log('Cookie', allCookies);
                    
                    //const setCookieHeader = response.headers.get('Set-Cookie');
                    //const cookies         = setCookieHeader.split(';').map(cookie => cookie.trim());
                    //console.log('Cookies:', cookies);

                    // Se despacha la acción al store, se agrega el texto.
                    dispatch(addText({str_message: texto, bool_isUser: true})); 

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
                    dispatch(addText({str_message: texto, bool_isUser: true})); 
                    
                    // Agregamos la respuesta de la API
                    dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
                
                    // Limpiamos el texto en el input
                    setTexto(''); 
                }

            }catch(error){

                console.log('Hubo un error y fue: ',error);

                // Se despacha la acción al store, se agrega el texto.
                dispatch(addText({str_message: texto, bool_isUser: true})); 

                // Agregamos la respuesta de la API
                dispatch(addText({str_message: 'Hubo un error :(', bool_isUser: false}));
            
                // Limpiamos el texto en el input
                setTexto(''); 
            }
            
        }
        
        // Apagamos la animación del spiner
        dispatch(change_wait());
        
    };

    return (
    <Fragment>
        <form onSubmit={handleSubmit} className='flex h-1/6 flex-col items-center justify-center'>
            <div className='w-3/4 min-h-50 rounded-full h-1/3 my-auto bg-white flex flex-row justify-between items-center pl-6 pr-2'>
                
                <input name='message' value={texto} onChange={(event) => setTexto(event.target.value)} className='w-full h-full outline-none focus:outline-none' placeholder='Send a message'></input>
                
                <button type='submit' className='chat-user rounded-full h-10 w-10 flex items-center justify-center'>
                    <svg width="23" height="23" viewBox="0 0 21 21" fill="none" >
                        <path d="M20.3803 0.619692C20.2664 0.506353 20.1225 0.427882 19.9656 0.393504C19.8087 0.359127 19.6452 0.370272 19.4943 0.425629L0.931845 7.17563C0.771759 7.23635 0.633934 7.34434 0.536676 7.48525C0.439418 7.62616 0.387329 7.79332 0.387329 7.96453C0.387329 8.13575 0.439418 8.30291 0.536676 8.44382C0.633934 8.58473 0.771759 8.69272 0.931845 8.75344L8.17966 11.6475L13.529 6.28125L14.7187 7.47094L9.34403 12.8456L12.2465 20.0934C12.3091 20.2504 12.4173 20.385 12.5572 20.4798C12.6971 20.5746 12.8622 20.6252 13.0312 20.625C13.2017 20.6215 13.3672 20.5664 13.5058 20.467C13.6443 20.3676 13.7495 20.2285 13.8075 20.0681L20.5575 1.50563C20.615 1.35635 20.6288 1.1938 20.5975 1.03695C20.5661 0.880087 20.4908 0.735378 20.3803 0.619692Z" fill="white"/>
                    </svg>
                </button>

            </div>
        </form>
    </Fragment>

  )
}

export default MessageSender