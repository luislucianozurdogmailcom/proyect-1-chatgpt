import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import folder from '../assets/folder.png'
import folder_gris from '../assets/folder-gris.png'

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
      <div className="max-w-800 mx-auto my-4 h-full">
        <div className="swiper-container h-full">
          <div className="swiper-wrapper flex flex-row h-full p-3">
            
            <div className="swiper-slide">
                <img src={folder} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Private</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>120 pages</span>
            </div>

            <div className="swiper-slide">
            <img src={folder_gris} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Litigations</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>500 pages</span>
            </div>

            <div className="swiper-slide">
                <img src={folder_gris} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Cases</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>500 pages</span>
            </div>

            <div className="swiper-slide">
                <img src={folder_gris} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Cases</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>500 pages</span>
            </div>

            <div className="swiper-slide">
                <img src={folder_gris} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Cases</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>153 pages</span>
            </div>

            <div className="swiper-slide">
                <img src={folder_gris} className='folder-size'></img>
                <br></br>
                <span className='text-left mx-2'>Cases</span>
                <br></br>
                <span className='text-xs gris-palabras mx-2'>147 pages</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;