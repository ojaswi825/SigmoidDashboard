import { Spacer, VStack, Text, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import DateRange from "../Components/Filters/DateRange";
import Navbar from "../Components/Navigation/Navbar";

import { getLocalToken } from "../Redux/Authentication/AuthenticationActions";
import PiePlot from "../Components/Charts/PiePlot";
import TablePlot from "../Components/Charts/TablePlot";
import BarPlot from "../Components/Charts/BarPlot";

import { getDateRange } from "../Services/GetDateRange";

const boxStyles = {
    boxShadow: "0 5px 10px #AAA7A7",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "0.8rem",
    justifyContent: "center",
    alignItems: "center",
};

const mapStateToProps = (state) => {
    return {
        localToken: state.authentication.localToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLocalToken: () => dispatch(getLocalToken()),
    };
};

function Dashboard(props) {
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    useEffect(() => {
        props.getLocalToken();
        if (!props.localToken) {
            navigate("/logout");
        } else {
            getDateRange().then((dates) => {
                setMinDate(dates.startDate);
                setMaxDate(dates.endDate);
                setStart(dates.startDate);
                setEnd(dates.endDate);
            });
        }
        // eslint-disable-next-line
    }, []);

    const onMinDateSelect = (date) => {
        setMinDate(date);
    };
    const onMaxDateSelect = (date) => {
        setMaxDate(date);
    };

    return (
        <div style={{ width: "max-content" }}>
            <Navbar />
            <Text fontSize="5xl" marginTop="2rem" marginLeft="2rem">
                Data Dashboard
            </Text>
            <hr />
            <Box
                display="flex"
                marginTop="2rem"
                padding="2rem"
                minW="100vw"
                maxW="max-content"
            >
                <VStack align="left" w="70%">
                    <Box display="flex" marginBottom="5rem">
                        <Box style={boxStyles} w="55%">
                            <Text fontSize="3xl">Pick a range</Text>
                            <hr />
                            <br />
                            <Box display="flex" justifyContent="space-between">
                                {minDate && maxDate && start && end && (
                                    <DateRange
                                        title="Pick a start date"
                                        defaultSelected={start}
                                        minDate={start}
                                        maxDate={end}
                                        onDateSelect={onMinDateSelect}
                                    />
                                )}
                                {minDate && maxDate && start && end && (
                                    <DateRange
                                        title="Pick an end date"
                                        defaultSelected={end}
                                        minDate={start}
                                        maxDate={end}
                                        onDateSelect={onMaxDateSelect}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Spacer />
                        {minDate && maxDate && (
                            <PiePlot
                                boxStyles={boxStyles}
                                title="Impressions ratio"
                                key={
                                    minDate.toString() +
                                    maxDate.toString() +
                                    "pie"
                                }
                                startDate={minDate.getTime().toString()}
                                endDate={maxDate.getTime().toString()}
                            />
                        )}
                    </Box>

                    {minDate && maxDate && (
                        <BarPlot
                            boxStyles={boxStyles}
                            title="Publisher vs Impressions"
                            key={
                                minDate.toString() + maxDate.toString() + "bar"
                            }
                            startDate={minDate.getTime().toString()}
                            endDate={maxDate.getTime().toString()}
                        />
                    )}
                </VStack>
                <Spacer />

                {minDate && maxDate && (
                    <TablePlot
                        boxStyles={boxStyles}
                        title="Total impressions"
                        key={minDate.toString() + maxDate.toString() + "table"}
                        startDate={minDate.getTime().toString()}
                        endDate={maxDate.getTime().toString()}
                    />
                )}
            </Box>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
