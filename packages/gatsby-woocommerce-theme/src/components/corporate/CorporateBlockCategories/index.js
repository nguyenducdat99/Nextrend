import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { memo } from "react";
import ButtonViewMore from "../../../common/ButtonViewMore";
import "./style.scss";

function CorporateBlockCategories() {
  const data = useStaticQuery(graphql`
    query {
      chairImage: file(relativePath: { eq: "CORPORATE_chairs.png" }) {
        childImageSharp {
          fluid(maxWidth: 270) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tableImage: file(relativePath: { eq: "CORPORATE_tables.png" }) {
        childImageSharp {
          fluid(maxWidth: 270) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      loungesImage: file(relativePath: { eq: "CORPORATE_lounges.png" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      stoolsImage: file(relativePath: { eq: "CORPORATE_stools.png" }) {
        childImageSharp {
          fluid(maxWidth: 570) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className='block-categories corporate-categories'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-sm-6 col-xs-6 col-md-3 col-lg-3 cate-item'>
            <Link to='/product-category/chairs'>
              <div className='block-cate-01__left'>
                <p className='menu-title'>chairs</p>
              </div>
              <div className='block-cate-01__image'>
                <Img
                  width='270'
                  height='1000'
                  fluid={data.chairImage.childImageSharp.fluid}
                />
              </div>
            </Link>
            <ButtonViewMore slug='products' text='See all products' />
          </div>
          <div className='col-6 col-sm-6 col-xs-6 col-md-3 col-lg-3 cate-item'>
            <Link to='/product-category/lounges'>
              <div className='block-cate-01__left'>
                <p className='menu-title'>LOUNGES</p>
              </div>
              <div className='block-cate-01__image'>
                <Img
                  width='570'
                  fluid={data.loungesImage.childImageSharp.fluid}
                />
              </div>
            </Link>
            <ButtonViewMore slug='products' text='See all products' />
          </div>
          <div className='col-6 col-sm-6 col-xs-6 col-md-3 col-lg-3 cate-item'>
            <Link to='/product-category/tables'>
              <div className='block-cate-01__left'>
                <p className='menu-title'>Tables</p>
              </div>

              <div className='block-cate-01__image'>
                <Img
                  width='570'
                  fluid={data.tableImage.childImageSharp.fluid}
                />
              </div>
            </Link>
            <ButtonViewMore slug='products' text='See all products' />
          </div>
          <div className='col-6 col-sm-6 col-xs-6 col-md-3 col-lg-3 cate-item'>
            <Link to='/product-category/stools'>
              <div className='block-cate-01__left'>
                <p className='menu-title'>STOOLS</p>
              </div>
              <div className='block-cate-01__image'>
                <Img
                  width='570'
                  fluid={data.stoolsImage.childImageSharp.fluid}
                />
              </div>
            </Link>
            <ButtonViewMore slug='products' text='See all products' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CorporateBlockCategories);
