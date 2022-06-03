import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { appReducer } from "./AppReducer";

export const appStore = createStore(appReducer, applyMiddleware(logger));
