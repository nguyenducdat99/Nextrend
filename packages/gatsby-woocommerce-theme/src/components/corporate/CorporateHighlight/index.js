import React, { memo } from "react";
import Slider from "react-slick";
import CORPORATE_HIGHLIGHTS from "./data";
import "./style.scss";

function CorporateHighlight({ isCorporate = false, width }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: width > 768 ? 4 : 1,
    slidesToScroll: width > 768 ? 4 : 1,
  };
  const highlightItem = CORPORATE_HIGHLIGHTS.map((item, index) => {
    const TheIcon = item.icon;
    return (
      <div
        className={`highlight-col ${
          !isCorporate ? "col-sm-6 col-md-4 col-lg-3" : "col-12"
        } ${index === 1 && "highlight-blue"}`}
        key={index}
      >
        <div className='col-12 highlight-col-item'>
          <div className='icon text-center'>
            <TheIcon />
          </div>
          <h5 className='subtitle text-center'> {item.subtitle}</h5>
          <p className='col-content text-center'>{item.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div className='highlight section container'>
      <h2
        className={`title text-center ${
          isCorporate ? "corporate-highlight-title" : ""
        }`}
      >
        Why We’re Different
      </h2>
      <div className='row'>
        {isCorporate ? (
          <Slider {...settings} className='col-12 highlight-slider'>
            {highlightItem}
          </Slider>
        ) : (
          highlightItem
        )}
      </div>
    </div>
  );
}

export default memo(CorporateHighlight);
