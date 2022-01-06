import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/use-qualities";

const QualitiesList = ({ ids }) => {
  const { isLoading, getQualities } = useQualities();
  const qualities = getQualities(ids);

  return (
    <>
      {!isLoading ? qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      )) : null}
    </>
  );
};

QualitiesList.propTypes = {
  ids: PropTypes.array
};

export default QualitiesList;
