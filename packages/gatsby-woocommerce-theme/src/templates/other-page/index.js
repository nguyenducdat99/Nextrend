import React from "react";
import Layout from "../../components/layout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.scss";

function OtherPage(props) {
  const { page } = props.pageContext;
  const { width } = useWindowDimensions();
  const isLanding = page.content && page.content.includes("<h1>");

  return (
    <Layout width={width}>
      <div className=' editor-styles-wrapper other-page-container'>
        <div className='banner-other-page'>
          <img
            src={page.featuredImage && page.featuredImage.node.mediaItemUrl}
            className='featured-img'
            alt=''
          />
          <div className='container'>
            {!isLanding && (
              <div className='row'>
                <h1
                  className={`${page.featuredImage ? "other-page-title" : ""} `}
                >
                  {page.title}
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div
              className='other-pages-content container'
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OtherPage;
