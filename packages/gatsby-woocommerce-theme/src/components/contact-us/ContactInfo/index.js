import React from "react";
import FooterMainContentCol from "../../footer/FooterMainContentCol";
import "./styles.scss";

function ContactInfo({ footerMainContent }) {
  return (
    <div className='contact-info container mb-5'>
      <div className='row'>
        {footerMainContent?.map((props, index) => (
          <FooterMainContentCol
            {...props}
            key={index}
            isCalendlyOneLine={true}
            showListContact = {true}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;
