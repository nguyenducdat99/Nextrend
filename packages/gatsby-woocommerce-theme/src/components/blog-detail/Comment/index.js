import { DiscussionEmbed } from "disqus-react";
import React from "react";
import "./style.scss";

function Comment({ slug, title }) {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  };
  return (
    <div className='comment-container'>
      <h2 className='comment-title text-center'>
        {/* <CommentCount {...disqusConfig} /> */}
        Comments
      </h2>
      <hr />

      <DiscussionEmbed {...disqusConfig} />
      {/* <AddCommentForm /> */}
    </div>
  );
}

export default Comment;
