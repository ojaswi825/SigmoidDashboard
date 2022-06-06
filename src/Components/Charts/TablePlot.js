import React, { useState, useEffect } from "react";
import {
    Text,
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
        fetchBarTableData(startDate, endDate, "table", 19).then((data) => {
            setData(data);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="card tablePlot" style={{ minWidth: "fit-content" }}>
            {!loading && data && (
                <>
                    <Text fontSize="3xl" marginBottom="1rem">
                        {title}
                    </Text>
                    <hr />
                    <TableContainer>
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
        </div>
    );
}

export default TablePlot;
