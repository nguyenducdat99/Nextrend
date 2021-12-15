import React from "react";
import BreadCrumb from "../common/BreadCrumb";
import CorporateAbout from "../components/corporate/CorporateAbout";
import CorporateBlockCategories from "../components/corporate/CorporateBlockCategories";
import CorporateHighlight from "../components/corporate/CorporateHighlight";
import CorporateInfoTabs from "../components/corporate/CorporateInfoTabs";
import CorporateTeam from "../components/corporate/CorporateTeam";
import ClientPolicy from "../components/home/client-policy";
import Testimonials from "../components/home/testimonials";
import ContactUs from "../components/landing-page/ContactUs";
import Layout from "../components/layout";
import useWindowDimensions from "../hooks/useWindowDimensions";

const CorporatePage = () => {
  const { width } = useWindowDimensions();
  const inputBreadCrumb = [
    {
      id: 1,
      title: "Home",
      slug: "/",
    },
    {
      id: 2,
      title: "Corporate Profile",
      slug: "/corporate",
    },
  ];
  return (
    <Layout>
      <BreadCrumb inputBreadCrumb={inputBreadCrumb} />
      <div className='corporate-main-content'>
        <CorporateAbout />
        <ClientPolicy width={width} isCorporate={true} />
        <CorporateInfoTabs />
        <CorporateBlockCategories isCorporate={true} />
        <CorporateTeam />
        <CorporateHighlight isCorporate={true} width={width} />
        <Testimonials background={true} />
        {width > 768 && (
          <ContactUs
            footerText='Variety of Products, Unmatched Quality, Responsive Service'
            footerButtonText='Contact Us'
          />
        )}
      </div>
    </Layout>
  );
};

export default CorporatePage;
