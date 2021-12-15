import { graphql } from 'gatsby';
import React, { useEffect, useRef } from 'react';
import BreadCrumb from '../../common/BreadCrumb';
import PaginationCustom from '../../common/PaginationCustom';
import SingleCard from '../../common/SingleCard';
import BlogListingBannerTop from '../../components/blog/BlogListingBannerTop';
import Layout from '../../components/layout';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './styles.scss';

function BlogListingPage(props) {
  const { width } = useWindowDimensions();
  const blogs = props.data.allWpPost.nodes;
  const pagination = useRef();
  const currentPage = props.pageContext.currentPage;

  useEffect(() => {
    pagination.current &&
      pagination.current.setState({ selected: currentPage - 1 });
  }, [currentPage]);

  const inputBreadCrumb = [
    {
      title: 'Home',
      slug: '/',
    },
    {
      title: 'Blog',
      slug: '/blog',
    },
  ];
  return (
    <Layout>
      <BlogListingBannerTop />
      <div className='main-blog-listing'>
        <div className='container list-blog'>
          <div className='row'>
            <div className='col-12 col-md-12 col-sm-12 col-lg-12'>
              {width > 575 ? (
                <BreadCrumb inputBreadCrumb={inputBreadCrumb} />
              ) : (
                <h1 className='main-title'>Blog</h1>
              )}
            </div>
          </div>
          <div className='row'>
            {width < 575
              ? blogs
                  .slice(0, 1)
                  .map((blog, index) => (
                    <SingleCard
                      key={index}
                      indexBlog={index}
                      input={blog}
                      width={575}
                    />
                  ))
              : ''}
          </div>
          {/* <div className='row'>
            {width > 575
              ? blogs.map((blog, index) => (
                  <SingleCard key={index} indexBlog={index} input={blog} />
                ))
              : blogs
                  .slice(0, 1)
                  .map((blog, index) => (
                    <SingleCard
                      key={index}
                      indexBlog={index}
                      input={blog}
                      width={575}
                    />
                  ))}

            <MobileItemList
              width={width}
              listItem={blogs}
              listTitle='Related Posts'
              dir='blog'
            />
          </div> */}
        </div>
        <div className='container pagination-list-blog'>
          <div className='row'>
            <div className='col-12 col-md-12 col-sm-12 col-lg-12 d-flex align-items-center justify-content-center'>
              <PaginationCustom
                products={blogs}
                productsPerPage={6}
                pageRange={5}
                isBlog={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogListingPage;
//   query LIST_BLOG($skip: Int!, $limit: Int!) {
//   allWpPost(sort: { order: DESC, fields: date }, limit: $limit, skip: $skip) {
export const blogListQuery = graphql`
  query LIST_BLOG($skip: Int!) {
    allWpPost(sort: { order: DESC, fields: date }, skip: $skip) {
      nodes {
        slug
        title
        excerpt
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        date(formatString: "MMMM DD, YYYY")
        author {
          node {
            name
          }
        }
      }
    }
  }
`;
