import React, { useState, useEffect } from 'react';


const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      
      // Logica si text es un array 
      let cadenaTexto = '';
      if (Array.isArray(text)){
        
        // Extraemos el primer array de info
        cadenaTexto += text[0];

        // Extraemos la demas información dentro del array que serán citas
        text[1].forEach((item) => {
          
          cadenaTexto += '\n \n Cite: ';
          cadenaTexto += item[0];
          cadenaTexto += '\n URL: ';
          cadenaTexto += item[1];

          
        });

        setDisplayText(cadenaTexto.slice(0, i));
          i++;
          if (i > cadenaTexto.length) {
            clearInterval(timer);
          }
      }

      // Logica si text es texto
      if( typeof text == 'string'){
        setDisplayText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(timer);
        }
      }
      
    }, 20);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className='w-100 break-words chat-letter' style={{whiteSpace: 'pre-wrap'}}>
      {displayText}
    </div>
  );
};

export default TypingText;
