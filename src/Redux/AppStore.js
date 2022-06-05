import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { appReducer } from "./AppReducer";

export const appStore = createStore(appReducer, applyMiddleware(thunk, logger));
