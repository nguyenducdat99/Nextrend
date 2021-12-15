import React, { memo } from "react";
import "./style.scss";
// import { graphql, useStaticQuery } from 'gatsby';

function CorporateCustomerCare() {
  return (
    <div className='customer-care section'>
      <div className='container'>
        <h2 className='title text-center'>CUSTOMER CARE</h2>
        <p className='highlight part'>
          When you’re buying online, it’s the things you can’t see that make all
          the difference. Will it do the job you need? Will it last? What
          happens if something goes wrong? It’s Nextrend’s integrity and
          customer care that sets us apart.
        </p>
        <p className=' part'>
          We work with you to help meet deadlines and choose the best option.
          When you partner with Nextrend, you have peace of mind that you’re
          working with professionals and you’ll experience:
        </p>
        <div className='list-content'>
          <div className='part'>
            <li className='highlight'>
              <span>Guidance and advice</span>
            </li>
            <p>
              throughout the whole process – from planning and design, to
              selection and ordering, delivery and assembly, and after-sales
              support.
            </p>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>
                Furniture selected and built to withstand harsh Australian
                conditions
              </span>
            </li>
            <p>
              We work with manufacturers to ensure our products are of the
              highest manufactured quality, made from strong, safe, durable
              materials.
            </p>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>Practical solutions that require minimal maintenance</span>
            </li>
            <p>
              whether it’s stackable furniture, easy cleaning, or liquid
              resistance.
            </p>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>A freight replacement guarantee</span>
            </li>
            <p>that protects you if furniture is damaged in transit.</p>
          </div>
          <div className='part'>
            <li className='highlight'>
              <span>Peace of mind</span>
            </li>
            <p>
              with a generous two year warranty and customer service guarantee.
            </p>
          </div>
          <div className='part'>
            <p>
              Don’t just take our word for it – we have many testimonials from
              satisfied customers from all over Australia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CorporateCustomerCare);
