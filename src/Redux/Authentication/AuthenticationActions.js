import { GET_TOKEN, SET_TOKEN } from "./AuthenticationActionTypes";

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: {
            token,
        },
    };
};

export const getToken = () => {
    return {
        type: GET_TOKEN,
        payload: {},
    };
};
