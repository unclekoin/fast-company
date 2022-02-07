import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/qualities.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true;
    },
    qualitiesReceived(state, action) {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFiled(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFiled } = actions;

const isOutdated = (date) => {
  return Date.now() - date > 10 * 60 * 1000;
};

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualitiesService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  const qualitiesArray = [];
  if (state.qualities.entities && qualitiesIds) {
    for (const qualityId of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === qualityId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  return [];
};

export default qualitiesReducer;
