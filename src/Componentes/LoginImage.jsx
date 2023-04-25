import React from 'react'
import image from '../assets/callidus 1.png'
import { Fragment } from 'react'
import styled from 'styled-components';

const Title = styled.h6`
  font-size: 12px;
`;

const LoginImage = () => {
  return (
    <Fragment>
        <div className='w-1/2 flex flex-col h-full'>

          <div className='w-full h-5/6 fondo-login flex flex-col items-center justify-center'>
              <img src={image} className="login-image-size object-cover"></img>
          </div>

          <div className='w-full h-1/6 fondo-login text-white text-center flex flex-col justify-center text-3xl font-extralight'>
            <Title className='small-textmall'>
              Copyright 2023 CallidusAI, Inc. | Todos los derechos reservados.
            </Title>
          
          </div>
        </div>
    </Fragment>
  )
}

export default LoginImage