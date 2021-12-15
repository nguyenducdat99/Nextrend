import { graphql, useStaticQuery } from "gatsby";
import React, { memo } from "react";
import BannerTop from "../../../common/BannerTop";
import "./style.scss";

function CorporateBanner() {
  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Banner_Corporate.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='corporate-banner'>
      <BannerTop bannerURL={bannerURL} cateName='Corporate Profile' />
    </div>
  );
}

export default memo(CorporateBanner);
