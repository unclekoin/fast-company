import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getQualitiesList() {
      try {
        const { content } = await qualitiesService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    }
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(`Status ${error.status}. ${error.statusText}`);
      setError(null);
    }
  }, [error]);

  const getQualities = (ids) => {
    return qualities.filter((quality) => ids.includes(quality._id));
  };

  async function errorCatcher(error) {
    const { status, statusText } = error.response;
    setError({ statusText, status });
    setIsLoading(false);
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, getQualities, qualities }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
