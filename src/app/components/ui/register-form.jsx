import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/text-field";
import SelectField from "../common/form/select-field";
import RadioField from "../common/form/radio-field";
import MultiSelectField from "../common/form/multi-select-field";
import CheckboxField from "../common/form/checkbox-field";
import { useProfessions } from "../../hooks/use-profession";
import { useAuth } from "../../hooks/use-auth";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
    license: false
  });

  const { signUp } = useAuth();
  const qualities = useSelector(getQualities());
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id
  }));
  const { professions } = useProfessions();
  const [errors, setErrors] = useState({});

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      min: { message: "Имя должно содержать не менее 3 символов", value: 3 }
    },
    email: {
      isRequired: { message: "Электроннная почта обязательна для заполнения" },
      isEmail: { message: "Некорректно введен адрес электронной почты" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: { message: "Пароль должен содержать не менее 8 символов", value: 8 }
    },
    profession: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    license: {
      isRequired: { message: "Вы должны подтвердить лицензионное соглашение" }
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
    const modifiedData = {
      ...data,
      qualities: data.qualities.map((quality) => quality.value)
    };
    try {
      await signUp(modifiedData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
      <SelectField
        label="Профессия"
        defaultOption="Выбрать профессию..."
        name="profession"
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        name="gender"
        options={[
          { name: "Мужчина", value: "male" },
          { name: "Женщина", value: "female" },
          { name: "Другое", value: "other" }
        ]}
        label="Пол"
        value={data.gender}
        onChange={handleChange}
      />
      <MultiSelectField
        name="qualities"
        onChange={handleChange}
        options={qualitiesList}
        label="Качества"
      />
      <CheckboxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтверидть <a href="/">лицензионное соглашение</a>
      </CheckboxField>
      <button className="btn btn-primary w-100 mb-1" disabled={!isValid}>
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
