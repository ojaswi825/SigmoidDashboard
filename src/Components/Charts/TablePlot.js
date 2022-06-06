import React, { useState, useEffect } from "react";
import {
    Text,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Tfoot,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";

import { fetchBarTableData } from "../../Services/FetchData";
import LoadingScreen from "../../Utilities/LoadingScreen";

function TablePlot({ startDate, endDate, title }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchBarTableData(startDate, endDate, "table", 17).then((data) => {
            setData(data);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Box className="card">
            {!loading && data && (
                <>
                    <Text fontSize="3xl" marginBottom="1rem">
                        {title}
                    </Text>
                    <hr />
                    <TableContainer w="500">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Publisher Id</Th>
                                    <Th>Impressions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((row) => {
                                    return (
                                        <Tr
                                            key={
                                                row.publisherId +
                                                row.impressions_offered
                                            }
                                        >
                                            <Td>{row.publisherId}</Td>
                                            <Td>{row.impressions_offered}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            <Tfoot></Tfoot>
                        </Table>
                    </TableContainer>
                </>
            )}
            {loading && <LoadingScreen />}
        </Box>
    );
}

export default TablePlot;
