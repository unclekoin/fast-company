import React from 'react';

const BookMark = ({ status, ...rest }) => {
  return (
    <span className="d-block text-center text-danger" role="button" {...rest}>
      <i className={`bi bi-bookmark${status ? '-fill' : ''} fs-4`}></i>
    </span>
  );
};

export default BookMark;
