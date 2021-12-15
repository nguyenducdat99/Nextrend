import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import DownloadCataloguePopupForm from "../../common/DownloadCataloguePopupForm";
import About from "../../components/landing-page/About";
import ContactUs from "../../components/landing-page/ContactUs";
import HeroBanner from "../../components/landing-page/HeroBanner";
import NewArrivals from "../../components/landing-page/NewArrivals";
import OurProjects from "../../components/landing-page/OurProjects";
import OurRanges from "../../components/landing-page/OurRanges";
import Testimonial from "../../components/landing-page/Testimonials";
import TheBenefits from "../../components/landing-page/TheBenefits";
import Layout from "../../components/layout";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function LandingPage(props) {
  const { width } = useWindowDimensions();
  const tempData = props.pageContext.page;
  const landingOurRanges = props.pageContext.landingOurRanges;
  const [projectList, setProjectList] = useState([]);
  const [showDownloadCatalogue, setShowDownloadCatalogue] = useState(false);
  const products = props.pageContext.groupedProductsCustom;

  useEffect(() => {
    setProjectList(
      getRelatedProject(
        props.pageContext.page.landingPages.industry,
        props.data.projectList.nodes
      )
    );
  }, [
    props.pageContext.page.landingPages.industry,
    props.data.projectList.nodes,
  ]);

  const handleOpenModal = () => {
    setShowDownloadCatalogue(true);
  };

  const handleCloseModal = () => {
    setShowDownloadCatalogue(false);
  };

  const getRelatedProject = (industry, projectList) =>
    projectList
      .filter((pj) => pj.acfProject.industry.includes(industry))
      .slice(0, 8);

  return (
    <Layout width={width}>
      <HeroBanner
        width={width}
        bannerImage={tempData.landingPages.bannerImage}
        bannerTitle={tempData.landingPages.bannerTitle}
        bannerText={tempData.landingPages.bannerText}
      />
      <About
        content={tempData.content}
        title={tempData.title}
        video={tempData.landingPages.video}
        image={tempData.featuredImage && tempData.featuredImage.node}
      />
      <OurRanges landingOurRanges={landingOurRanges} width={width} />
      <NewArrivals products={products} width={width} />
      <TheBenefits />
      <Testimonial
        testimonialImages={tempData.landingPages.testimonialImages}
      />
      <OurProjects projectList={projectList} />
      <ContactUs
        handleOpenModal={handleOpenModal}
        footerImage={tempData.landingPages.footerImage}
        footerText={tempData.landingPages.footerText}
        footerUrl={tempData.landingPages.footerUrl}
        footerButtonText={tempData.landingPages.footerButtonText}
      />
      <DownloadCataloguePopupForm
        title='Great to See you’re interested!'
        subTitle='Fill in your info below to download our catalogue'
        isOpen={showDownloadCatalogue}
        handleCloseModal={handleCloseModal}
        popUpImage={tempData.landingPages.popUpImage}
      />
    </Layout>
  );
}

export default LandingPage;

export const ourProjects = graphql`
  query PROJECTS {
    projectList: allWpProject {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        acfProject {
          industry
        }
      }
    }
  }
`;
