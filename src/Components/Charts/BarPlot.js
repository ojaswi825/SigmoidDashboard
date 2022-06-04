import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from "recharts";

import { fetchData } from "../../Services/FetchData";

function BarPlot({ startDate, endDate }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(startDate, endDate, "bar", 5).then((data) => {
            setData(data);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box w="max-content">
            {data && (
                <BarChart
                    style={{ overflowX: "scroll" }}
                    width={1000}
                    height={250}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="publisherId" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="impressions_offered" fill="#8884d8" />
                </BarChart>
            )}
        </Box>
    );
}

export default BarPlot;
