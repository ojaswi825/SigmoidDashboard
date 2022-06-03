import { SET_TOKEN, GET_TOKEN } from "./AuthenticationActionTypes";

const intitialState = {
    token: "",
};

export const authenticationReducer = (state = intitialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            localStorage.setItem("x-auth-token", action.payload.token);
            return { ...state, token: action.payload.token };

        case GET_TOKEN:
            let token = localStorage.getItem("x-auth-token");
            if (!token) {
                token = "";
            }
            return { ...state, token: token };

        default:
            return state;
    }
};
