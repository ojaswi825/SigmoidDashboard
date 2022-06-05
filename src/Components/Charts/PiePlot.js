import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip } from "recharts";

import LoadingScreen from "../../Utilities/LoadingScreen";
import InvalidRange from "../../Utilities/InvalidRange";
import { fetchData } from "../../Services/FetchData";

function PiePlot({ startDate, endDate, title }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData(startDate, endDate, "pie", 5).then((data) => {
            setData(data);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Box border="2px">
            {!loading && parseInt(startDate) > parseInt(endDate) && (
                <InvalidRange />
            )}
            {loading && <LoadingScreen />}
            {!loading && data && (
                <>
                    <Text fontSize="3xl" marginBottom="1rem">
                        {title}
                    </Text>
                    <hr />
                    <PieChart width={400} height={250}>
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
                </>
            )}
        </Box>
    );
}

export default PiePlot;
