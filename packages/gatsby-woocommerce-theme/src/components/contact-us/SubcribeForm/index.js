import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./style.scss";

function SubscribeForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        company: "",
        phone: "",
        state: "",
        suburb: "",
        quantity: "",
        postcode: "",
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form className='text-center subscribe-form section'>
          <div className='subscribe-form-container container'>
            <h2 className='subscribe-title text-center'>
              Get the Latest News & Updates
            </h2>
            <p className='form-notes text-center'>
              Explore our Featured Destinations, Discover our Specials and keep
              up to date with the latest Accommodation and Hospitality News.
              Subscribe to our Email Updates Today!
            </p>
            <div className='subscribe-form-main'>
              <div className='subscribe-info'>
                <div className='form-field'>
                  <Field
                    name='name'
                    placeholder='Your Name *'
                    className='form-field-input'
                  />
                  <ErrorMessage name='name'>
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className='form-field'>
                  <Field
                    name='email'
                    className='form-field-input'
                    placeholder='Email *'
                  />
                  <ErrorMessage name='email'>
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className='form-field'>
                  <button className='btn subscribe-btn'>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SubscribeForm;
