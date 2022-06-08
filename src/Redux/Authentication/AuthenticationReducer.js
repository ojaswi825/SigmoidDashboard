import { GET_LOCAL_TOKEN, SET_LOCAL_TOKEN } from "./AuthenticationActionTypes";

const intitialState = {
    localToken: "",
};

export const authenticationReducer = (state = intitialState, action) => {
    switch (action.type) {
        case SET_LOCAL_TOKEN:
            localStorage.setItem("sigmoidLocalToken", action.payload.token);
            // let currentTime = new Date.now();
            // let expirationTime = new Date(currentTime.getTime() + minutes * 120000);
            // document.cookie = `sigmoidLocalToken=${action.payload.token}; expires=${expirationTime}`;
            return {
                ...state,

                localToken: action.payload.token,
            };

        case GET_LOCAL_TOKEN:
            let localToken = localStorage.getItem("sigmoidLocalToken");
            if (!localToken) {
                localToken = "";
            }
            return {
                ...state,
                localToken: localToken,
            };

        default:
            return state;
    }
};
