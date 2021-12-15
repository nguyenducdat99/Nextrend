/**
 * Layout component contains header and footer
 *
 * @package gatsby-wordpress-theme
 */

import React from 'react';
import PropTypes from 'prop-types';
import './../../sass/common.scss';
import Footer from '../footer';
import '../../assets/lib/all.min.css';
import Header from '../header/MainHeader/Header';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Layout = ({ children }) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Header width={width} />
      <main className='main-container'>{children}</main>
      <Footer width={width} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
