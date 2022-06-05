import axios from "axios";

export const getDateRange = async () => {
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
    const response = await axios.post(dateRangeEndpointURI, payload, options);

    const startEpoch = response.data.result.startDate;
    const endEpoch = response.data.result.endDate;

    const startDate = new Date(parseInt(startEpoch));
    const endDate = new Date(parseInt(endEpoch));

    return { startDate: startDate, endDate: endDate };
};
