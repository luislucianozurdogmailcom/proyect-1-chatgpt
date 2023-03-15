import React, { Fragment } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addText} from '../Reducers/chatText'
import {change} from '../Reducers/answerResponse'
import {change_wait} from '../Reducers/waitingResponse'
import {changeCookie} from '../Reducers/cookie'
import Cookies from 'universal-cookie'
import {changeCount} from '../Reducers/countAnswer'


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
    

    const handleSubmit      = async (event) =>{
        event.preventDefault(); //evitamos que la página recargue

        // Activamos el spin animation
        dispatch(change_wait());

        // Texto del usuario
        dispatch(addText({str_message: texto, bool_isUser: true})); 
        
        // Petición para legal question
        if (texto && str_model == 'shortLegal') {
            
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
                            'Set-Cookie'   : 'session=.eJylVU2PG0UQ_SulFRIXY3l3kwuXaAVIhAMHQIqQVrLa0zWeSma6m_6w1yD-O696ZpJx7F0RuI26u17Vq_eq5q8bG02bt9Y32_clSrLSZPHu5tub70wvrY9OzM1q8SqfAuN24MHjXJxkMf22NU0OJmeOGvpACBw4Eg-h9ydmkkS5i2wyO3F7yp5a6ZkM9eaYimQyeyMuZfIlUuOHYNyJdiaxJe_IOPrhl7e_PlCDkzX91vEn5KNJes9P3JQsBxx0njpjgb3zrmhek-noS29xjPsDp8x63fgSUMPgXe6A0aJ46iZACiaimBZfqcTQlzSmHSEjh8iJ3YgzgFVEEyj4qL3TsA6Ek-lNPK3pR3z7uDdO_jT1XjNc4K_AAmg7X9AMFC3R6n1ecE105Mi0B0v0hO6-qaVT4gNH4xquCAiQSO_9bnodIdSB9Tz6su8q4EwJAoYoA6rctr7v_bGErXEJcQkq3o6ULejNlUyBKqfEyD0fjMuqpl6qOGCBq0zWo1rnQSUENlGf1OZXWXGgJkAnNMxKCkVTgEU9GHsczGlAh9d0d0VwNHwQZ_Joj5-KY7rfrOhuc4fX91cC-CkwjD1aL3LD6pTZISD31e1mtdls1vRqqfNSqKUQXyeYx-UI08-EpyS9NJL7E6VcixO3iFM6H-NGWy5BKcneIebYcY06jfrBCGzX9HpNvzNMks-Ku8wIejuuWUBWE5bg3XkeOAKzpr2YjiwVPO_rK50OvVLVV6hFmq5m-h49G3ZQ6P526vM18_xRNNw7tc-je3Sw0Ls6fqqZ1vCk1K846s2jg3Lv5mdzqZPVYRp4SZoLH6IAX80FBbL5UDm1LZQG3v0X4I0dnbl_RD0v8NUXA-5Y4bALWxYVxxa-hH39IqzHeazrVKF1M7JL4xpBjTt23EpOarReuJylfwOFEsMK9pkB_9mvztOqTDq0F6yWHcF2mcdPqrVGH-N48mVdtQoDIwYjMO-_SPQCz2vc1vQ26xZSkKbXDdNGP9R7czDSmx02uzjFm3ZuxzXDRRnPlfBpqwbTfDB7hSNjrYysRxXz0X--hNf0MD3CH-GsgtoX9MQx23FSQ_QHsbqILGTUX2ldkarP-rp4ywGjecIm95ztTdJ6dLc2Jelf9Ci5Oyf_jMtfHsNjFPzk3X93-8tT-b_c_vc_ShYtHA.ZA_f1w.jhIhViCLTrqjYV4HNaUC0PhQK24; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=.eJyrVkopSkwriU_JT47PKi3KLE7JTC7JzM9TslJyTszJTMsvystMVNJBUlVSWZAKlM1Nzc1XqgUA9u4XMg.ZA_TKg.2COs3csf23fh6fBnp3xfFAhNKA0; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=.eJylVU2PG0UQ_SulFRIXY3l3kwuXaAVIhAMHQIqQVrJ6pms8lcx0N_3hWYP477zqGSd27F0RuI26ul7Vq_e65q8bG02Xt9a32_clSrLSZvHu5tub78wgnY9OzM3q5FbKh4ERDhxTMUn2fBbOh6DRkUePc3GSxQzbzrQ5mJw5KvIDAXfkSDyGwR-YSRLlPrLJ7MTtKHvqZGAyNJgpFclkdkZcyuRLpNaPwbgDNSaxJe_IOPrhl7e_PlCLkzX91vMn5MkkjfMTtyWjWZp6T72xwG68K1rXZJp8GSyOEd9zyqzh1peAHkbvcg-MDs1TvwBSMBHNdPhKJYahpLnsDBk5RE7sZpwRrCKGQMFHHa2m9SCczGDiYU0_4tvHnXHyp6lxrXCBvwILoDW-YBhoWqLVeD7hmmjiyLQDS8yE7r6prVPiPUfjWq4ISJBI732z3I4Qas96Hn3Z9RXwSAkChigjutx2fhj8VMLWuIS8BBVvZ8oW9I6dLIkqp8TIA--Ny6qmBlUcsEAok_Xo1nlQCYFN1Ct1-FVWHKgJMAlNs5JC0RJgUQ_mGQdzGDHhNd1dERwDH8WZPNvjp-KY7jcrutvc4fb9lQR-Cgzfz9aL3LI65egQkPvqdrPabDZrenWq86lQp0J8nWAelyNMfyS8FBmklTwcKOXanLiTPKXzMW-25SkoJdk55Ew916zDrB-MwHZNr9f0O8Mk-ay5y4qg13CtArJasATvzuvAEXhrOovlyFLB9aHe0tehIVV9hV6k7Wul7zGzsYFC97fLnK-Z54-i6d6pfR7do4OF3tXnp5ppD09K_Yqj3jw6KPfueO3Y6mJ1mAZekvbCh2jAV3NBgWw-VE5dB6WBd_8FePNEj9w_op43-OqLARtWOOzCjkXFsYUvYV-_COtxHus6VWjdjOzSvEbQY8OOO8lJjTYIl7Pyb6BQYljBPvPAf_ar87Iqkz7aC1anE8F2OT4_qdaafYzjxZd11SoMjBiMwLz_otALPK9xW9PbrFtIQdpBN0wX_VjjZm9kMA02uzjFW3Zuz7XCRRvPtfBpqwbTfjA7hSNjrcysZxXz5D9fwmt6WC7hj3DWQZ0LZuKY7fxSQ_R7sbqILGTUX2ldkarP-rp4pw-Mji9scc_Z3iTtR3drW5L-RSfJ_Tn5Z1z-8jOcouAn7_67219-lf_L7X__A4qNOIc.ZA_iwg.dWmdvt_sfjUEVzZPoG-4Cop8Xpk; SameSite=None; Secure',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body    : JSON.stringify({
                            request : texto
                        })
                    });

                    dispatch(changeCount(3));
                }else if(int_countAnswer ==3){
                    response = await fetch(url_4, {
                        method      : 'POST',
                        mode        : 'cors',
                        credentials : 'include',
                        headers     : {
                            'Content-Type' : 'application/json',
                            'Set-Cookie'   : 'session=.eJylVU2P40QQ_SulERKXEGVmdi9cViNAYjlwAKQV0khRx12Oa9fubvojnoD477xqO0NMMiMWblZX96t69V6V_7ix0bR5a32z_ViiJCtNFu9uvr75xvTS-ujE3KzObgUT8xHh3DFZbtlZ4_LiRsrHnnEjcEzFJDnwIpyPQaMDDx7n4iSL6betaXIwOXPU3A-EzANH4iH0_shMkih3kU1mJ25P2VMrPZOh3oypSCazN-JSJl8iNX4Ixh1pZxJb8o6Mo-9-ev_zAzU4WdMvqP0ZeTRJ4_zETckolsbOU2cssHfeFc1rMo2-9BbHiB84ZdZw40tADYN3uQNGi-KpmwFJ-0S-xVcqMfQlTWknyMghcmI34QxgFdEECj5q8_VZB8LJ9CYe1_Q9vn3cGye_mxrXDBf4K7AA2s4XNANFS7Qaz2dcE40cmfZgiZ7Q3Ve1dEp84GhcwxUBDyTSR7-bb0cIdWA9j77suwp4ogQBQ5QBVW5b3_d-LGFrXMK7BBVvJ8oW9E6VzA9VTomRez7APaqmBlUcsEAok_Wo1nlQCYFN1Cu1-VVWHKgJ0InqQkmhaAqwqAdTj4M5Dujwmu6uCI6GD-JMnuzxQ3FM95sV3W3ucPv-ygN-CozJmKwXuWF1yskhIPfF7Wa12WzW9OZc53OhzoX4MsE8LkeY_kR4TtJLI7k_Usq1OHFn75TO87vJlueglGTv8GbsuL46TvrBCGzX9HZNvzJMkhfFXWYEvR3XLCCrCUvwbpkHjsCsaS_mI0sF1_t6S6dDQ6r6CrVI09VM36Jnww4K3d_Ofb5mnt-KPvdO7fPoHh0s9KGOn2qmNTwp9SuOevfooNyH07VTqbPVYRp4SZoLH6IAX80FBbL5VDm1LZQG3v1n4E0dPXF_Rl0W-OazAXescNiFLYuKYwtfwr59FdbjPNZ1qtC6GdmlaY2gxh07biUnNVovXBbp30GhxLCCfWHAf_SrZVqVSYf2gtV5R7BdTuMn1VqTj3E8-7KuWoWBEYMRmPdfJHqF5zVua3qfdQspSNPrhmmjH2rcHIz0ZofNLk7x5p3bcc1wUcZLJfy9VYNpPpm9wpGxVibWk4p59P9cwmt6mC_hj7CooPYFPXHMdprUEP1BrC4i_Irrr7SuSNVnfV288wGj04TN7lnsTdJ6dLc2JelfdJTcLcm_4PLXx3CMgp-8--9uf30q_5fb__wLHqlEtA.ZA_i-g.cjnyjSDT34f-G8ObAYx8vIbuxpY; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=eJztVk2PG0UQ_SulFRIXY3m94cIlWhEkwoEDICGklayemRpPJTPdTX_YaxD_nVc9M4kn9q5IuICUm9Xd9ape1Xs1_vOmCaZNu8bVu9bUaedNShzszTc399S6MHAgHnzvTswkkVIX2CS2YveUHLXSMxnqzTFmSWT2RmxM5HKg2g3e2BNVJnJDzpKx9N1Pr3--pxona_ql4_fIRxP1nh-5zkkOOOgcdaYBduVs1rwm0dHlvsEx7g8cE-t17bJHDYOzqQNGi-KpmwDJm4BiWvyKOfg-xzHtCBnYB45sR5wBrIKYnrwLSVAuwjoQjqY34bSm7_Hbhb2x8ocp95rhAn8FFkCrXEYzULSERu_TGddIRw5Me7BET2j7VSmdIh84GFtzQUCABHrjqul14MEdWM-Dy_uuAM6UblZnM3yTg8RGai0RM_zW9IIpWjGLV1r3CdcK03DLtjE2LV8EGcB717q-d8fsd79ndBygEWEP9sHerunXMhMTR3qPUA816OJMeKrv5YPd4u38bJ74xB8CsS5J_WEUoQAXVGKQVTJvVW_ctlwn4N19BN44a5WLQrxDXRb44qMBK1Y4tLZlUQE1mS9hv34W1uE8FI8ptNqFbRy1hRorttxKiiSWeuG8SP9yMauYTj1jLJ5DzCYiweI6nbzeDpAQzsVKgsyL2T97_X_o9QtnGhsRp768HSlfMaGOU0Lgng9w-qxUHQ5YRPVY41AtlE7GezbFI6X5Zaw4UBGgE2VjSPRZU4DFmSW8OQ3o8Jq2VwaOhg9iTRrl8UO2THebFW03W7y-uxLAjx5mn6QXuGZVyqwQkPvidrPabDZrenE-5_NBnQ_iywjx2BQg-pnwlKSXWlJ_ophKcWLP4pTOu7hRlgsvR9lbxBw7LlGncX4QAjdrgvl_Y4gkLYq7zAh6FZcsIKsJs3d2mQeKgNfKChyPGsp43pdX82rTqa9Qi9RdyfQKPRsqTOjudurzNfF8Xuv_sbUeGVJonjD4j261TKtjUtNesDrvCLbLbD8p0hp1jONJl2XVKgyE6I1AvP8g0TM8r3Fb0-ukW0hB6l43TBvcUO7NwUhvKmx2sYo37dyOS4aLMp4q4f1W9aZ-a_YKR6ZpZGQ9TjEd3YdLeE330yN8ERYVlL6gJ5a5GZ3qgztIo4sIf5vKp7SsSJ3P-vrwzg1Gs8Mm9Sz2Jmk9ulvrHPUrepTULck_ofLnbXgMgo-8_XS1P-_Kf6X2v_4Gy1mDlA.ZA_jHQ.VAYj3CMQCkIWa7Y4jFn4s3f6otk; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=.eJztV02PG0UQ_SulFRIXY3m9yYVLtApIhAMHQIqQVrLa0zWeTma6m_7w7ID477zqGWc9a8cQEsEi5Tbq6n718V5V2b9f6aDqtNGu2tSqShuvUuJgr76-uqXahY4DcedbNzCTiZSawCqxNXZHyVFtWiZFrepjNonUThkbE7kcqHKdV3agrYqsyVlSlr798dVPt1ThZEk_N_yA3Ksodr7nKiezx0HjqFEa2Ftns_hViXqXW41j2PccE4u5ctkjhs7Z1ACjRvDUTIDkVUAwNb5iDr7NcXQ7Qgb2gSPbEadDVsGolrwLySBcPGuQcFStCsOSvsO3CztlzW-q2MXDCf4CWQBt6zKKgaBN0GJPR7lG6jkw7ZAlakLrr0roFHnPQdmKCwIemEBv3Ha6Hbhze5bz4PKuKYCHlK4WRxy-ycFEbSoJERy-VK0Bi9ao2S2Je4BZYDTXbLWyaX4jmA55b2rXtq7PfqNsRCQRj6SCGtU6JDbFIeowIXDLe4CJOMQoXKMoMCXSDslbh8p4zyrIlcJlUQkORFMobAnKRJ_FBYpSDkbKvBo6EHZGPCCvM1alUWrfZ8t0s1rQerVeL-nmzAO-94wqjTIOXLGo7qA2ZPbF9WqxWq2OBXPM-DGjX0ao0KaA9jmkOnloTWVSO1BMJTJjj95JIu_ejfo-BqVodhZv-obLq2EUAhTFekm_MKSWZpGdukNiWy4ukKZ4y97ZuRPoCh0rVZiONGVcb8st6TExCdkLBGKqpnj6BtXqtiDm5nqq8GXp_JoFyFkRz529s9dLel3aWXiTaO6lAmck9eLOgr3Xh2uHoKfWgWogJlOdCBEBuKIuEJHU25JdXYNt4N18AN5Y20MV3qHOA3z2wYBbFjh0Zc1GaNKZT2GfX4R1OA9lPAu0TFq2cRxLiHHLlmuTouitNZxn7l_MuIoMeei_ZOtTJ3i2mCdcXeb-Y2rwqXXwKPR5idPQMmrpMT2zivAxM6fBi7XDgMc5ejFhCZVV_HkT_w838YW9eT2m_F-vzvW_uj2fPdEF-vwp7tDPm_Opb84z-_KhwX9wi7lboUma9iSr44pguhzazxRpjTrG8aTLMmoFBkL0ykC8f8PRhTzP5bakV0mmkIBUrUyYOriu2NVemVZtMdmNFbxp5jZcPJyE8b4QHqaqV9VbtRM4UlqbMeuRxdS7x0N4SbfTJWyEWQSlLqiJZdZjp_rg9kbLIMKfmrJKy4gUfpbnyTtuMHr0a2c2N0nikdla5ShbtDepmSf_HpVfbsM-GCx5-8_VfrkrP0rtf_wJovbRFA.ZA_jSA.S_ByXKtNVPKHa_xUT6FfW-fR0qw; SameSite=None; Secure',
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
                            'Set-Cookie'   : 'session=.eJztVk2PGzcM_SvEokAvruH1JpdegkVaoOmhh7ZAUGCBhTzieJRoJFUf9rpF_3sfNePEs_Y6TRO0G2BvA1F6fCQfOfzzQkfV5lvtm9tWNfk2qJw5uotvL66p9bHnSNwH63fMZBLlLrLK7IxbU_bUGsukyKptKiaTWivjUiZfIjW-D8rtaKUSa_KOlKPvf371yzU1OJnTrx2_R96qJHa-46Zks8FB56lTGtgr74r4VZm2vliNY9g3nDKLufElgEPvXe6A0YI8dSMgBRVBpsVXKjHYkga3A2TkEDmxG3B6RBWNshR8zAZ08axDwElZFXdz-gHfPq6VM3-oahcPR_gzRAG0lS9IBkibqMWeD2JNtOXItEaUyAktv6nUKfGGo3INVwQ8MJHe-NV4O3LvNyzn0Zd1VwH3IV3MDmr4pkSTtGmEImr4UlmDKjqjJreE9w5mgdHcstPK5emNaHrEfdt6a_22hFvlEpgkPJIMamRrH9jIQ9RhYmTLG4CJOMQotUZSYMqkPYJ3HpkJgVWUK7WWVSU4EE0hsZWUSaGICySlHgwlC2rXo2AnxIPi9capPEjtx-KYrhYzWi6WyzldnXjAd4GRpUHGkRsW1e3Vhsi-ulzMFovFoWAOK35Y0a8TVOhyRPvsQx09WNOYbHeUcmVm3ME7CeTdu0Hfh6CUzNrhzbbj-mo3CAGKYj2n3xhSyxNmx-4Q2IqrC4Qp3krwbuoEukLHShbGI00F1229JT0mJin2DERM01VP3yFb_QqFubocM3xeOr8XAfJOxHPjbtzlnF7Xdpa6CZs7ycAJSb24caje6_21PemxdaAaiMk0R0IEAV_VhUJk9bZG17aoNvCuPgJvyO0-C-9QpwSffTTgigUOXdmykTLpwsewz8_CepzHOp4FWiYtuzSMJXBcsePW5CR6s4bLxP2LSa0SQx76gUb_yc-mBKRg0r9H8R3mBnNr34ymym0QNo5HrdYhLjAQZ1AGav4Hjs5EfCrKOb3KMpAEpLEybNro-2pXG2WsWuGfYZzgjdO84-rhiMZDFN7P66Cat2otcKS0NkPUQz3z1t8f73O6Hi_hXzNhUPOCnDhmPXRviH5jtIwlDGm0af0zDvWZf6iMp5ruc-v0ZE8ctdz5Fv4UKX_udr5HfZrivLOMXAb0RlEJPibmvAti7fGfxnmtlbJ1o3paqL7AherM-nM5hPx_b0DL_3QJevZI96Dnj3EVelqAHvsC9LT2fMFrzweWHbq37UzmJgkfma1NSfIX3ZrcTYN_QOXn23AbDX7y7t-r_XxXfpLa__ob7994ZQ.ZA_j_Q.qVGBq0Sn8efSB6VACUfk5J-lX2s; SameSite=None; Secure',
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