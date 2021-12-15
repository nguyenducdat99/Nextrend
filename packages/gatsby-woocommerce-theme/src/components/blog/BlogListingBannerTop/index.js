import { graphql, useStaticQuery } from "gatsby";
import React, { memo } from "react";
import BannerTop from "../../../common/BannerTop";
import "./style.scss";

function BlogListingBanner() {
  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "banner-project.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='blog-banner'>
      <BannerTop
        bannerURL={bannerURL}
        cateName='Blog'
        cateDesc={`Australia’s leading supplier of commercial & hospitality furniture`}
      />
    </div>
  );
}

export default memo(BlogListingBanner);
