import React from 'react';
import FooterMainContentCol from '../FooterMainContentCol';

function FooterContact({ width, footerMainContent }) {
  return (
    <div className='main-content'>
      <div className='row'>
        {footerMainContent?.map((props, index) => (
          <FooterMainContentCol width={width} key={index} {...props} />
        ))}
      </div>
    </div>
  );
}

export default FooterContact;
