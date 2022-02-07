import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector, useDispatch } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ ids }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualities = useSelector(getQualitiesByIds(ids));
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  ids: PropTypes.array
};

export default QualitiesList;
