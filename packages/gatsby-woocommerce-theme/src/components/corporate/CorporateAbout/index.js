import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { memo } from "react";
import "./style.scss";

function CorporateAbout() {
  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "CORPORATE_about_nextrend.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 770, quality: 100, maxHeight: 454) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='corporate-about section container'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 col-lg-12 about-text text-center'>
          <h2 className=''>NEXTREND</h2>
          <h2 className='title text-center'>Commercial Furniture Experts</h2>
          <p className='about-content'>
            As one of Australia’s largest importers of quality indoor and
            outdoor furniture for, hospitality, business, tourism and industry,
            Nextrend offers you more choice.
          </p>
          <p className='about-content'>
            With a large range of stock on hand, exclusive products you won’t
            find anywhere else in Australia and the capability to custom make
            designs, you’ll find the furniture solution you’re after.
          </p>
          <p className='about-content'>
            We’re far more than just an importer with decades of experience in
            hospitality and commercial fitouts and refurbishments. We work
            closely with business owners and project managers to assist with
            budget quotations, complimentary seating layouts, project planning,
            and expert guidance.
          </p>
          {/* <button className='cta-btn btn btn-primary'>CONTACT US</button> */}
        </div>
        <div className='col-sm-12 col-md-12 col-lg-12 corporate-about-img'>
          <Img
            width='770'
            height='454'
            fluid={bannerURL.placeholderImage.childImageSharp.fluid}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(CorporateAbout);
