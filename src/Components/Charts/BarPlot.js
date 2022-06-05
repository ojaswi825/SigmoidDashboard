import React, { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";

import LoadingScreen from "../../Utilities/LoadingScreen";
import InvalidRange from "../../Utilities/InvalidRange";

import { fetchData } from "../../Services/FetchData";

function BarPlot({ startDate, endDate, title, boxStyles }) {
    const [data, setData] = useState([]);
    const [ctx, setCtx] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getData() {
            const responseData = await fetchData(startDate, endDate, "bar", 5);
            setData(responseData);
            setCtx(document.getElementById("barPlot"));
        }
        getData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
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
            type: "bar",
            data: chartData,
            options: {},
        };
        const barChart = new Chart(ctx, config);
        setLoading(false);

        return () => barChart.destroy();
        // eslint-disable-next-line
    }, [ctx]);

    return (
        <Box style={boxStyles}>
            {loading && <LoadingScreen boxStyles={boxStyles} />}
            {!loading && parseInt(startDate) > parseInt(endDate) && (
                <InvalidRange />
            )}

            <>
                <Text fontSize="3xl" marginBottom="1rem">
                    {title}
                </Text>
                <hr />

                <canvas id="barPlot"></canvas>
            </>
        </Box>
    );
}

export default BarPlot;
