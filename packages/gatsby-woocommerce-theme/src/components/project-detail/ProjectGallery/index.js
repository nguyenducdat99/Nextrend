import React, { useContext, useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactModal from 'react-modal';
import CloseButton from '../../../common/CloseButton';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Slider from 'react-slick';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../contexts/AppContext';
import './styles.scss';

function ProjectGallery({ project }) {
  const { showGallery } = useContext(GlobalStateContext);
  const [isShowGallery, setIsShowGallery] = useState(false);
  const dispatch = useContext(GlobalDispatchContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileProjectGallery, setMobileProjectGallery] = useState(
    project ? [...project.slice(0, 6)] : null
  );
  const { width } = useWindowDimensions();
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(project ? project.length > 6 : false);
  const listGallery = width < 576 ? mobileProjectGallery : project;
  /* eslint-disable */

  useEffect(() => {
    if (width > 575) return;
    if (loadMore && hasMore) {
      const currentLength = mobileProjectGallery.length;
      const isMore = currentLength < project.length;
      const nextResults = isMore
        ? project.slice(currentLength, currentLength + 6)
        : [];
      setMobileProjectGallery([...mobileProjectGallery, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore, mobileProjectGallery, project, width]);

  /* Check if there is more */
  useEffect(() => {
    if (width > 575) return;
    const isMore =
      mobileProjectGallery && mobileProjectGallery.length < project.length;
    setHasMore(isMore);
  }, [mobileProjectGallery]);

  useEffect(() => {
    let body = document.body;
    if (showGallery === true) {
      body.classList.add('disable-scroll2');
      document.documentElement.classList.add('disable-scroll1');
    } else {
      body.classList.remove('disable-scroll2');
      document.documentElement.classList.remove('disable-scroll1');
    }
  }, [showGallery]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
  }, []);

  const handleLoadMore = () => {
    setLoadMore(true);
  };

  const handleOpenModal = (e) => {
    dispatch({ type: 'OPEN_MODAL', payload: 'gallery-modal' });
    setActiveIndex(+e.target.dataset.index);
    setIsShowGallery(true);
  };
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    setIsShowGallery(false);
  };

  const handleNavigateActiveImg = (value) => {
    let currentIndex = activeIndex + value;
    const galleryLength = project.length;
    currentIndex =
      currentIndex < 0
        ? galleryLength - 1
        : currentIndex === galleryLength
        ? 0
        : currentIndex;
    setActiveIndex(currentIndex);
  };

  const keyDownHandler = (e) => {
    console.log('is gallery show', showGallery);
    if (showGallery) {
      console.log(e.target);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MdKeyboardArrowRight />,
    prevArrow: <MdKeyboardArrowLeft />,
  };
  return (
    <div className='container project-gallery'>
      <div className='card-columns project-card-gallery'>
        {project
          ? listGallery.map((item, index) => {
              return (
                <div className='project-card card' key={index}>
                  <LazyLoadImage
                    src={item.mediaItemUrl}
                    alt={item.altText}
                    className='project-card-img'
                    data-index={index}
                    onClick={handleOpenModal}
                    effect='blur'
                  />
                </div>
              );
            })
          : ''}
      </div>
      <div className='row justify-content-center load-more-btn'>
        {hasMore ? (
          <button
            className='load-more btn btn-outline-primary'
            onClick={handleLoadMore}
          >
            View More
          </button>
        ) : (
          ''
        )}
      </div>
      <ReactModal
        isOpen={showGallery}
        contentLabel='onRequestClose Example'
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        className='Modal project-gallery-slider project-gallery-custom'
        overlayClassName='Overlay'
        ariaHideApp={false}
        closeTimeoutMS={500}
      >
        <CloseButton />
        {/* <Slider {...settings}>
          {project &&
            listGallery.map((item, index) => {
              return <img src={item.mediaItemUrl} alt={item.altText} />;
            })}
        </Slider> */}
        <img
          src={project && project[activeIndex].mediaItemUrl}
          alt={project && project[activeIndex].altText}
        />

        <CloseButton />
        <button
          className='arrow-previous btn-gallery'
          onClick={() => handleNavigateActiveImg(-1)}
          onKeyDown={(event) => {
            console.log('check left');
            if (event.keyCode === 37) {
              handleNavigateActiveImg(-1);
            }
          }}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          className='arrow-next btn-gallery'
          onClick={() => handleNavigateActiveImg(1)}
          onKeyDown={(event) => {
            console.log('check left');
            if (event.keyCode === 39) {
              handleNavigateActiveImg(1);
            }
          }}
        >
          <MdKeyboardArrowRight />
        </button>
      </ReactModal>
    </div>
  );
}

export default ProjectGallery;
