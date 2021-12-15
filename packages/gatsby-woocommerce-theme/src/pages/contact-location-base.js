import React from "react";
import BreadCrumb from "../common/BreadCrumb";
import ContactLocationBottom from "../components/contact-us/ContactLocationBottom";
import ContactLocationHeader from "../components/contact-us/ContactLocationHeader";
import Layout from "../components/layout";

const ContactLocationBase = () => {
  return (
    <Layout>
      <BreadCrumb />
      <ContactLocationHeader />
      <ContactLocationBottom />
    </Layout>
  );
};

export default ContactLocationBase;
