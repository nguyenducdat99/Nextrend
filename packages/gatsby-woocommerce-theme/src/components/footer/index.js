import React from 'react';
import './styles.scss';
import FooterTop from './FooterTop';
import FooterContact from './FooterContact';
import FooterSubMenu from './FooterSubMenu';
import * as footerData from './stories/footer-data';

function Footer({ width }) {
  return (
    <div className='footer'>
      <FooterTop />
      <div className='footer__bottom'>
        <div className='container'>
          <FooterContact
            width={width}
            footerMainContent={footerData.FOOTER_MAIN_CONTENT}
          />

          <FooterSubMenu
            width={width}
            subCateList={footerData.SUB_CATE_LIST}
            socialIcons={footerData.SOCIAL_ICONS}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
