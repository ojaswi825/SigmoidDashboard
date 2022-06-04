import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Tfoot,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

import { fetchData } from "../../Services/FetchData";
import LoadingScreen from "../../Utilities/LoadingScreen";

function TablePlot({ startDate, endDate }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData(startDate, endDate, "table", 10).then((data) => {
            setData(data);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box w="fit-content">
            {loading && <LoadingScreen />}
            {!loading && data && (
                <TableContainer w="500">
                    <Table>
                        <TableCaption>Data</TableCaption>
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
            )}
        </Box>
    );
}

export default TablePlot;
