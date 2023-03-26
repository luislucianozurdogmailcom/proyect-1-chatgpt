import React from "react";
import Slider from "react-slick";
import folder_3 from '../assets/folder_3.png'

const VerticalCarousel = ({ items }) => {
  const settings = {
    dots: false,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} className='overflow-hidden h-100 w-100'>
    {items.map((item,i) => (
      <div className='w-100 align-items-center text-center' key={i + '-item'}>
        <div className={`text-center h-full flex flex-row justify-between p-1 ${item.color}`} >
        {/* Componente con fotito de folder */}
          <div className='w-5/6 flex flex-row items-center overflow-hidden'>
            <img src={folder_3} className='m-2 h-14 w-14 img-fluid'></img>
            <span className='font-bold mr-1 text-md m-1'>{item.private}</span>
            <p className='text-md m-1'>{item.docs}</p>
          </div>
          {/* Componente con lapicito */}
          <div className='d-flex align-items-center justify-content-center img-fluid'>
            <svg className="m-1" width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.917 4.90844L9.54906 1.93344L10.6585 0.941777C10.9623 0.670249 11.3355 0.534485 11.7782 0.534485C12.2209 0.534485 12.5939 0.670249 12.8972 0.941777L14.0066 1.93344C14.3104 2.20497 14.4689 2.53269 14.4821 2.91661C14.4953 3.30053 14.35 3.62801 14.0462 3.89907L12.917 4.90844ZM11.7679 5.95323L3.36792 13.4616H0V10.4512L8.4 2.94282L11.7679 5.95323Z" fill="#2A85FF"/>
            </svg>
          </div>
        </div>
     </div> 
    ))}
    
    
    </Slider>
  );
};

export default VerticalCarousel;
