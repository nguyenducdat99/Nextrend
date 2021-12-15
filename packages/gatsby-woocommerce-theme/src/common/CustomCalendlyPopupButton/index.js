import React, { Fragment } from "react";
import { openPopupWidget } from "react-calendly";
import "./styles.scss";
/* eslint-disable */

const CustomCalendlyPopupButton = ({
  url,
  prefill,
  pageSettings,
  utm,
  title,
  content,
  calendlyOneLine,
  isCalendlyOneLine,
}) => {
  const handleOpenPopupWidget = () => {
    openPopupWidget({ url, prefill, pageSettings, utm });
  };

  return (
    <div className='one-el d-flex' onClick={handleOpenPopupWidget}>
      <span className='icon icon-book'>
        <i className='fas fa-calendar'></i>
      </span>
      <div className='one-el-content'>
        <button className='custom-calendly-btn btn'>
          {!isCalendlyOneLine ? (
            <Fragment>
              <p className='one-el-content__title'>{title}</p>
              <span className='one-el-content__desc'>{content}</span>
            </Fragment>
          ) : (
            <p className='one-el-content__desc'>{calendlyOneLine}</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomCalendlyPopupButton;
