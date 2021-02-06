import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import countriesReducer from "./countries";
import trialsReducer from "./trials";

const reducer = combineReducers({
  trials: trialsReducer,
  countries: countriesReducer,
});

const store = configureStore({
  reducer,
});

export default store;
