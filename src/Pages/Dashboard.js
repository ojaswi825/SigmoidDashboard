import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Text } from "@chakra-ui/react";

import Navbar from "../Components/Navigation/Navbar";
import DateRangePicker from "../Components/Filters/DateRangePicker";
import PiePlot from "../Components/Charts/PiePlot";
import TablePlot from "../Components/Charts/TablePlot";
import BarPlot from "../Components/Charts/BarPlot";

import { getLocalToken } from "../Redux/Authentication/AuthenticationActions";
import { getDateRange } from "../Services/GetDateRange";

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
            navigate("/");
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
        <div>
            <Navbar />
            <Text fontSize="5xl" marginTop="2rem" marginLeft="2rem">
                Data Dashboard
            </Text>
            <hr />
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    minWidth: "98vw",
                    marginTop: "3rem",
                }}
            >
                <div
                    className="datePieBarContainer"
                    style={{
                        display: "grid",
                        border: "1px solid black",
                        gridTemplateColumns: "auto auto",
                        marginBottom: "5rem",
                        width: "max-content",
                    }}
                >
                    {minDate && maxDate && start && end && (
                        <DateRangePicker
                            minDate={minDate}
                            maxDate={maxDate}
                            start={start}
                            end={end}
                            onMinDateSelect={onMinDateSelect}
                            onMaxDateSelect={onMaxDateSelect}
                        />
                    )}
                    {minDate && maxDate && (
                        <PiePlot
                            title="Impressions ratio"
                            key={
                                minDate.toString() + maxDate.toString() + "pie"
                            }
                            startDate={minDate.getTime().toString()}
                            endDate={maxDate.getTime().toString()}
                        />
                    )}

                    {minDate && maxDate && (
                        <BarPlot
                            title="Publisher vs Impressions"
                            key={
                                minDate.toString() + maxDate.toString() + "bar"
                            }
                            startDate={minDate.getTime().toString()}
                            endDate={maxDate.getTime().toString()}
                        />
                    )}
                </div>
                {minDate && maxDate && (
                    <TablePlot
                        title="Total impressions"
                        key={minDate.toString() + maxDate.toString() + "table"}
                        startDate={minDate.getTime().toString()}
                        endDate={maxDate.getTime().toString()}
                    />
                )}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
