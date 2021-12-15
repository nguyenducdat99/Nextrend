import { graphql } from "gatsby";
import React from "react";
import BannerCarousel from "../components/home/banner-carousel";
import BannerQuote from "../components/home/banner-quote";
import BlockCategories from "../components/home/block-categories";
import Blog from "../components/home/blog";
import ClientPolicy from "../components/home/client-policy";
import FeaturedDestinations from "../components/home/featured-destinations";
import ListSmallCate from "../components/home/list-small-cate";
import NewProductRanges from "../components/home/new-product-range";
import Testimonials from "../components/home/testimonials";
import Layout from "../components/layout";
import useWindowDimensions from "../hooks/useWindowDimensions";

function HomePage({ data }) {
  const { width } = useWindowDimensions();
  return (
    <Layout width={width}>
      <BannerCarousel />
      <ClientPolicy width={width} />
      <BlockCategories />
      <ListSmallCate />
      <NewProductRanges newProductRanges={data.newProductRanges.nodes} />
      <BannerQuote width={width} />
      <FeaturedDestinations projects={data.projects.nodes} width={width} />
      <Testimonials />
      <Blog posts={data.posts.nodes} width={width} />
    </Layout>
  );
}

export default HomePage;

export const data = graphql`
  query HOME_PAGE {
    posts: allWpPost(limit: 3, sort: { order: DESC, fields: date }) {
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
      }
    }
    projects: allWpProject(sort: { order: DESC, fields: date }, limit: 2) {
      nodes {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
    newProductRanges: allWpNewProductRange {
      nodes {
        title
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        productRange {
          productRangeLink
          fieldGroupName
        }
      }
    }
  }
`;
