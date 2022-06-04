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

function TablePlot({ startDate, endDate }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(startDate, endDate, "table", 10).then((data) =>
            setData(data)
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Box w="fit-content">
            {data && (
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
