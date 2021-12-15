import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { memo } from "react";
import CallCenterIcon from "../../icons/CallCenterIcon";
import "./style.scss";

function CallToAction() {
  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "CONTACTUS_banner.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100, maxHeight: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='cta-info-container'>
      <Img
        width='1000'
        height='626'
        className='cta-img'
        fluid={bannerURL.placeholderImage.childImageSharp.fluid}
      />
      <div className='cta-info text-center'>
        <h2 className='title'>Start a Conversation Now</h2>
        <p className='cta-content'>
          Our Sales Staff is standing by ready to discuss your Commercial
          Furniture needs. Simply click the button below to commence a
          conversation or give us a call on
        </p>
        <div className='call-center'>
          <div className='center text-center'>
            <CallCenterIcon />
            <div className='info'>
              <div className='name'>NSW & ACT – James</div>
              <div className='phone'>
                <a href={`tel:+0419 993 860`}>0419 993 860</a>
              </div>
            </div>
          </div>
          <div className='center text-center'>
            <CallCenterIcon />
            <div className='info'>
              <div className='name'>QLD – Quentin</div>
              <a href={`tel:+0408 690 831`}>0408 690 831</a>
            </div>
          </div>
          <div className='center text-center'>
            <CallCenterIcon />
            <div className='info'>
              <div className='name'>VIC,TAS,NT,SA,WA – Leroy</div>
              <div className='phone'>
                <a href={`tel:+0448 177 445`}>0448 177 445</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CallToAction);
