import React from 'react';
import './style.scss';

function TabValue() {
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
      </div>
    </div>
  );
}

export default TabValue;
