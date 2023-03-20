import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import ChatBuble from './ChatBuble'

const VerticalCarouselChat = ({ items }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    slider.slickGoTo(items.length - 1);
  }, [items]);

  const settings = {
    dots: false,
    dotsClass:'slick-dots slick-thumb',
    wheel: true,
    wheelScroll:2,
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
    <Slider {...settings} ref={sliderRef} className='w-full h-2/3 overflow-hidden'>
          {items.map((item) => (
      <ChatBuble key={item.id} str_message={item.str_message} bool_isUser={item.bool_isUser}></ChatBuble>
    ))}
    </Slider>
  );
};

export default VerticalCarouselChat;
