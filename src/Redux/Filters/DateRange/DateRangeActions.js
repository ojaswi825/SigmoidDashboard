import axios from "axios";
import { SET_DEFAULT, SET_DATE_RANGE } from "./DateRangeActionTypes";

export const setDefault = (startDate, endDate) => {
    return {
        type: SET_DEFAULT,
        payload: {
            startDate: startDate,
            endDate: endDate,
        },
    };
};

export const setDateRange = (startDate, endDate) => {
    return {
        type: SET_DATE_RANGE,
        payload: {
            startDate: startDate,
            endDate: endDate,
        },
    };
};

export const getDefaultDates = () => {
    return (dispatch) => {
        const token = localStorage.getItem("sigmoidLocalToken");
        const dateRangeEndpointURI =
            "https://sigviewauth.sigmoid.io/api/v1/getDateRange";
        const options = {
            headers: {
                "x-auth-token": token,
            },
        };
        const payload = {
            organization: "DemoTest",
            view: "Auction",
        };

        axios.post(dateRangeEndpointURI, payload, options).then((response) => {
            console.log(response);
            const startEpoch = response.data.result.startDate;
            const endEpoch = response.data.result.endDate;

            const startDate = new Date(parseInt(startEpoch));
            const endDate = new Date(parseInt(endEpoch));

            dispatch(setDefault(startDate, endDate));
        });
    };
};
