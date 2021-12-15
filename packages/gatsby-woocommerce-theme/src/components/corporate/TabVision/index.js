import React from 'react';
import './style.scss';

function TabVision() {
  return (
    <div className='tab-panel who-we-are'>
      <div className='about-text'>
        <div className='list-content part'>
          <li className='highlight part'>
            <span>Friendly, speedy service</span>
          </li>
          <li className='highlight part'>
            <span>24-hour quotes</span>
          </li>
          <li className='highlight part'>
            <span>2-hour response time during business hours</span>
          </li>
          <li className='highlight part'>
            <span>
              Large volumes of stock for short lead times and same day dispatch
            </span>
          </li>
          <li className='highlight part'>
            <span>
              Free delivery in metropolitan Sydney, Melbourne and Brisbane
            </span>
          </li>
        </div>
        <p className='tab-panel-paragraph highlight  '>
          When you partner with us,
          <strong>
            you’ll experience friendly, fast service from our team of experts.
          </strong>
          Throughout the whole process you’ll find it easy and stress-free to
          request quotes, place orders, and organise assembly.
        </p>
      </div>
    </div>
  );
}

export default TabVision;
