import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  users: usersReducer,
  professions: professionsReducer,
  qualities: qualitiesReducer,
  comments: commentsReducer
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
