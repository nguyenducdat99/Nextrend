import React from "react";
import "./style.scss";

function TabMission() {
  return (
    <div className='tab-panel who-we-are'>
      <div className='about-text'>
        <div className='list-content'>
          <p className='tab-panel-content part'>
            We have decades of experience helping business and industry,
            supplying commercial furniture to:
          </p>
          <div className='part'>
            <li className='highlight'>
              <span>Tourism & Hospitality</span>
            </li>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>Cafés, Restaurant & Bars</span>
            </li>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>
                Industry, including accommodation, aged care and mining
              </span>
            </li>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>Commercial Offices</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabMission;
