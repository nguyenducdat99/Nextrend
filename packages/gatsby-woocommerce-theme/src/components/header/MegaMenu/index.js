import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { Fragment } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsChevronDoubleRight } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ReactModal from "react-modal";
import LIST_PRODUCTS_CATE from "./mega-menu-data";
import "./styles.scss";
/* eslint-disable */

function MegaMenu({ showMegaMenu, width, onHandleModal, showMobileMegaMenu }) {
  const megaImages = useStaticQuery(graphql`
    query {
      megaLounges: file(relativePath: { eq: "MEGAMENU-products-lounges.png" }) {
        childImageSharp {
          fixed(width: 170, height: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      megaTables: file(relativePath: { eq: "MEGAMENU-products-tables.png" }) {
        childImageSharp {
          fixed(width: 170, height: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      megaChairs: file(relativePath: { eq: "MEGAMENU-products-chairs.png" }) {
        childImageSharp {
          fixed(width: 170, height: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      megaStools: file(relativePath: { eq: "MEGAMENU-products-stools.png" }) {
        childImageSharp {
          fixed(width: 170, height: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  let mainContent = (
    <div
      className={`mega-menu-content justify-content-center ${
        width > 575 && "container"
      } ${showMegaMenu && "active"}`}
    >
      {width < 576 && (
        <div className='mega-menu-mobile-header '>
          <div className='container d-flex justify-content-between align-items-center'>
            <div
              className='back-btn d-flex justify-content-between align-items-center'
              onClick={() =>
                onHandleModal({ type: "OPEN_MODAL", payload: "side-bar" })
              }
            >
              <MdKeyboardArrowLeft className='arrow-left' />
              <div className='back-btn-text'>Products</div>
            </div>
            <div onClick={() => onHandleModal({ type: "CLOSE_MODAL" })}>
              <AiFillCloseSquare />
            </div>
          </div>
        </div>
      )}

      <div className='row'>
        <div
          className={`${
            width < 576
              ? "container"
              : "mega-menu__main-cate-container col-md-6 col-lg-8 col-8"
          }`}
        >
          <div
            className={`mega-menu__main-cate  ${
              width < 576 ? "container" : ""
            }`}
          >
            {LIST_PRODUCTS_CATE.slice(0, 4).map((cate) => (
              <div className='item' key={`${cate.id}${cate.title}`}>
                <Link
                  to={`${cate.slug}`}
                  onClick={() =>
                    onHandleModal({
                      type: "CLOSE_MODAL",
                    })
                  }
                >
                  <Img
                    width='170'
                    fixed={megaImages[cate.imageName].childImageSharp.fixed}
                  />
                  <div className='item-cate-container d-flex align-items-center'>
                    <div className='item-cate'>
                      <span>{cate.title}</span>
                      <BsChevronDoubleRight />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${
            width > 576 ? "col-md-6 col-lg-4 col-4" : "container"
          } `}
        >
          <div className={`mega-menu__other-cate`}>
            {LIST_PRODUCTS_CATE.slice(4).map((cate) => (
              <div className='item' key={`${cate.id}${cate.title}`}>
                <Link
                  to={`/${cate.slug}`}
                  onClick={() =>
                    onHandleModal({
                      type: "CLOSE_MODAL",
                    })
                  }
                >
                  <span>{cate.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (width < 576) {
    mainContent = (
      <ReactModal
        isOpen={showMobileMegaMenu}
        contentLabel='onRequestClose Example'
        shouldCloseOnOverlayClick={false}
        className='mega-menu-modal'
        overlayClassName='Overlay'
        ariaHideApp={false}
      >
        {mainContent}
      </ReactModal>
    );
  }

  return <Fragment>{mainContent}</Fragment>;
}

export default MegaMenu;
