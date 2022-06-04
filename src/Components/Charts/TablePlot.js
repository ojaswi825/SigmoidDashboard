import React, { useState, useEffect } from "react";
import axios from "axios";
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

function TablePlot({ startDate, endDate }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("sigmoidLocalToken");
        const dataEndpointURI = "https://sigviewauth.sigmoid.io/api/v1/getData";
        const options = {
            headers: {
                "x-auth-token": token,
            },
        };
        const payload = {
            _id: "dashboard1516252439345",
            emailId: "candidate@sigmoid.com",
            orgViewReq: {
                organization: "DemoTest",
                view: "Auction",
            },
            chartObject: {
                metadata: {
                    title: "chartobject:1516252439345",
                    img_thumbnail: "../img/chart.png",
                    chartType: "table",
                    dataLimit: 50,
                },
                requestParam: {
                    granularity: "hour",
                    timeZone: {
                        name: "UTC (+00:00)",
                        location: "UTC",
                    },
                    dateRange: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                    xAxis: ["D044"],
                    yAxis: ["M002"],
                    approxCountDistinct: [],
                    specialCalculation: [],
                    filter: [],
                    orderBy: {
                        metricOrdByList: [
                            {
                                id: "M002",
                                desc: true,
                            },
                        ],
                    },
                    percentCalList: [],
                },
            },
        };

        axios.post(dataEndpointURI, payload, options).then((response) => {
            console.log(response);
            const rawData = response.data.result.data;
            const parsedData = rawData.map((item) => {
                return {
                    ...item,
                    impressions_offered: parseInt(item.impressions_offered),
                };
            });
            setData(parsedData);
        });
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
