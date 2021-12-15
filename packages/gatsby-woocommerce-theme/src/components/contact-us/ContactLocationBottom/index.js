import React from 'react';
import Slider from 'react-slick';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './styles.scss';

function ContactLocationBottom() {
  const { width } = useWindowDimensions();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: width > 768 ? 4 : 2,
    slidesToScroll: width > 768 ? 4 : 2,
  };
  return (
    <div className='contact-location-our-team container'>
      <p className='sub-text text-center'>TEAM</p>
      <h3 className='title text-center'>Meet Our Brisbane’s Team</h3>
      <Slider {...settings} className='row highlight-slider'>
        {Array.from({ length: 8 }).map((item, index) => (
          <div className='member col-12' key={index}>
            <img src='https://i.pravatar.cc/123' alt='' />
            <p className='name mt-3'>ELENA STEPHAN</p>
            <p className='position'>Project Management</p>
          </div>
        ))}
      </Slider>
      <button className='btn btn-primary cta-btn'>JOIN OUR TEAM</button>
    </div>
  );
}

export default ContactLocationBottom;
