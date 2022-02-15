import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, ...rest }) => {
  const status = localStorage.favoriteUsers
    ? JSON.parse(localStorage.favoriteUsers).includes(id)
    : false;
  return (
    <span className="d-block text-center text-danger" role="button" { ...rest }>
      <i className={ `bi bi-bookmark${status ? "-fill" : ""} fs-4` }></i>
    </span>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool,
  id: PropTypes.string
};

export default Bookmark;
