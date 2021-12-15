import React from "react";
import "./style.scss";

/* eslint-disable */

function CorporateTeam() {
  return (
    <div className='corporate-team section'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 team-info'>
            <p className='sub-title'>TEAM</p>
            <h3 className='title'>Experience and Communicability</h3>
            <p className='info-details'>
              Orci at viverra duis mauris purus, ornare. Cras odio ultricies sit
              lacus, volutpat blandit diam. Sem ultricies malesuada semper nulla
              quam quam. Quis pharetra quis phasellus sapien. Bibendum commodo
              porta est, pulvinar dignissim imperdiet lorem.
            </p>
            <button className='btn btn-primary'>JOIN OUR TEAM</button>
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 team-member-image-board'>
            <div className='avatar1 avatar'>
              <img src='https://i.pravatar.cc/123' alt='' />
            </div>
            <div className='avatar2 avatar'>
              <img src='https://i.pravatar.cc/70' alt='' />
            </div>
            <div className='avatar3 avatar'>
              <img src='https://i.pravatar.cc/71' alt='' />
            </div>
            <div className='avatar4 avatar'>
              <img src='https://i.pravatar.cc/124' alt='' />
            </div>
            <div className='avatar5 avatar'>
              <img src='https://i.pravatar.cc/180' alt='' />
            </div>
            <div className='avatar6 avatar'>
              <img src='https://i.pravatar.cc/72' alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default memo(CorporateTeam);
export default CorporateTeam;
