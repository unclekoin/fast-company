import React, { useEffect, useState } from "react";
import TextAreaField from "../../common/form/text-area-field";
import { validator } from "../../../../utils/validator";
import PropTypes from "prop-types";

const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValid = !Object.keys(errors).length;

  const clearForm = () => {
    setData({ content: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>Новый комментарий</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
          rows="3"
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" disabled={!isValid}>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  );
};
CommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default CommentForm;
