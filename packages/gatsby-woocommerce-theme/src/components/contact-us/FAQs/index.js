import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import FAQS_DATA from './fqa-data';
import './style.scss';
/* eslint-disable */

function CustomToggle({ children, eventKey, handleClick }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    handleClick();
  });

  return (
    <div className='card-header' type='button' onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

function FAQs() {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <div className='faq section'>
      <p className='sub-text'>Questions?</p>
      <h2 className='title'>Read our FAQ</h2>
      <div className='tab-panel'>
        <Accordion defaultActiveKey={0} activeKey={activeKey}>
          {FAQS_DATA.map((item, index) => (
            <Card key={index}>
              <CustomToggle
                as={Card.Header}
                eventKey={index}
                handleClick={() => {
                  if (activeKey === index) {
                    setActiveKey(null);
                  } else {
                    setActiveKey(index);
                  }
                }}
              >
                <div class='d-flex align-items-center justify-content-between'>
                  {item.question}
                  {activeKey === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>
              </CustomToggle>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>{item.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQs;
