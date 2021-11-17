import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api/index";
import { validator } from "../../../../utils/validator";
import SelectField from "../../common/form/select-field";
import TextAreaField from "../../common/form/text-area-field";

const CommentForm = ({ users, pageId, updateUsers }) => {
  const [names, setNames] = useState();
  const [data, setData] = useState({
    userId: "",
    content: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (users) {
      setNames(users.map((user) => ({ _id: user._id, name: user.name })));
    }
  }, [users]);

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    content: {
      isRequired: { message: "Вы не можете отправить пустое сообщение" }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    api.comments.add({ ...data, pageId });
    updateUsers();
    setData({
      userId: "",
      content: ""
    });
  };

  return (
    <>
      {users ? (
        <div className="card mb-2">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2>Новый комментарий</h2>
              <SelectField
                onChange={handleChange}
                defaultOption="Выбрать пользователя..."
                name="userId"
                options={names}
                value={data.userId}
                error={errors.userId}
              />
              <TextAreaField
                onChange={handleChange}
                label="Сообщение"
                name="content"
                value={data.content}
                error={errors.content}
                rows="3"
              />
              <button className="btn btn-primary float-end" disabled={!isValid}>
                Опубликовать
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

CommentForm.propTypes = {
  users: PropTypes.array,
  pageId: PropTypes.string,
  updateUsers: PropTypes.func
};

export default CommentForm;
