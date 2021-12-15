import React from 'react';
import BreadCrumb from '../../common/BreadCrumb';
import ContactLocationBottom from '../../components/contact-us/ContactLocationBottom';
import ContactLocationHeader from '../../components/contact-us/ContactLocationHeader';
import Layout from '../../components/layout';

const ContactLocationBaseTemplate = () => {
  return (
    <Layout>
      <BreadCrumb />
      <ContactLocationHeader />
      <ContactLocationBottom />
    </Layout>
  );
};

export default ContactLocationBaseTemplate;

// import React from 'react';

// function contactLocationBaseTemplate() {
//   return (
//     <div>
//       <h1>Brisbane Page</h1>
//     </div>
//   );
// }

// export default contactLocationBaseTemplate;
