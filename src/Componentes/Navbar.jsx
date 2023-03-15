import React, { useEffect } from 'react'
import style from '../css/styles.css'
import avatar from '../assets/avatar.png'
import { Link } from 'react-router-dom'
import '../css/main.css'
import { Modal,show,doIt,close,set } from '../Pages/Modal'
import Http from '../Services/Services'
import { Error,Success } from './ErrorsAndSuccess'

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

const Navbar = () => {

  useEffect(() => {
    let btnLogout = document.getElementById('btn-modal-send');
        btnLogout.addEventListener('click',_close)
  },[])

  return (
  <nav className="py-2 bg-white h-screen fixed left-0 top-0 flex flex-col w-10p border-r border-gray-300" >
    <div className='h-1/2 '>

      <div className='h-1/4 flex contenedor-central'>
        <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
          <img src={avatar} className="w-full h-full object-cover" />
        </div>
      </div>

      <Link to={'/'} className='h-1/4 flex contenedor-central'>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33333 22.1714H5.88889C4.59227 22.1714 3.34877 21.6564 2.43192 20.7395C1.51508 19.8227 1 18.5792 1 17.2825V9.59232C0.999982 8.7517 1.21672 7.92527 1.62928 7.19285C2.04185 6.46043 2.6363 5.84676 3.35522 5.4111L9.46633 1.70777C10.2304 1.24479 11.1066 1 12 1C12.8934 1 13.7696 1.24479 14.5337 1.70777L20.6448 5.4111C21.3635 5.84665 21.9579 6.46012 22.3704 7.19232C22.783 7.92451 22.9998 8.75068 23 9.5911V17.2825C23 18.5792 22.4849 19.8227 21.5681 20.7395C20.6512 21.6564 19.4077 22.1714 18.1111 22.1714H15.6667M8.33333 22.1714V17.2825C8.33333 16.3101 8.71964 15.3775 9.40727 14.6898C10.0949 14.0022 11.0275 13.6159 12 13.6159C12.9725 13.6159 13.9051 14.0022 14.5927 14.6898C15.2804 15.3775 15.6667 16.3101 15.6667 17.2825V22.1714M8.33333 22.1714H15.6667" stroke="#BEBEBE" strokeWidth="1.84638" strokeLinecap="round" strokeLinejoin="round"/>  
      </svg>
      </Link>

      <Link to='/chat' className='h-1/4 flex contenedor-central'>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.1 15.4C12.4117 15.4 12.6731 15.2944 12.8843 15.0832C13.0955 14.872 13.2007 14.6109 13.2 14.3C13.2 13.9883 13.0944 13.7269 12.8832 13.5157C12.672 13.3045 12.4109 13.1993 12.1 13.2H5.5C5.18833 13.2 4.9269 13.3056 4.7157 13.5168C4.5045 13.728 4.39927 13.9891 4.4 14.3C4.4 14.6117 4.5056 14.8731 4.7168 15.0843C4.928 15.2955 5.18907 15.4007 5.5 15.4H12.1ZM16.5 12.1C16.8117 12.1 17.0731 11.9944 17.2843 11.7832C17.4955 11.572 17.6007 11.3109 17.6 11C17.6 10.6883 17.4944 10.4269 17.2832 10.2157C17.072 10.0045 16.8109 9.89927 16.5 9.9H5.5C5.18833 9.9 4.9269 10.0056 4.7157 10.2168C4.5045 10.428 4.39927 10.6891 4.4 11C4.4 11.3117 4.5056 11.5731 4.7168 11.7843C4.928 11.9955 5.18907 12.1007 5.5 12.1H16.5ZM18.7 6.6C17.7833 6.6 17.0042 6.27917 16.3625 5.6375C15.7208 4.99583 15.4 4.21667 15.4 3.3C15.4 2.38333 15.7208 1.60417 16.3625 0.9625C17.0042 0.320833 17.7833 0 18.7 0C19.6167 0 20.3958 0.320833 21.0375 0.9625C21.6792 1.60417 22 2.38333 22 3.3C22 4.21667 21.6792 4.99583 21.0375 5.6375C20.3958 6.27917 19.6167 6.6 18.7 6.6ZM4.4 19.8L1.87 22.33C1.52167 22.6783 1.12274 22.7564 0.673202 22.5643C0.223668 22.3722 -0.000731542 22.0282 1.79153e-06 21.5325V4.4C1.79153e-06 3.795 0.215602 3.2769 0.646802 2.8457C1.078 2.4145 1.59574 2.19927 2.2 2.2H13.31C13.2367 2.56667 13.2 2.93333 13.2 3.3C13.2 3.66667 13.2367 4.03333 13.31 4.4C13.4017 4.82167 13.53 5.21583 13.695 5.5825C13.86 5.94917 14.0617 6.28833 14.3 6.6H5.5C5.18833 6.6 4.9269 6.7056 4.7157 6.9168C4.5045 7.128 4.39927 7.38907 4.4 7.7C4.4 8.01167 4.5056 8.2731 4.7168 8.4843C4.928 8.6955 5.18907 8.80073 5.5 8.8H18.7C19.2867 8.8 19.8642 8.70833 20.4325 8.525C21.0008 8.34167 21.5233 8.06667 22 7.7V17.6C22 18.205 21.7844 18.7231 21.3532 19.1543C20.922 19.5855 20.4043 19.8007 19.8 19.8H4.4Z" fill="#2A85FF"/>
        </svg>
      </Link>

      <Link to='/files' className='h-1/4 flex contenedor-central'>
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.87535 12.1884H14.626V14.626H4.87535V12.1884ZM7.31302 21.9391H2.43767V2.43767H10.9695V8.53186H17.0637V12.3103L19.5014 9.87258V7.31302L12.1884 0H2.43767C1.79116 0 1.17113 0.256825 0.713978 0.713978C0.256825 1.17113 0 1.79116 0 2.43767V21.9391C0 22.5856 0.256825 23.2056 0.713978 23.6628C1.17113 24.1199 1.79116 24.3767 2.43767 24.3767H7.31302V21.9391ZM4.87535 19.5014H9.87258L10.9695 18.4044V17.0637H4.87535V19.5014ZM19.7452 13.4072C19.867 13.4072 20.1108 13.5291 20.2327 13.651L21.8172 15.2355C22.0609 15.4792 22.0609 15.9668 21.8172 16.2105L20.5983 17.4294L18.0388 14.8698L19.2576 13.651C19.3795 13.5291 19.5014 13.4072 19.7452 13.4072ZM19.7452 18.1607L12.3103 25.5956H9.75069V23.036L17.1856 15.6011L19.7452 18.1607Z" fill="#BEBEBE"/>
      </svg>
      </Link>

    </div>


    <div className='h-1/2 submenu'>

      <div className='h-1/4 contenedor-central mb-10'>
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