import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip } from "recharts";
import axios from "axios";

function PiePlot({ startDate, endDate }) {
    const [data, setData] = useState([]);

    useEffect(() => {
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
                    chartType: "pie",
                    dataLimit: 50,
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

        axios.post(dataEndpointURI, payload, options).then((response) => {
            const rawData = response.data.result.data;
            const parsedData = rawData.map((item) => {
                return {
                    ...item,
                    impressions_offered: parseInt(item.impressions_offered),
                };
            });
            setData(parsedData);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box w="max-content">
            {data && (
                <PieChart width={730} height={250}>
                    <Pie
                        data={data}
                        dataKey="impressions_offered"
                        nameKey="publisherId"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        label={true}
                    />
                    <Tooltip />
                </PieChart>
            )}
        </Box>
    );
}

export default PiePlot;
