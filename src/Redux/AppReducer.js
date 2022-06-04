import { combineReducers } from "redux";
import { authenticationReducer } from "./Authentication/AuthenticationReducer";
import { dateRangeReducer } from "./Filters/DateRange/DateRangeReducer";

export const appReducer = combineReducers({
    authentication: authenticationReducer,
    dateRange: dateRangeReducer,
});
