import { combineReducers } from "redux";
import { authenticationReducer } from "./Authentication/AuthenticationReducer";

export const appReducer = combineReducers({
    authentication: authenticationReducer,
});
