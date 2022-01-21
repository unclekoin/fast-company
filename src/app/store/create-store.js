import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
  professions: professionsReducer,
  qualities: qualitiesReducer
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
