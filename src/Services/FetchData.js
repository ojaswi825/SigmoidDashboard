import axios from "axios";

export const fetchBarTableData = async (
    startDate,
    endDate,
    chartType,
    dataLimit = 50
) => {
    const token = localStorage.getItem("sigmoidLocalToken");
    const dataEndpointURI = "https://sigviewauth.sigmoid.io/api/v1/getData";
    const options = {
        headers: {
            "x-auth-token": token,
        },
    };
    const payload = {
        _id: "dashboard1516252439345",
        emailId: "candidate@sigmoid.com",
        orgViewReq: {
            organization: "DemoTest",
            view: "Auction",
        },
        chartObject: {
            metadata: {
                title: "chartobject:1516252439345",
                img_thumbnail: "../img/chart.png",
                chartType: chartType,
                dataLimit: dataLimit,
            },
            requestParam: {
                granularity: "hour",
                timeZone: {
                    name: "UTC (+00:00)",
                    location: "UTC",
                },
                dateRange: {
                    startDate: startDate,
                    endDate: endDate,
                },
                xAxis: ["D044"],
                yAxis: ["M002"],
                approxCountDistinct: [],
                specialCalculation: [],
                filter: [],
                orderBy: {
                    metricOrdByList: [
                        {
                            id: "M002",
                            desc: true,
                        },
                    ],
                },
                percentCalList: [],
            },
        },
    };

    const response = await axios.post(dataEndpointURI, payload, options);

    if (response.data.status.statusCode === "500") {
        return [];
    }

    const rawData = response.data.result.data;

    const parsedData = rawData.map((item) => {
        return {
            ...item,
            impressions_offered: parseInt(item.impressions_offered),
        };
    });

    return parsedData;
};

export const fetchPieData = async (
    startDate,
    endDate,
    chartType,
    dataLimit = 50
) => {
    const token = localStorage.getItem("sigmoidLocalToken");
    const dataEndpointURI = "https://sigviewauth.sigmoid.io/api/v1/getData";
    const options = {
        headers: {
            "x-auth-token": token,
        },
    };
    const payload = {
        _id: "Datastory_ChartId_1535224664111",
        emailId: "candidate@sigmoid.com",
        orgViewReq: {
            organization: "DemoTest",
            view: "Auction",
        },
        chartObject: {
            metadata: {
                title: "",
                img_thumbnail: "images/pie.png",
                chartType: chartType,
                dataLimit: dataLimit,
            },
            text: [],
            requestParam: {
                granularity: "hour",
                timeZone: {
                    name: "UTC (+00:00)",
                    location: "UTC",
                },
                dateRange: {
                    startDate: startDate,
                    endDate: endDate,
                },
                xAxis: ["D005"],
                yAxis: [],
                approxCountDistinct: [],
                specialCalculation: ["CM001"],
                filter: [],
                orderBy: {
                    customMetricOrdByList: [
                        {
                            id: "CM001",
                            desc: true,
                        },
                    ],
                },
                percentCalList: [
                    {
                        id: "CM001",
                    },
                ],
            },
        },
    };

    const response = await axios.post(dataEndpointURI, payload, options);

    if (response.data.status.statusCode === "500") {
        return [];
    }

    const rawData = response.data.result.data;

    const parsedData = rawData.map((item) => {
        return {
            ...item,
            impressions_offered: parseInt(item.impressions_offered),
        };
    });

    return parsedData;
};
