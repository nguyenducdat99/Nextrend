import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import BannerTop from '../../../common/BannerTop';
import './styles.scss';

function ProjectDetailBanner({ project }) {
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
    <div className='project-detail-banner'>
      <BannerTop
        remoteImage={project.featuredImage?.node}
        cateName={project.title}
        cateDesc={project.acfProject.subHeading}
        // showClient={true}
        bannerURL={bannerURL}
      />
    </div>
  );
}

export default ProjectDetailBanner;
