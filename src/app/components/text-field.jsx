import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange }) => {
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
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextField;
