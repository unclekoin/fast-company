import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <span className="d-block text-center text-danger" role="button" {...rest}>
      <i className={`bi bi-bookmark${status ? "-fill" : ""} fs-4`}></i>
    </span>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
