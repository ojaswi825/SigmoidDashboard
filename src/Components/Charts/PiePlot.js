import React, { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";

import LoadingScreen from "../../Utilities/LoadingScreen";

import { fetchPieData } from "../../Services/FetchData";

function PiePlot({ startDate, endDate, title }) {
    const [data, setData] = useState([]);
    const [ctx, setCtx] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getData() {
            const responseData = await fetchPieData(
                startDate,
                endDate,
                "pie",
                5
            );
            setData(responseData);
            setCtx(document.getElementById("piePlot"));
        }
        getData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (ctx) {
            const chartData = {
                labels: data.map((item) => item.advertiserId),
                datasets: [
                    {
                        label: "No. of impressions",
                        data: data.map((item) => item.CM001),
                        backgroundColor: [
                            "#c62828",
                            "#d32f2f",
                            "#f44336",
                            "#ef5350",
                            "#e57373",
                        ],
                    },
                ],
            };
            const config = {
                type: "pie",
                data: chartData,
                options: {},
            };
            const barChart = new Chart(ctx, config);
            setLoading(false);

            return () => barChart.destroy();
        }
        // eslint-disable-next-line
    }, [ctx]);

    return (
        <Box className="card">
            <>
                <Text fontSize="3xl">{title}</Text>
                <hr style={{ marginBottom: "2rem" }} />
                <canvas id="piePlot"></canvas>
            </>
            {loading && <LoadingScreen />}
        </Box>
    );
}

export default PiePlot;
