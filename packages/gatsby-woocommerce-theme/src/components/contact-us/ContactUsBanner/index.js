import React from "react";
import BannerTop from "../../../common/BannerTop";
import bannerImage from "../../../images/CONTACTUS_banner1.png";
import "./styles.scss";

function ContactUsBanner() {
  return (
    <div className='contact-banner'>
      <BannerTop
        cateName='Contact us'
        topSubtitle={`Let's get in touch`}
        remoteImage={bannerImage}
      />
    </div>
  );
}

export default ContactUsBanner;
