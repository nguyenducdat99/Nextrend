import React from "react";
import BreadCrumb from "../common/BreadCrumb";
import QuoteForm from "../common/QuoteForm";
import ContactInfo from "../components/contact-us/ContactInfo";
import ContactUsBanner from "../components/contact-us/ContactUsBanner";
import FAQs from "../components/contact-us/FAQs";
import * as footerData from "../components/footer/stories/footer-data";
import Layout from "../components/layout";

const ContactUsPage = () => {
  const inputBreadCrumb = [
    {
      id: 1,
      title: "Home",
      slug: "/",
    },
    {
      id: 2,
      title: "Contact Us",
      slug: "/contact-us",
    },
  ];

  return (
    <Layout>
      <BreadCrumb inputBreadCrumb={inputBreadCrumb} bg />
      <ContactUsBanner />
      <ContactInfo
        footerMainContent={footerData.FOOTER_MAIN_CONTENT}
        calendlyOneLine={true}
      />
      <div className='container '>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 contact-form-col'>
            <QuoteForm
              subtextTop='Fill the form'
              title={`Let's discuss your project`}
              linkTo={"/contact-us/thank-you"}
            />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 faqs-col'>
            <FAQs />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUsPage;
