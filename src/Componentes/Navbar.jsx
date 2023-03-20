import React, { useEffect } from 'react'
import style from '../css/styles.css'
import avatar from '../assets/avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import '../css/main.css'
import { Modal,show,doIt,close,set } from '../Pages/Modal'
import Http from '../Services/Services'
import { Error,Success } from './ErrorsAndSuccess'

let _nav = null;

const logOut = () => {
  let date = new Date()
  set(m => {
    m.header.innerText = 'Close Session';
    m.title.innerText = 'Do you want to close this session?';
    m.letter.innerText = 'Today: ' + date.toDateString() + ' ' + date.toTimeString();
  });
  show();
}

const _close = () => {
  let date = new Date()
  let url = Http.host + Http.routes.logout;
  Http.post(url,{},true,rs => {
    if(!rs.action)
    {
      set(m => {
        m.title.innerText = 'Is not possible close the session right now';
        m.title.classList.add('text-red-500')
      });
    } 
    else
    {
      set(m => {
        m.title.innerText = 'The session is closed!';
        m.title.classList.remove('text-red-500');
        m.title.classList.add('text-green-500','font-bold');
        m.letter.innerText = 'Today: ' + date.toDateString() + ' ' + date.toTimeString();
      });

      localStorage.clear();

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  });
}

const setSelect = (evt) => {
  evt.preventDefault();

  let elm = evt.currentTarget;

    _nav('/' + elm.getAttribute('name'));
}

const Navbar = () => {

  const navigate = useNavigate();

  useEffect(() => {
    let btnLogout = document.getElementById('btn-modal-send');
        btnLogout.addEventListener('click',_close)

    _nav = navigate;
  },[])

  return (
  <nav className="py-2 bg-white h-screen fixed left-0 top-0 flex flex-col space-between w-10p border-r border-gray-300" style={{ justifyContent:"space-between" }}>
    <div id='navigation-container' className='h-1/2'>

      <div className='h-1/4 flex contenedor-central'>
        <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
          <img src={avatar} className="w-full h-full object-cover" />
        </div>
      </div>

      <a href='#' name='' onClick={(e) => setSelect(e)} className='h-1/4 flex contenedor-central text-gray-400' style={{display: 'none'}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.33333 22.1714H5.88889C4.59227 22.1714 3.34877 21.6564 2.43192 20.7395C1.51508 19.8227 1 18.5792 1 17.2825V9.59232C0.999982 8.7517 1.21672 7.92527 1.62928 7.19285C2.04185 6.46043 2.6363 5.84676 3.35522 5.4111L9.46633 1.70777C10.2304 1.24479 11.1066 1 12 1C12.8934 1 13.7696 1.24479 14.5337 1.70777L20.6448 5.4111C21.3635 5.84665 21.9579 6.46012 22.3704 7.19232C22.783 7.92451 22.9998 8.75068 23 9.5911V17.2825C23 18.5792 22.4849 19.8227 21.5681 20.7395C20.6512 21.6564 19.4077 22.1714 18.1111 22.1714H15.6667M8.33333 22.1714V17.2825C8.33333 16.3101 8.71964 15.3775 9.40727 14.6898C10.0949 14.0022 11.0275 13.6159 12 13.6159C12.9725 13.6159 13.9051 14.0022 14.5927 14.6898C15.2804 15.3775 15.6667 16.3101 15.6667 17.2825V22.1714M8.33333 22.1714H15.6667" stroke="#BEBEBE" strokeWidth="1.84638" strokeLinecap="round" strokeLinejoin="round"/>  
        </svg>
      </a>

      <a href='#' name='chat' onClick={(e) => setSelect(e)} className='transition h-1/4 flex contenedor-central text-gray-300 hover:bg-gray-50 hover:text-blue-500'>
        <i className='fa fa-comments text-3xl'></i>
      </a>

      <a href='#' name='files' onClick={(e) => setSelect(e)} className='transition h-1/4 flex contenedor-central text-gray-300 hover:bg-gray-50 hover:text-blue-500'>
        <i className='fa fa-file-text text-3xl'></i>
      </a>

      <a href='#' name='stripe' onClick={(e) => setSelect(e)} className='transition h-1/4 flex contenedor-central text-gray-300 hover:bg-gray-50 hover:text-blue-500'>
        <i className='fa fa-credit-card text-3xl'></i>
      </a>

    </div>


    <div className='h-1/2 flex justify-center items-end'>

      <div className='h-1/4 contenedor-central'>
        <button onClick={() => logOut()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V6H9V4H18V20H9V18H7V20C7 20.5304 7.21071 21.0391 7.58579 21.4142C7.96086 21.7893 8.46957 22 9 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2Z" fill="#BEBEBE"/>
            <path d="M7.91 15.59L6.5 17L1.5 12L6.5 7L7.91 8.41L5.33 11H15V13H5.33L7.91 15.59Z" fill="#BEBEBE"/>
          </svg>
        </button>
      </div>

    </div>
  </nav>

  )
}

export default Navbar