import PropTypes from "prop-types";
import React, { memo } from "react";
import BannerTop from "../../common/BannerTop";
import BreadCrumb from "../../common/BreadCrumb";
import MainBlogMobile from "../../common/MobileItemList";
import MainContent from "../../components/blog-detail/MainContent";
import RelatedPosts from "../../components/blog-detail/RelatedPosts";
import TagsAndShare from "../../components/blog-detail/TagsAndShare";
import Layout from "../../components/layout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.scss";

DetailPost.propTypes = {
  props: PropTypes.object,
};
function DetailPost(props) {
  const { currentPost, listRelatedPosts } = props.pageContext;
  const { width } = useWindowDimensions();
  const inputBreadCrumb = [
    {
      id: 1,
      title: "Home",
      slug: "/",
    },
    {
      id: 2,
      title: "Blog",
      slug: "/blog",
    },
    {
      id: 3,
      title: currentPost.title,
      slug: `/blog/${currentPost.slug}`,
    },
  ];

  const { tags } = currentPost;

  return (
    <Layout>
      <div className='detail-blog'>
        {width > 575 && (
          <div className='header-blog-detail'>
            <div className='container bread-crumb-blog-detail'>
              <div className='row'>
                <BreadCrumb inputBreadCrumb={inputBreadCrumb} />
              </div>
            </div>
            <BannerTop remoteImage={currentPost.featuredImage.node} />
          </div>
        )}

        <div className='content-detail-blog'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                <MainContent post={currentPost} width={width} />
              </div>
            </div>
            <TagsAndShare tags={tags} />
          </div>
        </div>
        {width > 575 ? (
          <RelatedPosts listRelatedPosts={listRelatedPosts} />
        ) : (
          <MainBlogMobile listItem={listRelatedPosts} width={width} listTitle="Latest Post" dir ="blog"/>
        )}
      </div>
    </Layout>
  );
}

export default memo(DetailPost);
