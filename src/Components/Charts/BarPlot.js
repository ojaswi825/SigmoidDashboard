import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from "recharts";
import LoadingScreen from "../../Utilities/LoadingScreen";
import InvalidRange from "../../Utilities/InvalidRange";

import { fetchData } from "../../Services/FetchData";

function BarPlot({ startDate, endDate, title, boxStyles }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData(startDate, endDate, "bar", 5).then((data) => {
            setData(data);
            setLoading(false);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(data);
        console.log(loading);
    }, [data, loading]);

    return (
        <Box style={boxStyles}>
            {loading && <LoadingScreen boxStyles={boxStyles} />}
            {!loading && parseInt(startDate) > parseInt(endDate) && (
                <InvalidRange />
            )}
            {!loading && data && (
                <>
                    <Text fontSize="3xl" marginBottom="1rem">
                        {title}
                    </Text>
                    <hr />
                    <BarChart
                        style={{ overflowX: "scroll" }}
                        width={900}
                        height={500}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="publisherId" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="impressions_offered" fill="#8884d8" />
                    </BarChart>
                </>
            )}
        </Box>
    );
}

export default BarPlot;
