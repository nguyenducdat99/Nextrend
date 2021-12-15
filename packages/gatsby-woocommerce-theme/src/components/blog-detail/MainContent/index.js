import React from "react";
import CommentIcon from "../../icons/CommentIcon";
import "./styles.scss";

function MainContent({ post, width }) {
  return (
    <div className='content-blog editor-styles-wrapper'>
      <div className='blog-detail-header-title'>
        <h1 className='blog-title'>{post.title}</h1>
        <div className='post d-flex align-items-center justify-content-center'>
          <div className='post-info-container'>
            <span className='author post-info'>by {post.author.node.name}</span>
            <span className='date post-info'>{post.date}</span>
            <div className='comment d-flex align-items-center post-info'>
              <span className='icon icon-comment'>
                <CommentIcon color='#999999' />
              </span>
              <span className='total-comment'>0 comment</span>
            </div>
          </div>
        </div>
      </div>
      {width > 575 && <hr />}
      <p
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
        className='portfolio-content'
      />
    </div>
  );
}

export default MainContent;
