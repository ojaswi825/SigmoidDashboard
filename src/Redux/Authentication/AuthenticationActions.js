import { GET_LOCAL_TOKEN, SET_LOCAL_TOKEN } from "./AuthenticationActionTypes";

export const setLocalToken = (token) => {
    return {
        type: SET_LOCAL_TOKEN,
        payload: { token: token },
    };
};

export const getLocalToken = () => {
    return {
        type: GET_LOCAL_TOKEN,
        payload: {},
    };
};
