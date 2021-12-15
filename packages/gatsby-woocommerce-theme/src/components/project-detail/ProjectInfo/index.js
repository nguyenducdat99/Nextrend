import Parser from "html-react-parser";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styles.scss";

function ProjectInfo({ project, width }) {
  return (
    <div className='project-detail-content'>
      <div className='container'>
        <div className='row row__01'>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='img-block img-translate'>
              {project.acfProject.theClient && (
                <LazyLoadImage
                  src={
                    project.acfProject.clientImage
                      ? project.acfProject.clientImage.mediaItemUrl
                      : "https://via.placeholder.com/570x370?text=570x370"
                  }
                  alt={project.acfProject.clientImage?.altText}
                  effect='blur'
                />
              )}
            </div>
          </div>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='content-side'>
              <div className='content-project'>
                <div className='big-title'>
                  {project.acfProject.theClient && "The Client"}
                </div>
                <div className='content-desc'>
                  {project.acfProject.theClient &&
                    Parser(`${project.acfProject.theClient}`)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row row__02'>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='content-side'>
              <div className='content-project'>
                <div className='big-title'>
                  {project.acfProject.theSuburb && "The Suburb"}
                </div>

                <div className='content-desc'>
                  {project.acfProject.theSuburb &&
                    Parser(`${project.acfProject.theSuburb}`)}
                </div>
              </div>
            </div>
          </div>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='img-block'>
              {project.acfProject.theSuburb && (
                <img
                  src={
                    project.acfProject.suburbImage
                      ? project.acfProject.suburbImage.mediaItemUrl
                      : "https://via.placeholder.com/570x370?text=570x370"
                  }
                  alt={
                    project.acfProject.suburbImage
                      ? project.acfProject.suburbImage.altText
                      : ""
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className='row row__03'>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='img-block'>
              {project.acfProject.whatWeDid && (
                <img
                  src={
                    project.acfProject.whatWeDidImage
                      ? project.acfProject.whatWeDidImage.mediaItemUrl
                      : "https://via.placeholder.com/570x370?text=570x370"
                  }
                  alt={
                    project.acfProject.whatWeDidImage
                      ? project.acfProject.whatWeDidImage.altText
                      : ""
                  }
                />
              )}
            </div>
          </div>
          <div
            className={` ${
              width > 575
                ? "col-6 col-sm-6 col-md-6 col-lg-6"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }`}
          >
            <div className='content-side'>
              <div className='content-project'>
                <div className='big-title'>
                  {project.acfProject.whatWeDid && "What We Did"}
                </div>
                <div className='content-desc'>
                  {project.acfProject.whatWeDid &&
                    Parser(`${project.acfProject.whatWeDid}`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
