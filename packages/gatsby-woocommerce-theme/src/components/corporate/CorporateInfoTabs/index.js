// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { memo, useState } from "react";
import TabMission from "../TabMission";
import TabValue from "../TabValue";
import TabVision from "../TabVision";
import "./style.scss";
/* eslint-disable */

function CorporateInfoTabs() {
  const listTabs = ["Mission", "Vision", "Value"];
  const listTabPanel = [
    { id: 1, component: TabMission },
    { id: 2, component: TabVision },
    { id: 3, component: TabValue },
  ];
  const [activeTab, setActiveTab] = useState(0);
  let TabPanelComponent = listTabPanel[activeTab].component;

  const bannerURL = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "CORPORATE_mission.png" }) {
        childImageSharp {
          fluid(maxWidth: 568, quality: 100, maxHeight: 780) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='corporate-info-tabs section '>
      <div className='container corporate-info-tabs-container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6 tab-panel-left'>
            <p className='section-sub'>why choose us</p>
            <h3 className='section-title'>Our philosophy</h3>
            <p className='intro'>
              We understand that furniture isn’t just about a place to sit – it
              helps you achieve your business goals. Whether you need to squeeze
              more patrons into a tight space, boost foot traffic, or slash
              maintenance costs in a hard-wearing environment, we can assist.
            </p>
            <div className='tabs'>
              <ul className='nav nav-tabs tabs-list'>
                {listTabs.map((tab, index) => (
                  <li
                    className={`nav-item ${index === activeTab && "active"}`}
                    key={index}
                    data-index={index}
                    onClick={() => setActiveTab(index)}
                  >
                    <a className={`nav-link`} aria-current='page'>
                      {tab}
                    </a>
                  </li>
                ))}
              </ul>
              <TabPanelComponent />
            </div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 tab-panel-right'>
            <Img
              width='568'
              height='780'
              fluid={bannerURL.placeholderImage.childImageSharp.fluid}
            />
          </div>
        </div>
      </div>

      <div className='accordion-container container'>
        {listTabs.map((tab, index) => (
          <div
            className={`nav-item ${index === activeTab && "active"}`}
            key={index}
            data-index={index}
            onClick={() => setActiveTab(index)}
            aria-expanded={index === activeTab ? "true" : "false"}
            aria-controls={`accordion${index + 1}_item`}
          >
            <button
              className={`nav-link d-flex justify-content-between ${
                index === activeTab && "active"
              }`}
              aria-current='page'
            >
              <span className='item-name'>{tab}</span>

              {/* {index === activeTab ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )} */}
            </button>
            {index === activeTab && <hr />}
            {index === activeTab && <TabPanelComponent />}
          </div>
        ))}
        <div className='tab-panel-right'>
          <Img
            width='568'
            height='780'
            fluid={bannerURL.placeholderImage.childImageSharp.fluid}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(CorporateInfoTabs);
