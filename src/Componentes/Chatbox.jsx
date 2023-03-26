import React from 'react';
import Header from './Header';
import VerticalCarouselChat from './VerticalCarouselChat';
import MessageSender from './MessageSender';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../Reducers/chatExpand';
import { change_wait } from '../Reducers/waitingResponse';
import carga from '../assets/loguito-carga-removebg-preview.png';
import styled from 'styled-components';

const Chatbox = () => {
  const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);
  const textos = useSelector((state) => state.chatText.textos);
  const bool_isWaiting = useSelector((state) => state.waitingResponse.bool_isWaiting);
  const dispatch = useDispatch();

  return (
    <ChatContainer className='gris-buscador'>
      <ToggleButton onClick={() => dispatch(change())}>
        <i className={`fa-solid fa-chevron-${bool_isChatExpanded ? 'right' : 'left'}`}></i>
      </ToggleButton>

      <ChatContent>
        <Header />
        <VerticalCarouselChat items={textos} />
        <LoaderContainer isChatExpanded={bool_isChatExpanded} isWaiting={bool_isWaiting}>
          <img src={carga} alt="Loader" />
        </LoaderContainer>
        <MessageSender />
      </ChatContent>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
  background-color: #f0f3f6;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  z-index: 2;
  width: 1rem;
  height: 3.5rem;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d6efd;
  border: none;
  border-radius: 0 0.9375rem 0.9375rem 0;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  width: 5rem;
  height: 5rem;
  position: fixed;
  left: ${({ isChatExpanded }) => (isChatExpanded ? '50%' : '66.6667%')};
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isWaiting }) => (isWaiting ? 'block' : 'none')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default Chatbox;
