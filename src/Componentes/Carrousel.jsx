import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import folder from '../assets/folder.png'
import folder_gris from '../assets/folder-gris.png'
import styled from 'styled-components'
class Carousel extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      slidesPerView: 3
    };
  }
  
  componentDidMount() {
    new Swiper('.swiper-container', {
      slidesPerView: this.state.slidesPerView,
      spaceBetween: 5,
      breakpoints:{
        250:{
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1400:{
          slidesPerView: 4,
        },
        2000:{
          slidesPerView: 5,
        }
      }
    });
  }

  render() {
    return (
      <div className="w-100 h-100">
        <div className="swiper-container h-full">
          <div className="swiper-wrapper d-flex flex-row h-full">
            
            {/* Swipe */}
            <div className="swiper-slide m-2">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  <SwiperSlideImgContainer>
                    <img src={folder} className='img-fluid'/>
                  </SwiperSlideImgContainer>
                  <div className='d-flex justify-content-start align-items-center flex-column'>
                    <h6 className=''>Private</h6>
                    <p className='text-xs gris-palabras'>120 pages</p>
                  </div>
                </div>
            </div>

            {/* Swipe */}
            <div className="swiper-slide m-2">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  <SwiperSlideImgContainer>
                    <img src={folder} className='img-fluid'/>
                  </SwiperSlideImgContainer>
                  <div className='d-flex justify-content-start align-items-center flex-column'>
                    <h6 className=''>Private</h6>
                    <p className='text-xs gris-palabras'>120 pages</p>
                  </div>
                </div>
            </div>

            {/* Swipe */}
            <div className="swiper-slide m-2">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  <SwiperSlideImgContainer>
                    <img src={folder} className='img-fluid'/>
                  </SwiperSlideImgContainer>
                  <div className='d-flex justify-content-start align-items-center flex-column'>
                    <h6 className=''>Private</h6>
                    <p className='text-xs gris-palabras'>120 pages</p>
                  </div>
                </div>
            </div>

            {/* Swipe */}
            <div className="swiper-slide m-2">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  <SwiperSlideImgContainer>
                    <img src={folder} className='img-fluid'/>
                  </SwiperSlideImgContainer>
                  <div className='d-flex justify-content-start align-items-center flex-column'>
                    <h6 className=''>Private</h6>
                    <p className='text-xs gris-palabras'>120 pages</p>
                  </div>
                </div>
            </div>

            {/* Swipe */}
            <div className="swiper-slide m-2">
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  <SwiperSlideImgContainer>
                    <img src={folder} className='img-fluid'/>
                  </SwiperSlideImgContainer>
                  <div className='d-flex justify-content-start align-items-center flex-column'>
                    <h6 className=''>Private</h6>
                    <p className='text-xs gris-palabras'>120 pages</p>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

const SwiperSlideImgContainer = styled.div`
  max-height: 60px;
  margin: 1rem;
  cursor: pointer;
`;