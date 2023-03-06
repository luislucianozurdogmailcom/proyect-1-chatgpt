import React, { Fragment } from 'react'
import { useState } from 'react'

const MessageSender = () => {
  
    const [texto, setTexto] = useState('');
    const [data, setData]   = useState([]);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const url_api = 'https://jsonplaceholder.typicode.com/posts';
        
        // Codigo del comportamiento del botón
        try {

            // Hacemos la peticion al endpoint
            const response = await fetch(url_api, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                //body: JSON.stringify({request:texto})
                body: JSON.stringify({
                    title: 'mi primera nota',
                    body:  texto,
                    userId: 1,
                })
            });
            
            // Si responde procedemos
            if (response.ok){
                console.log('La solicitud se envió con éxito');
                const res = await response.json();
                console.log(res);
                
            } else{
                console.error('Hubo un error al enviar la solicitud');
            } 
        }catch (error){
            console.error('Hubo un erro al enviar la solicitud y fue: ',error);
        }
    };

    return (
    <Fragment>
        <form onSubmit={handleSubmit} className='flex h-1/6 flex-col items-center justify-center'>
            <div className='w-3/4 min-h-50 rounded-full h-1/3 my-auto bg-white flex flex-row justify-between items-center pl-6 pr-2'>
                
                <input name='message' value={texto} onChange={(event) => setTexto(event.target.value)} className='w-full h-full outline-none focus:outline-none' placeholder='Send a message'></input>
                
                <button type='submit' className='chat-user text-white rounded-full h-10 w-10 flex items-center justify-center'>
                    <svg width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3803 0.619692C20.2664 0.506353 20.1225 0.427882 19.9656 0.393504C19.8087 0.359127 19.6452 0.370272 19.4943 0.425629L0.931845 7.17563C0.771759 7.23635 0.633934 7.34434 0.536676 7.48525C0.439418 7.62616 0.387329 7.79332 0.387329 7.96453C0.387329 8.13575 0.439418 8.30291 0.536676 8.44382C0.633934 8.58473 0.771759 8.69272 0.931845 8.75344L8.17966 11.6475L13.529 6.28125L14.7187 7.47094L9.34403 12.8456L12.2465 20.0934C12.3091 20.2504 12.4173 20.385 12.5572 20.4798C12.6971 20.5746 12.8622 20.6252 13.0312 20.625C13.2017 20.6215 13.3672 20.5664 13.5058 20.467C13.6443 20.3676 13.7495 20.2285 13.8075 20.0681L20.5575 1.50563C20.615 1.35635 20.6288 1.1938 20.5975 1.03695C20.5661 0.880087 20.4908 0.735378 20.3803 0.619692Z" fill="white"/>
                    </svg>
                </button>

            </div>
        </form>
    </Fragment>

  )
}

export default MessageSender