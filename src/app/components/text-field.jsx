import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        id={name}
        value={value}
        name={name}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextField;
