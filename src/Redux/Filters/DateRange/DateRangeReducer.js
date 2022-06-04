import { SET_DEFAULT, SET_DATE_RANGE } from "./DateRangeActionTypes";

const initialState = {
    defaultStart: null,
    defaultEnd: null,
    rangeStart: null,
    rangeEnd: null,
};

export const dateRangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEFAULT:
            return {
                ...state,
                defaultStart: action.payload.startDate,
                defaultEnd: action.payload.endDate,
            };
        case SET_DATE_RANGE:
            return {
                ...state,
                rangeStart: action.payload.startDate,
                rangeEnd: action.payload.endDate,
            };

        default:
            return state;
    }
};
