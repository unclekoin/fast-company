import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const profession = useSelector(getProfessionById(id));

  return <>{!isLoading ? <span>{profession.name}</span> : <h3>Loading...</h3>}</>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
