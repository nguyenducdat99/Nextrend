import axios from 'axios';
import { Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { GlobalDispatchContext } from '../../components/contexts/AppContext';
import ButtonViewMore from '../ButtonViewMore';
import MyTextArea from '../MyTextArea';
import MyTextInput from '../MyTextInput';
import '../RequestAQuoteFormPopUp/styles.scss';
import './styles.scss';

function QuoteForm({ cartItems, subtextTop, title, subtextBottom, linkTo }) {
  const dispatch = useContext(GlobalDispatchContext);
  const url = `${process.env.WORDPRESS_SITE_URL}/wp-json/custom-quote/v1/posts`;

  return (
    <Formik
      initialValues={{
        your_name: '',
        company: '',
        email: '',
        phone: '',
        state: '',
        message: '',
      }}
      validationSchema={Yup.object({
        your_name: Yup.string().required('Name Required'),
        company: Yup.string().required('Company Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Valid Email Required'),
        phone: Yup.number().required('Phone Required'),
        state: Yup.string().required('State Required'),
      })}
      onSubmit={(values, actions) => {
        const handleServerResponse = (ok, msg) => {
          if (ok) {
            navigate(linkTo);
            dispatch({ type: 'CLEAR_CART' });
          } else {
            dispatch({ type: 'CLEAR_CART' });
          }
        };
        const submitData = {
          'customer-info': values,
          'cart-item': cartItems,
        };
        axios
          .post(url, submitData, {
            auth: {
              username: process.env.USER_NAME,
              password: process.env.PASSWORD,
            },
          })
          .then((response) => {
            actions.resetForm();
            handleServerResponse(true, 'Thanks!');
          })
          .catch((error) => {
            handleServerResponse(false, error.response.data.error);
          });
        actions.setSubmitting(false);
      }}
    >
      {() => (
        <Form className={`popup-quote-form section`} action='submit'>
          {subtextTop && (
            <>
              <p className='sub-text'>{subtextTop}</p>
              <h2 className='title'>{title}</h2>
              <p className='sub-text-bottom'>{subtextBottom}</p>
            </>
          )}

          <MyTextInput name='your_name' placeholder='Your Name *' />
          <MyTextInput name='company' placeholder='Company *' />
          <MyTextInput name='email' placeholder='Email *' />
          <MyTextInput name='phone' placeholder='Phone *' />
          <MyTextInput name='state' placeholder='State *' />
          <MyTextArea
            name='message'
            placeholder='Message
                  (For freight quote please include your address)'
          />
          <div className='text-center btn-submit d-flex'>
            <button
              className='submit-quick-quote btn btn-primary'
              type='submit'
            >
              Submit Message
            </button>
            <ButtonViewMore slug='products' text='Continue browsing' />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default QuoteForm;
