import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
  users: usersReducer,
  professions: professionsReducer,
  qualities: qualitiesReducer
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
