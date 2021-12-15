import { Link } from "gatsby";
import React from "react";
import BlogCardRelated from "../../../common/BlogCardRelated";
import ArrowRight from "../../icons/ArrowRight";
import "./style.scss";

function RelatedPosts({ listRelatedPosts }) {
  return (
    <div className='related-posts'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center'>
            <h2 className='big-title-section'>Related Posts</h2>
          </div>
        </div>
        <div className='row list-3-post-related'>
          {listRelatedPosts.map((item, index) => {
            return (
              <BlogCardRelated
                key={index}
                item={item}
                listRelatedPosts={listRelatedPosts}
              />
            );
          })}
        </div>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-end'>
            <Link to='/blog'>
              <div className='view-more d-flex align-items-center'>
                <p>View more</p>
                <span className='icon icon-right d-flex'>
                  <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedPosts;
