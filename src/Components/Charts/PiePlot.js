import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip } from "recharts";

import LoadingScreen from "../../Utilities/LoadingScreen";
import { fetchData } from "../../Services/FetchData";

function PiePlot({ startDate, endDate }) {
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

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box w="max-content">
            {loading && <LoadingScreen />}
            {!loading && data && (
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
