import React from 'react';
import PropTypes from 'prop-types';

FaceBookIcon.propTypes = {
  color: PropTypes.string,
};
function FaceBookIcon({ color = '#5c5c5c' }) {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.4741 11.909 14.7263 8 14.9836V9H10V8H8V6.5C8 5.67157 8.67157 5 9.5 5H10V4H9.5C8.11929 4 7 5.11929 7 6.5V8H5V9H7V14.9836C3.09098 14.7263 0 11.4741 0 7.5Z'
        fill={color ? color : 'white'}
      />
    </svg>
  );
}

export default FaceBookIcon;
