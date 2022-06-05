import React, { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";

import LoadingScreen from "../../Utilities/LoadingScreen";
import InvalidRange from "../../Utilities/InvalidRange";

import { fetchData } from "../../Services/FetchData";

function PiePlot({ startDate, endDate, title, boxStyles }) {
    const [data, setData] = useState([]);
    const [ctx, setCtx] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getData() {
            const responseData = await fetchData(startDate, endDate, "bar", 5);
            setData(responseData);
            setCtx(document.getElementById("piePlot"));
        }
        getData();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (ctx) {
            const chartData = {
                labels: data.map((item) => item.publisherId),
                datasets: [
                    {
                        label: "No. of impressions",
                        data: data.map((item) => item.impressions_offered),
                        backgroundColor: Array(data.length).fill("#fe4439"),
                    },
                ],
            };
            const config = {
                type: "doughnut",
                data: chartData,
                options: {},
            };
            const barChart = new Chart(ctx, config);

            return () => barChart.destroy();
        }
        // eslint-disable-next-line
    }, [ctx]);

    return (
        <Box style={boxStyles}>
            {!loading && parseInt(startDate) > parseInt(endDate) && (
                <InvalidRange />
            )}
            {loading && <LoadingScreen boxStyles={boxStyles} />}

            {!loading && (
                <>
                    <Text fontSize="3xl">{title}</Text>
                    <hr style={{ marginBottom: "2rem" }} />
                    <canvas id="piePlot"></canvas>
                </>
            )}
        </Box>
    );
}

export default PiePlot;
