import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../common/form/text-field";
import SelectField from "../../common/form/select-field";
import RadioField from "../../common/form/radio-field";
import MultiSelectField from "../../common/form/multi-select-field";
import { useAuth } from "../../../hooks/use-auth";
import { useSelector } from "react-redux";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData } from "../../../store/users";

const EditUserPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const currentUser = useSelector(getCurrentUserData());
  const { updateUserData } = useAuth();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities.map((quality) => ({
    label: quality.name,
    value: quality._id
  }));
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    await updateUserData({
      ...data,
      qualities: data.qualities.map((quality) => quality.value)
    });
    history.push(`/users/${currentUser._id}`);
  };

  function getQualitiesList(qualitiesIds) {
    const qualitiesArray = [];
    if (qualitiesIds) {
      for (const qualityId of qualitiesIds) {
        for (const quality of qualities) {
          if (quality._id === qualityId) {
            qualitiesArray.push(quality);
          }
        }
      }
    }
    return qualitiesArray;
  }

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: getQualitiesList(currentUser.qualities)
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя обязательно для заполнения" }
    },
    email: {
      isRequired: { message: "Электроннная почта обязательна для заполнения" },
      isEmail: { message: "Некорректно введен адрес электронной почты" }
    },
    profession: {
      isRequired: { message: "Поле обязательно для заполнения" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValid = !Object.keys(errors).length;

  return (
    <div className="container mt-5">
      <button
        onClick={() => history.goBack()}
        className="btn btn-primary pe-3 mb-3"
      >
        <i className="bi bi-caret-left"></i>Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length ? (
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
                defaultValue={data.qualities}
              />
              <button
                className="btn btn-primary w-100 mb-1"
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
