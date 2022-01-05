import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/text-field";
import CheckboxField from "../common/form/checkbox-field";
import { useAuth } from "../../hooks/use-auth";

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const { logIn } = useAuth();

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
    setEnterError(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await logIn(data);
      history.push(
        history.location.state.from.pathname
          ? history.location.state.from.pathname
          : "/"
      );
    } catch (error) {
      setEnterError(error.message);
    }
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
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        className="btn btn-primary w-100 mb-1"
        disabled={!isValid || enterError}
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
