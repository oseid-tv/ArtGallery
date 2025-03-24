import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
