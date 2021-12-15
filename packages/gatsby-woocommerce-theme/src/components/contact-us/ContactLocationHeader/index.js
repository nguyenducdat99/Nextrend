import React from "react";
import contactMapImg from "../../../images/CONTACT_brisbane.png";
import FooterMainContentCol from "../../footer/FooterMainContentCol";
import * as footerData from "../../footer/stories/footer-data";
import ContactForm from "../ContactForm";
import "./styles.scss";

function ContactLocationHeader() {
  return (
    <div className='contact-location-base-header section section1'>
      <div className='contact-form-col'>
        <ContactForm
          title='Drop Us A Line'
          subtextBottom={`Ask away! Our supporters will response within 24 hours`}
        />
      </div>
      <div className='map-col'>
        <img src={contactMapImg} alt='map' />
        <FooterMainContentCol {...footerData.FOOTER_MAIN_CONTENT[0]} />
      </div>
    </div>
  );
}

export default ContactLocationHeader;
