import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/text-field";
import CheckboxField from "../common/form/checkbox-field";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электроннная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
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

    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";

    dispatch(login({ payload: data, redirect }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckboxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckboxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        className="btn btn-primary w-100 mb-1"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
