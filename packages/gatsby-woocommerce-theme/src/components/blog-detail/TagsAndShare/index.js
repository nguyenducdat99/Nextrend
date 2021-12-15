import React from "react";
import ShareButtons from "../../../common/ShareButtons";
import "./style.scss";

function TagsAndShare({ tags }) {
  return (
    <div className='tag-and-share'>
      <div className='row d-flex align-items-center'>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
          <ul className='list-tags d-flex align-items-center'>
            <li>
              <a className='tag-item' href='https://nextrend.netlify.app/'>
                Furniture
              </a>
            </li>
            <li>
              <a className='tag-item' href='https://nextrend.netlify.app/'>
                Patio
              </a>
            </li>
            <li>
              <a className='tag-item' href='https://nextrend.netlify.app/'>
                Chairs
              </a>
            </li>
          </ul>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
        <div className='share-blog d-flex align-items-center'>
          <ShareButtons/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TagsAndShare;
