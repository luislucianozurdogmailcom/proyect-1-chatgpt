import React from 'react'
import style from '../css/styles.css'
import { Fragment } from 'react'
import avatar from '../assets/avatar.png'
import Carousel from './Carrousel'
import VerticalCarousel from './VerticalCarousel'
import folder_3 from '../assets/folder_3.png'
import SearchBar from './SearchBar'

import { useSelector, useDispatch } from 'react-redux'
import {change} from '../Reducers/chatExpand'



const Sidebar = () => {

  // Estado de si está expandido o no el botón.
  const bool_isChatExpanded = useSelector((state) => state.chatExpand.expand);

  return (
    <Fragment>
       
       <div className={` h-screen left-0 top-0 flex flex-col border-r border-gray-300 overflow-hidden ${bool_isChatExpanded ? 'w-0p' : 'w-33p '} `}>
         {/* elemento barra buscadora */}
         <SearchBar />

         {/* Elemento documentos */}
         <div className='flex contenedor-central h-1/3 mb-5 overflow-hidden'>
           <div className='w-90p h-full rounded-xl border border'>
              
              {/*barrita de archivos */}
              <div className='h-1/4 w-full flex flex-row justify-between items-center px-4'>
              
              <div className='flex'>

                <svg className='mr-1' width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.3918 12.1562H15.3438C14.7029 12.1562 14.0882 11.9017 13.635 11.4485C13.1819 10.9953 12.9273 10.3806 12.9273 9.73976V2.69167C12.9273 2.63826 12.9061 2.58704 12.8683 2.54928C12.8305 2.51151 12.7793 2.4903 12.7259 2.4903H8.0943C7.23977 2.4903 6.42025 2.82975 5.81601 3.43399C5.21177 4.03823 4.87231 4.85776 4.87231 5.71228V21.8222C4.87231 22.6767 5.21177 23.4962 5.81601 24.1005C6.42025 24.7047 7.23977 25.0442 8.0943 25.0442H19.3712C20.2258 25.0442 21.0453 24.7047 21.6495 24.1005C22.2538 23.4962 22.5932 22.6767 22.5932 21.8222V12.3576C22.5932 12.3042 22.572 12.253 22.5342 12.2152C22.4965 12.1775 22.4453 12.1562 22.3918 12.1562ZM17.7602 20.2112H9.70529C9.49166 20.2112 9.28678 20.1263 9.13572 19.9753C8.98466 19.8242 8.89979 19.6193 8.89979 19.4057C8.89979 19.1921 8.98466 18.9872 9.13572 18.8361C9.28678 18.6851 9.49166 18.6002 9.70529 18.6002H17.7602C17.9739 18.6002 18.1788 18.6851 18.3298 18.8361C18.4809 18.9872 18.5657 19.1921 18.5657 19.4057C18.5657 19.6193 18.4809 19.8242 18.3298 19.9753C18.1788 20.1263 17.9739 20.2112 17.7602 20.2112ZM17.7602 16.1837H9.70529C9.49166 16.1837 9.28678 16.0989 9.13572 15.9478C8.98466 15.7967 8.89979 15.5919 8.89979 15.3782C8.89979 15.1646 8.98466 14.9597 9.13572 14.8087C9.28678 14.6576 9.49166 14.5727 9.70529 14.5727H17.7602C17.9739 14.5727 18.1788 14.6576 18.3298 14.8087C18.4809 14.9597 18.5657 15.1646 18.5657 15.3782C18.5657 15.5919 18.4809 15.7967 18.3298 15.9478C18.1788 16.0989 17.9739 16.1837 17.7602 16.1837Z" fill="#2A85FF"/>
                  <path d="M21.9499 10.3736L14.71 3.13368C14.6959 3.11968 14.678 3.11016 14.6585 3.10631C14.6391 3.10246 14.6189 3.10446 14.6005 3.11204C14.5822 3.11963 14.5665 3.13247 14.5554 3.14895C14.5444 3.16543 14.5384 3.18481 14.5383 3.20466V9.73975C14.5383 9.95338 14.6232 10.1583 14.7743 10.3093C14.9253 10.4604 15.1302 10.5452 15.3438 10.5452H21.8789C21.8988 10.5452 21.9182 10.5392 21.9346 10.5281C21.9511 10.5171 21.964 10.5014 21.9715 10.483C21.9791 10.4647 21.9811 10.4445 21.9773 10.425C21.9734 10.4056 21.9639 10.3877 21.9499 10.3736Z" fill="#2A85FF"/>
                </svg>

                <p className='text-center negro-palabras'>Documents</p>
              
              </div>
              
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.09053" y="0.573283" width="25.1178" height="24.4741" rx="12.2371" fill="white"/>
                <path d="M20.7457 11.2734C20.7296 11.2009 20.6981 11.1327 20.6534 11.0735C20.6087 11.0142 20.5517 10.9653 20.4865 10.9299L18.9441 10.0745C18.8614 9.90681 18.7683 9.74448 18.6654 9.58842L18.6978 7.82571C18.6984 7.75177 18.6838 7.67851 18.6548 7.61049C18.6258 7.54247 18.5831 7.48116 18.5293 7.43039C17.7613 6.7341 16.8531 6.21038 15.8658 5.89449C15.7949 5.87238 15.7201 5.86557 15.6464 5.87451C15.5726 5.88345 15.5017 5.90793 15.4381 5.94634L13.9281 6.85362C13.7402 6.84714 13.5587 6.84714 13.3708 6.85362L11.8608 5.94634C11.7972 5.90793 11.7262 5.88345 11.6525 5.87451C11.5788 5.86557 11.504 5.87238 11.4331 5.89449C10.4445 6.21062 9.53585 6.73677 8.76957 7.43687C8.71535 7.4859 8.67226 7.54597 8.6432 7.61304C8.61414 7.68011 8.59977 7.75262 8.60107 7.82571L8.63348 9.58842C8.52979 9.74396 8.43906 9.90597 8.34833 10.0745L6.80595 10.9299C6.74161 10.9656 6.68573 11.0148 6.64212 11.0741C6.5985 11.1333 6.56818 11.2013 6.55321 11.2734C6.33285 12.2854 6.33285 13.3331 6.55321 14.3452C6.56931 14.4176 6.60078 14.4858 6.6455 14.5451C6.69023 14.6043 6.74715 14.6533 6.81243 14.6886L8.35481 15.5441C8.43749 15.7117 8.53056 15.8741 8.63348 16.0301L8.60107 17.7928C8.60048 17.8668 8.61514 17.94 8.64413 18.0081C8.67312 18.0761 8.71582 18.1374 8.76957 18.1882C9.53754 18.8844 10.4458 19.4082 11.4331 19.724C11.504 19.7462 11.5788 19.753 11.6525 19.744C11.7262 19.7351 11.7972 19.7106 11.8608 19.6722L13.3708 18.7649H13.9281L15.4446 19.6722C15.5234 19.724 15.6159 19.7511 15.7103 19.75C15.763 19.7477 15.8152 19.739 15.8658 19.724C16.8544 19.4079 17.763 18.8818 18.5293 18.1817C18.5835 18.1326 18.6266 18.0726 18.6557 18.0055C18.6848 17.9384 18.6991 17.8659 18.6978 17.7928L18.6654 16.0301C18.7691 15.8746 18.8598 15.7126 18.9506 15.5441L20.4929 14.6886C20.5573 14.6529 20.6132 14.6037 20.6568 14.5445C20.7004 14.4852 20.7307 14.4172 20.7457 14.3452C20.966 13.3331 20.966 12.2854 20.7457 11.2734ZM19.7736 13.898L18.3025 14.7146C18.2092 14.7688 18.1346 14.8502 18.0886 14.9479C17.982 15.1687 17.8585 15.3811 17.7192 15.583C17.6601 15.6735 17.6286 15.7794 17.6285 15.8875L17.6544 17.566C17.0965 18.0411 16.4577 18.4121 15.7686 18.6612L14.3234 17.7928C14.2428 17.7459 14.1511 17.7213 14.0577 17.7216H14.0188C13.773 17.741 13.5259 17.741 13.2801 17.7216C13.1738 17.7157 13.0681 17.7405 12.9755 17.7928L11.5303 18.6612C10.842 18.4133 10.2034 18.0446 9.64445 17.5725L9.67037 15.8875C9.67033 15.7794 9.6388 15.6735 9.57964 15.583C9.44274 15.3796 9.31934 15.1674 9.21025 14.9479C9.1624 14.8515 9.08826 14.7706 8.99639 14.7146L7.5253 13.898C7.39564 13.178 7.39564 12.4406 7.5253 11.7205L8.99639 10.904C9.08972 10.8497 9.16431 10.7684 9.21025 10.6707C9.31687 10.4498 9.44036 10.2375 9.57964 10.0356C9.6388 9.94501 9.67033 9.83918 9.67037 9.731L9.64445 8.05253C10.2024 7.57745 10.8412 7.20649 11.5303 6.95731L12.9755 7.82571C13.0678 7.87876 13.1737 7.90354 13.2801 7.89699C13.5259 7.87755 13.773 7.87755 14.0188 7.89699C14.1251 7.9028 14.2308 7.87806 14.3234 7.82571L15.7686 6.95731C16.4569 7.20528 17.0955 7.57396 17.6544 8.04605L17.6285 9.731C17.6286 9.83918 17.6601 9.94501 17.7192 10.0356C17.8562 10.239 17.9795 10.4511 18.0886 10.6707C18.1365 10.7671 18.2106 10.8479 18.3025 10.904L19.7736 11.7205C19.9032 12.4406 19.9032 13.178 19.7736 13.898ZM13.6494 9.18015C12.9317 9.18015 12.23 9.39299 11.6332 9.79176C11.0364 10.1905 10.5712 10.7573 10.2966 11.4205C10.0219 12.0836 9.95002 12.8133 10.0901 13.5173C10.2301 14.2213 10.5757 14.8679 11.0833 15.3755C11.5908 15.883 12.2375 16.2286 12.9414 16.3687C13.6454 16.5087 14.3751 16.4368 15.0382 16.1621C15.7014 15.8875 16.2682 15.4223 16.667 14.8255C17.0657 14.2287 17.2786 13.527 17.2786 12.8093C17.2786 11.8468 16.8962 10.9237 16.2156 10.2431C15.535 9.5625 14.6119 9.18015 13.6494 9.18015ZM13.6494 15.4015C13.1367 15.4015 12.6356 15.2495 12.2093 14.9646C11.783 14.6798 11.4507 14.2749 11.2545 13.8013C11.0583 13.3276 11.007 12.8064 11.107 12.3036C11.207 11.8007 11.4539 11.3388 11.8165 10.9763C12.179 10.6138 12.6409 10.3669 13.1437 10.2668C13.6466 10.1668 14.1678 10.2182 14.6414 10.4144C15.1151 10.6106 15.52 10.9428 15.8048 11.3691C16.0896 11.7954 16.2417 12.2966 16.2417 12.8093C16.2417 13.4968 15.9686 14.1561 15.4824 14.6423C14.9963 15.1284 14.3369 15.4015 13.6494 15.4015Z" fill="#2A85FF"/>
                <rect x="1.09053" y="0.573283" width="25.1178" height="24.4741" rx="12.2371" stroke="#BEBEBE" strokeWidth="0.594828"/>
              </svg>

              </div>

              {/* Parte de archivos carrousel */}
              <div className='h-3/4 w-full gris-buscador rounded-b-xl  overflow-hidden'>
                <Carousel slidesPerView={4}/>
              </div>
           </div>
         </div>

         {/* Elemento messagebox */}
         <div className='flex flex-col items-center h-1/2 overflow-hidden'>
          <div className='w-90p h-5/6 rounded-xl overflow-hidden border'>

             {/*barrita de archivos */}
             <div className='h-1/4 w-full flex flex-row justify-between items-center px-4'>
              
              <div className='flex'>

                <svg className='mr-1' width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.3918 12.1562H15.3438C14.7029 12.1562 14.0882 11.9017 13.635 11.4485C13.1819 10.9953 12.9273 10.3806 12.9273 9.73976V2.69167C12.9273 2.63826 12.9061 2.58704 12.8683 2.54928C12.8305 2.51151 12.7793 2.4903 12.7259 2.4903H8.0943C7.23977 2.4903 6.42025 2.82975 5.81601 3.43399C5.21177 4.03823 4.87231 4.85776 4.87231 5.71228V21.8222C4.87231 22.6767 5.21177 23.4962 5.81601 24.1005C6.42025 24.7047 7.23977 25.0442 8.0943 25.0442H19.3712C20.2258 25.0442 21.0453 24.7047 21.6495 24.1005C22.2538 23.4962 22.5932 22.6767 22.5932 21.8222V12.3576C22.5932 12.3042 22.572 12.253 22.5342 12.2152C22.4965 12.1775 22.4453 12.1562 22.3918 12.1562ZM17.7602 20.2112H9.70529C9.49166 20.2112 9.28678 20.1263 9.13572 19.9753C8.98466 19.8242 8.89979 19.6193 8.89979 19.4057C8.89979 19.1921 8.98466 18.9872 9.13572 18.8361C9.28678 18.6851 9.49166 18.6002 9.70529 18.6002H17.7602C17.9739 18.6002 18.1788 18.6851 18.3298 18.8361C18.4809 18.9872 18.5657 19.1921 18.5657 19.4057C18.5657 19.6193 18.4809 19.8242 18.3298 19.9753C18.1788 20.1263 17.9739 20.2112 17.7602 20.2112ZM17.7602 16.1837H9.70529C9.49166 16.1837 9.28678 16.0989 9.13572 15.9478C8.98466 15.7967 8.89979 15.5919 8.89979 15.3782C8.89979 15.1646 8.98466 14.9597 9.13572 14.8087C9.28678 14.6576 9.49166 14.5727 9.70529 14.5727H17.7602C17.9739 14.5727 18.1788 14.6576 18.3298 14.8087C18.4809 14.9597 18.5657 15.1646 18.5657 15.3782C18.5657 15.5919 18.4809 15.7967 18.3298 15.9478C18.1788 16.0989 17.9739 16.1837 17.7602 16.1837Z" fill="#2A85FF"/>
                  <path d="M21.9499 10.3736L14.71 3.13368C14.6959 3.11968 14.678 3.11016 14.6585 3.10631C14.6391 3.10246 14.6189 3.10446 14.6005 3.11204C14.5822 3.11963 14.5665 3.13247 14.5554 3.14895C14.5444 3.16543 14.5384 3.18481 14.5383 3.20466V9.73975C14.5383 9.95338 14.6232 10.1583 14.7743 10.3093C14.9253 10.4604 15.1302 10.5452 15.3438 10.5452H21.8789C21.8988 10.5452 21.9182 10.5392 21.9346 10.5281C21.9511 10.5171 21.964 10.5014 21.9715 10.483C21.9791 10.4647 21.9811 10.4445 21.9773 10.425C21.9734 10.4056 21.9639 10.3877 21.9499 10.3736Z" fill="#2A85FF"/>
                </svg>

                <p className='text-center negro-palabras'>Instances</p>
              
              </div>
              
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.09053" y="0.573283" width="25.1178" height="24.4741" rx="12.2371" fill="white"/>
                <path d="M20.7457 11.2734C20.7296 11.2009 20.6981 11.1327 20.6534 11.0735C20.6087 11.0142 20.5517 10.9653 20.4865 10.9299L18.9441 10.0745C18.8614 9.90681 18.7683 9.74448 18.6654 9.58842L18.6978 7.82571C18.6984 7.75177 18.6838 7.67851 18.6548 7.61049C18.6258 7.54247 18.5831 7.48116 18.5293 7.43039C17.7613 6.7341 16.8531 6.21038 15.8658 5.89449C15.7949 5.87238 15.7201 5.86557 15.6464 5.87451C15.5726 5.88345 15.5017 5.90793 15.4381 5.94634L13.9281 6.85362C13.7402 6.84714 13.5587 6.84714 13.3708 6.85362L11.8608 5.94634C11.7972 5.90793 11.7262 5.88345 11.6525 5.87451C11.5788 5.86557 11.504 5.87238 11.4331 5.89449C10.4445 6.21062 9.53585 6.73677 8.76957 7.43687C8.71535 7.4859 8.67226 7.54597 8.6432 7.61304C8.61414 7.68011 8.59977 7.75262 8.60107 7.82571L8.63348 9.58842C8.52979 9.74396 8.43906 9.90597 8.34833 10.0745L6.80595 10.9299C6.74161 10.9656 6.68573 11.0148 6.64212 11.0741C6.5985 11.1333 6.56818 11.2013 6.55321 11.2734C6.33285 12.2854 6.33285 13.3331 6.55321 14.3452C6.56931 14.4176 6.60078 14.4858 6.6455 14.5451C6.69023 14.6043 6.74715 14.6533 6.81243 14.6886L8.35481 15.5441C8.43749 15.7117 8.53056 15.8741 8.63348 16.0301L8.60107 17.7928C8.60048 17.8668 8.61514 17.94 8.64413 18.0081C8.67312 18.0761 8.71582 18.1374 8.76957 18.1882C9.53754 18.8844 10.4458 19.4082 11.4331 19.724C11.504 19.7462 11.5788 19.753 11.6525 19.744C11.7262 19.7351 11.7972 19.7106 11.8608 19.6722L13.3708 18.7649H13.9281L15.4446 19.6722C15.5234 19.724 15.6159 19.7511 15.7103 19.75C15.763 19.7477 15.8152 19.739 15.8658 19.724C16.8544 19.4079 17.763 18.8818 18.5293 18.1817C18.5835 18.1326 18.6266 18.0726 18.6557 18.0055C18.6848 17.9384 18.6991 17.8659 18.6978 17.7928L18.6654 16.0301C18.7691 15.8746 18.8598 15.7126 18.9506 15.5441L20.4929 14.6886C20.5573 14.6529 20.6132 14.6037 20.6568 14.5445C20.7004 14.4852 20.7307 14.4172 20.7457 14.3452C20.966 13.3331 20.966 12.2854 20.7457 11.2734ZM19.7736 13.898L18.3025 14.7146C18.2092 14.7688 18.1346 14.8502 18.0886 14.9479C17.982 15.1687 17.8585 15.3811 17.7192 15.583C17.6601 15.6735 17.6286 15.7794 17.6285 15.8875L17.6544 17.566C17.0965 18.0411 16.4577 18.4121 15.7686 18.6612L14.3234 17.7928C14.2428 17.7459 14.1511 17.7213 14.0577 17.7216H14.0188C13.773 17.741 13.5259 17.741 13.2801 17.7216C13.1738 17.7157 13.0681 17.7405 12.9755 17.7928L11.5303 18.6612C10.842 18.4133 10.2034 18.0446 9.64445 17.5725L9.67037 15.8875C9.67033 15.7794 9.6388 15.6735 9.57964 15.583C9.44274 15.3796 9.31934 15.1674 9.21025 14.9479C9.1624 14.8515 9.08826 14.7706 8.99639 14.7146L7.5253 13.898C7.39564 13.178 7.39564 12.4406 7.5253 11.7205L8.99639 10.904C9.08972 10.8497 9.16431 10.7684 9.21025 10.6707C9.31687 10.4498 9.44036 10.2375 9.57964 10.0356C9.6388 9.94501 9.67033 9.83918 9.67037 9.731L9.64445 8.05253C10.2024 7.57745 10.8412 7.20649 11.5303 6.95731L12.9755 7.82571C13.0678 7.87876 13.1737 7.90354 13.2801 7.89699C13.5259 7.87755 13.773 7.87755 14.0188 7.89699C14.1251 7.9028 14.2308 7.87806 14.3234 7.82571L15.7686 6.95731C16.4569 7.20528 17.0955 7.57396 17.6544 8.04605L17.6285 9.731C17.6286 9.83918 17.6601 9.94501 17.7192 10.0356C17.8562 10.239 17.9795 10.4511 18.0886 10.6707C18.1365 10.7671 18.2106 10.8479 18.3025 10.904L19.7736 11.7205C19.9032 12.4406 19.9032 13.178 19.7736 13.898ZM13.6494 9.18015C12.9317 9.18015 12.23 9.39299 11.6332 9.79176C11.0364 10.1905 10.5712 10.7573 10.2966 11.4205C10.0219 12.0836 9.95002 12.8133 10.0901 13.5173C10.2301 14.2213 10.5757 14.8679 11.0833 15.3755C11.5908 15.883 12.2375 16.2286 12.9414 16.3687C13.6454 16.5087 14.3751 16.4368 15.0382 16.1621C15.7014 15.8875 16.2682 15.4223 16.667 14.8255C17.0657 14.2287 17.2786 13.527 17.2786 12.8093C17.2786 11.8468 16.8962 10.9237 16.2156 10.2431C15.535 9.5625 14.6119 9.18015 13.6494 9.18015ZM13.6494 15.4015C13.1367 15.4015 12.6356 15.2495 12.2093 14.9646C11.783 14.6798 11.4507 14.2749 11.2545 13.8013C11.0583 13.3276 11.007 12.8064 11.107 12.3036C11.207 11.8007 11.4539 11.3388 11.8165 10.9763C12.179 10.6138 12.6409 10.3669 13.1437 10.2668C13.6466 10.1668 14.1678 10.2182 14.6414 10.4144C15.1151 10.6106 15.52 10.9428 15.8048 11.3691C16.0896 11.7954 16.2417 12.2966 16.2417 12.8093C16.2417 13.4968 15.9686 14.1561 15.4824 14.6423C14.9963 15.1284 14.3369 15.4015 13.6494 15.4015Z" fill="#2A85FF"/>
                <rect x="1.09053" y="0.573283" width="25.1178" height="24.4741" rx="12.2371" stroke="#BEBEBE" strokeWidth="0.594828"/>
              </svg>

              </div>

            <VerticalCarousel items={[{'private' : 'private', 'docs' : 'docs', 'color' : 'gris-buscador'},
                                      {'private' : 'private_2', 'docs' : 'docs_2', 'color' : 'bg-white'},
                                      {'private' : 'private_3', 'docs' : 'docs_3', 'color' : 'bg-white'},
                                      {'private' : 'private_4', 'docs' : 'docs_4', 'color' : 'bg-white'}]}>
            </VerticalCarousel>
          </div>
         </div>

       </div>
      
    </Fragment>
    
  )
}

export default Sidebar