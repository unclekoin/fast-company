import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validator } from "../../../../utils/validator";
import TextField from "../../common/form/text-field";
import SelectField from "../../common/form/select-field";
import RadioField from "../../common/form/radio-field";
import MultiSelectField from "../../common/form/multi-select-field";
import {
  getQualities,
  getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUserData } from "../../../store/users";
import history from "../../../../utils/history";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const currentUser = useSelector(getCurrentUserData());
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

    dispatch(updateUserData({
      ...data,
      qualities: data.qualities.map((quality) => quality.value || quality._id)
    }));
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
      isRequired: { message: "?????? ?????????????????????? ?????? ????????????????????" }
    },
    email: {
      isRequired: { message: "???????????????????????? ?????????? ?????????????????????? ?????? ????????????????????" },
      isEmail: { message: "?????????????????????? ???????????? ?????????? ?????????????????????? ??????????" }
    },
    profession: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" }
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
        <i className="bi bi-caret-left"></i>??????????
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="??????"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="?????????????????????? ??????????"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="??????????????????"
                defaultOption="?????????????? ??????????????????..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                name="sex"
                options={[
                  { name: "??????????????", value: "male" },
                  { name: "??????????????", value: "female" },
                  { name: "????????????", value: "other" }
                ]}
                label="??????"
                value={data.sex}
                onChange={handleChange}
              />
              <MultiSelectField
                name="qualities"
                onChange={handleChange}
                options={qualitiesList}
                label="????????????????"
                defaultValue={data.qualities}
              />
              <button
                className="btn btn-primary w-100 mb-1"
                disabled={!isValid}
              >
                ????????????????
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
