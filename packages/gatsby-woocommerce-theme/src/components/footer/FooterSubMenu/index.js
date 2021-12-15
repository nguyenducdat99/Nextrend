import { Link } from "gatsby";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import YoutubeIcon from "../../icons/YoutubeIcon";
import "./styles.scss";

function FooterSubMenu({ width, socialIcons, subCateList }) {
  return (
    <div className='footer-sub-menu'>
      <div className='row sub-menu-top align-items-center'>
        <div className='col-12 col-sm-12 col-md-2 col-lg-2'>
          <p className='coppyright-text'>Copyright @ 2021 Nextrend</p>
        </div>
        {width > 575 && (
          <div className='col-12 col-sm-12 col-md-8 col-lg-8'>
            <div className='sub-menu__lists-cate'>
              <ul className='d-flex align-items-center justify-content-around'>
                {subCateList.map((item) => (
                  <li key={`${item.id}${item.slug}`}>
                    <Link className='menu-item' to={`${item.slug}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className='col-12 col-sm-12 col-md-2 col-lg-2'>
          <div className='sub-menu__lists-icon d-flex'>
            <ul className='d-flex align-items-center'>
              {socialIcons.map(({ classIcon, id, href, icon }) => (
                <li key={`${id}${href}`}>
                  <span className={`${classIcon} icon`}>
                    <a href={href} target='_blank' rel='noreferrer'>
                      {icon === "linkedin" ? (
                        <FaLinkedin />
                      ) : icon === "facebook" ? (
                        <FaFacebook />
                      ) : (
                        <YoutubeIcon />
                      )}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {width > 575 && (
        <div className='row align-items-center'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
            <ul className='sub-menu-bottom d-flex align-items-center justify-content-between'>
              <li>Hospitality Furniture Brisbane, QLD </li>
              <li>Hospitality Furniture North Queensland </li>
              <li>Hospitality Furniture Sydney, NSW </li>
              <li>Hospitality Furniture Melbourne, VIC </li>
              <li>Commercial Furniture Australia </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterSubMenu;
