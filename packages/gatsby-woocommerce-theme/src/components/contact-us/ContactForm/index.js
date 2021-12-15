import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MyTextArea from '../../../common/MyTextArea';
import MyTextInput from '../../../common/MyTextInput';
import './styles.scss';

function ContactForm({ title, subtextTop = '', subtextBottom = '' }) {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        company: '',
        phone: '',
        state: '',
        message: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name Required'),
        company: Yup.string().required('Company Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Valid Email Required'),
        phone: Yup.number().required('Phone Required'),
        state: Yup.string().required('State Required'),
      })}
      onSubmit={(values, actions) => {
        const handleServerResponse = (ok, msg) => {
          console.log('success');
        };

        const submitData = {
          'customer-info': values,
          'cart-item': [],
        };

        axios({
          method: 'POST',
          url: 'https://new.nextrend.com.au/wp-json/custom-quote/v1/posts',
          data: submitData,
        })
          .then((response) => {
            actions.setSubmitting(false);
            actions.resetForm();
            handleServerResponse(true, 'Thanks!');
          })
          .catch((error) => {
            actions.setSubmitting(false);
            handleServerResponse(false, error.response.data.error);
          });
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form className='contact-form container'>
          <p className='sub-text'>{subtextTop}</p>
          <h2 className='title'>{title}</h2>
          <p className='sub-text-bottom'>{subtextBottom}</p>
          <MyTextInput name='name' placeholder='Your Name *' />
          <MyTextInput name='company' placeholder='Company *' />
          <MyTextInput name='email' placeholder='Email *' />
          <div className='row d-flex'>
            <div className='col-md-6 col-sm-12'>
              <MyTextInput name='phone' placeholder='Phone *' />
            </div>
            <div className='col-md-6 col-sm-12'>
              <MyTextInput name='state' placeholder='State *' />
            </div>
          </div>
          {/* <MyTextInput name='phone' placeholder='Phone *' />
          <MyTextInput name='state' placeholder='State *' /> */}
          <MyTextArea
            name='message'
            placeholder='Message
                  (For freight quote please include your address)'
          />

          <div className='text-center btn-submit d-flex'>
            <button className='submit-contact btn mt-3' type='submit'>
              Submit Message
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;
