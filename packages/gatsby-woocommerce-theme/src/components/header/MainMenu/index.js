import { Link } from 'gatsby';
import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ReactModal from 'react-modal';
import CloseButton from '../../../common/CloseButton';
import MegaMenu from '../MegaMenu';
import LIST_PAGES from './main-menu-data';
import './styles.scss';
/* eslint-disable */

function MainMenu({
  showMegaMenu,
  width,
  showSideBarMenu,
  onHandleModal,
  showMobileMegaMenu,
}) {
  let CURRENT_PAGES_LIST = LIST_PAGES;
  if (width > 575) {
    CURRENT_PAGES_LIST = CURRENT_PAGES_LIST.slice(1, 5);
  }

  const rootContent = (
    <div className='menu-col'>
      <ul className='d-flex menu-list'>
        {CURRENT_PAGES_LIST.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`menu-item ${
                item.title === 'Contact Us' ? 'contact-menu-parent' : ''
              }`}
              data-name={item.title}
            >
              {width < 576 && item.title === 'Product' ? (
                <div className='product-menu-mobile d-flex justify-content-between'>
                  <Link
                    to={`/${item.slug}`}
                    className={`${
                      index === CURRENT_PAGES_LIST.length - 1 ? 'none-mr' : null
                    } col-6`}
                    activeClassName='active'
                    onClick={() =>
                      onHandleModal({
                        type: 'CLOSE_MODAL',
                      })
                    }
                  >
                    {item.title}
                  </Link>
                  <div
                    className='col-6 text-right'
                    onClick={() =>
                      onHandleModal({
                        type: 'OPEN_MODAL',
                        payload: 'mobile-mega-menu',
                      })
                    }
                  >
                    <MdKeyboardArrowRight className='arrow-right' />
                  </div>
                </div>
              ) : (
                <Link
                  to={`/${item.slug}`}
                  className={
                    index === CURRENT_PAGES_LIST.length - 1 ? 'none-mr' : null
                  }
                  activeClassName='active'
                  onClick={() =>
                    onHandleModal({
                      type: 'CLOSE_MODAL',
                    })
                  }
                >
                  {item.title}
                  {(item.title === 'Product' || item.title === 'Contact Us') &&
                    width > 575 && (
                      <MdKeyboardArrowDown className='arrow-down' />
                    )}
                </Link>
              )}

              {item.title === 'Product' && (
                <div
                  className={`header__bottom mega-menu ${
                    showMegaMenu && 'active'
                  }`}
                >
                  <MegaMenu
                    showMegaMenu={showMegaMenu}
                    width={width}
                    onHandleModal={onHandleModal}
                    showMobileMegaMenu={showMobileMegaMenu}
                  />
                </div>
              )}
              {item.title === 'Contact Us' && (
                <div className='contact-menu'>
                  <ul>
                    <Link to='/contact-us/brisbane'>
                      <li className='item'>Brisbane</li>
                    </Link>
                    <Link to='/contact-us/sydney'>
                      <li className='item'>Sydney</li>
                    </Link>
                    <Link to='/contact-us/melbourme'>
                      <li className='item'>Melbourme</li>
                    </Link>
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  let mainContent = rootContent;
  if (width < 576) {
    mainContent = (
      <ReactModal
        isOpen={showSideBarMenu}
        onRequestClose={() => onHandleModal({ type: 'CLOSE_MODAL' })}
        shouldCloseOnOverlayClick={true}
        className='main-menu-modal'
        overlayClassName='Overlay'
        ariaHideApp={false}
      >
        <CloseButton />
        {rootContent}
      </ReactModal>
    );
  }

  return <div className='main-menu'>{mainContent}</div>;
}

export default MainMenu;
