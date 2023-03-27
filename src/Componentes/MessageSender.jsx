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

        // Activamos el spin animation
        dispatch(change_wait());

        // Texto del usuario
        dispatch(addText({str_message: texto, bool_isUser: true})); 
        
        // Petición para legal question
        if (texto && (str_model == 'shortLegal' || str_model == 'legal_question')) {
            
            let url_legal_api = int_countAnswer == 1 ? 'https://callidus.eastasia.cloudapp.azure.com/question/question_answer' : 'https://callidus.eastasia.cloudapp.azure.com/question/question_intake';
           
            
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

            let url_1 = 'https://callidus.eastasia.cloudapp.azure.com/fact_pattern';
            let url_2 = 'https://callidus.eastasia.cloudapp.azure.com/fact_pattern_2';
            let url_3 = 'https://callidus.eastasia.cloudapp.azure.com/fact_pattern_3';
            
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
                            'Set-Cookie'   : 'session=.eJyVk01v1EAMhv-KteeyEgUuXKoKIcEVkListHISz8ZlMh48nk0XxH_Hk-xCSyWk3iJ_PPPar_NzMygG2w_S7--qchm4N5a0ebt5h5GDaGLcXD2oslMmz040icc5sTHGfcDeMpqRttZb8MaJFGjKUU5EwAVsVEKjxOkAJhA4EiBEnEtlAzwgp2IgVaGXKWM6QYeFBpAEmOD9p4-fb6H3yBa-jPSXPGNpebqnvhofPTAKjDg4u5NU27toMEuNg4c9f6Ri1NK91OwaJkk2OiO4eBjPQMioLib4V6maYy3rsytSKSsVSitn8qnUlwBZtO2utY0-cMGIetrCB_8WPWDiH7jk2wtP-Fc-hdM6qb4MF806tLw9mLXATEpw8Cl9J3D9YpEOhY6kmHpaCN7ACnfSnavVjTpSi6vUw7gALyO5gVl5cpX7IDHKXPP-e_X9uMriPu7SLr3cwtdlg1hWMfduNQw-80XemXazS9deeym7-HNW63YmMe7_7QIXINoOwo_A8Fu7DgqBenPeq2fwVmeauQ3xh_pY4OtnAztqOD_nQNzsHio9xb75L1Y8rssf0dDtuCmV9RJcY0eJAlsBThCZ6qPnbza_fgNyFVDy.ZA_TPw.EmXlWTCgdLq6YKvP9Prndn8NNL8; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=.eJylVV1v00AQ_CurCImXEKVJ-8ILqgAJeASkCqlSdLbX8RX77riPuAHx35k92yVR0kqFt2jvdnZmZ3z5Nau8quOmsuXmLnkdKl1Gbc3s9eytanVtvdFqNj-4FfeOcdpxZ1HXRket2k2tyuhUjOyl9ZrQ2LEn7lxr98ykA8XGs4pstNlStFTrlklRq_qQdCS1VdqESDZ5Km3nlNlToQJXZA0pQ-8_f_xyTSUqC_ra8F_kXgU553suU9Q7FBpLjaqAXViTZK6K1NvUVijjfMchshyXNjlw6KyJDTBqkKdmBCSnPMjU-BWSd20Kw9gB0rPzHNgMOB1UeSyBnPWyO2lrIDioVvn9gj7gt_VbZfRPlc9lwgn-HCqAVtiEZYC09pWcxwOtgXr2TFuoxE5o9SpTp8A79sqUnBHQoD3d2WK87WHUjqXubdo2GXCSBAOd1x1YbmrbtrZPbqNMQF-AixeD5AryJiZjo9ipveeWd8pEcVMOxRyowFGkyoKtsZDiHCsvV_Lys60oSAiwCWmrdHBJRkBFLgw7dmrfYcMLWp0xHAvvtFFxiMenZJjWyzmtlivcXp9p4HvHCPYQPc8lS1KmhEDci4vlfLlcLujy0OdDow6NeBkQHhM9Qj8JHoe0utSx3VOImZw2B30i56FviOUhKAW9NejpG85d-8E_BIGrBV0t6BsjJPGI3OlEyCs4T4FYGZicNcdzkAh8a7KLsVRRwvU235KvQ47E9Tm46LLJk95hZ10Bh9YX457PhedHknZrJD635tYgQjf58xPPhMO9SD-TqDe3Bs7dTNcmqmPUERpkSZcnOQQBm8MFB6L6njXVNZwG3voZeMNGJ-0PqMcEL58NWLDA4S2sWYs5VeJT2KsnYS3qPj-nAi0vI5swPCPgWLDhWscgQWs1p6Pxb-BQYEShetQjmkwaCRx9eiTvinyeZQryEPc6Nsc0H1nU0072XuN_wvz7wp429r8W9vsPDWqJ0A.ZA_TTQ.AVwoXnx5PwBb4h_SfbtGWtxz7ic; SameSite=None; Secure',
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
                            'Content-Type' : 'application/json',
                            'Set-Cookie'   : 'session=.eJylVU2PG0UQ_SulFRIXY3l3kwuXaAVIhAMHQIqQVrLa0zWeSma6m_6w1yD-O696ZpJx7F0RuI26u17Vq_eq5q8bG02bt9Y32_clSrLSZPHu5tub70wvrY9OzM1q8SqfAuN24MHjXJxkMf22NU0OJmeOGvpACBw4Eg-h9ydmkkS5i2wyO3F7yp5a6ZkM9eaYimQyeyMuZfIlUuOHYNyJdiaxJe_IOPrhl7e_PlCDkzX91vEn5KNJes9P3JQsBxx0njpjgb3zrmhek-noS29xjPsDp8x63fgSUMPgXe6A0aJ46iZACiaimBZfqcTQlzSmHSEjh8iJ3YgzgFVEEyj4qL3TsA6Ek-lNPK3pR3z7uDdO_jT1XjNc4K_AAmg7X9AMFC3R6n1ecE105Mi0B0v0hO6-qaVT4gNH4xquCAiQSO_9bnodIdSB9Tz6su8q4EwJAoYoA6rctr7v_bGErXEJcQkq3o6ULejNlUyBKqfEyD0fjMuqpl6qOGCBq0zWo1rnQSUENlGf1OZXWXGgJkAnNMxKCkVTgEU9GHsczGlAh9d0d0VwNHwQZ_Joj5-KY7rfrOhuc4fX91cC-CkwjD1aL3LD6pTZISD31e1mtdls1vRqqfNSqKUQXyeYx-UI08-EpyS9NJL7E6VcixO3iFM6H-NGWy5BKcneIebYcY06jfrBCGzX9HpNvzNMks-Ku8wIejuuWUBWE5bg3XkeOAKzpr2YjiwVPO_rK50OvVLVV6hFmq5m-h49G3ZQ6P526vM18_xRNNw7tc-je3Sw0Ls6fqqZ1vCk1K846s2jg3Lv5mdzqZPVYRp4SZoLH6IAX80FBbL5UDm1LZQG3v0X4I0dnbl_RD0v8NUXA-5Y4bALWxYVxxa-hH39IqzHeazrVKF1M7JL4xpBjTt23EpOarReuJylfwOFEsMK9pkB_9mvztOqTDq0F6yWHcF2mcdPqrVGH-N48mVdtQoDIwYjMO-_SPQCz2vc1vQ26xZSkKbXDdNGP9R7czDSmx02uzjFm3ZuxzXDRRnPlfBpqwbTfDB7hSNjrYysRxXz0X--hNf0MD3CH-GsgtoX9MQx23FSQ_QHsbqILGTUX2ldkarP-rp4ywGjecIm95ztTdJ6dLc2Jelf9Ci5Oyf_jMtfHsNjFPzk3X93-8tT-b_c_vc_ShYtHA.ZA_b2w.h4b3vQuKPbOTTcA4rFldF_clc-Y; SameSite=None; Secure',
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

            let url_1 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_1';
            let url_2 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_2';
            let url_3 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_3';
            let url_4 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_4';
            let url_5 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_5';
            let url_6 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_6';
            let url_7 = 'https://callidus.eastasia.cloudapp.azure.com/legal_research/draft_7';
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=6e91bd3a-cc88-4cba-b299-eba9069829de; SameSite=None; Secure',
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


        let host = "https://callidus.eastasia.cloudapp.azure.com/";
        if(texto && str_model == 'factPattern')
        {

            try
            {
                let url = host + "legal_research/fact_pattern/intake";
                dispatch(changeCount(1));
    
                if(int_countAnswer == 1)
                {
                    url = host + "legal_research/fact_pattern/answer";
                    dispatch(changeCount(2));
                }
                else if(int_countAnswer == 2)
                {
                    url = host + "legal_research/fact_pattern/continued_conversation";
                    dispatch(changeCount(0));
                }
    
                let response = await fetch(url, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',  
                        'Set-Cookie'   : 'session=68b6e8a1-cd6c-4070-97fe-1df8ca4ef8c2; SameSite=None; Secure',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body    : JSON.stringify({
                        request : texto
                    }),
                    redirect: 'follow'
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


        if(texto && str_model == 'basicBot')
        {
            try
            {
                let url = host + "basic_bot";
                let response = await fetch(url, {
                    method      : 'POST',
                    mode        : 'cors',
                    credentials : 'include',
                    headers     : {
                        'Content-Type' : 'application/json',
                        'Set-Cookie'   : 'session=68b6e8a1-cd6c-4070-97fe-1df8ca4ef8c2; SameSite=None; Secure',
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