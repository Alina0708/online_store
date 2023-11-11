import React, { useState, useEffect } from 'react';
import image1 from "../image/img3.jpg";
import image2 from "../image/img1.jpg";
import image3 from "../image/img2.jpg";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 7000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div style={{height:300}} className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
            <img className="d-block w-100" src={image1} alt="First slide" />
          </div>
          <div style={{height:300}} className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
            <img className="d-block w-100" src={image2} alt="Second slide" />
          </div>
          <div style={{height:300}} className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
            <img className="d-block w-100" src={image3} alt="Third slide" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Slider;
