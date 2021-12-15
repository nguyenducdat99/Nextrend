import React from "react";
import PropTypes from "prop-types";

CommentIcon.propTypes = {
  color: PropTypes.string,
};

function CommentIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 7.5H8M4 7.5H5M10 7.5H11M14.5 14.5H7.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5V14.5Z"
        stroke={color ? color : "#5C5C5C"}
      />
    </svg>
  );
}

export default CommentIcon;
