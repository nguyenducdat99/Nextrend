import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import "./styles.scss";

function FooterTop() {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "NEXTRENDLOGO1.png" }) {
        childImageSharp {
          fixed(width: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <div className='footer__top'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-12 col-sm-12 col-md-4 col-lg-4 logo-footer-container'>
            <div className='logo-footer'>
              <Link to='/'>
                <Img
                  width='170'
                  fixed={data.placeholderImage.childImageSharp.fixed}
                />
              </Link>
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-8 col-lg-8'>
            <p className='title-side-right'>
              Supplying Quality Commercial & Hospitality Furniture Australia
              Wide since 1999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
