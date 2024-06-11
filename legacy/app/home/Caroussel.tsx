import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Caroussel.css'
function CarouselComponent() {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item>
      <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/XHTrLYShBRQ "
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="First video"
          ></iframe>
        </div>
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src='https://slidechef.net/wp-content/uploads/2023/09/Iphone-15-Presentation-Template.jpg'
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src= 'https://mspoweruser.com/wp-content/uploads/2020/06/9CA72E16-7D11-4966-AD64-1946F889BA6F.jpeg'
          alt="Third slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
