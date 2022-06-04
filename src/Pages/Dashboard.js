import { Flex, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DateRange from "../Components/Filters/DateRange";
import Navbar from "../Components/Navigation/Navbar";

import { getLocalToken } from "../Redux/Authentication/AuthenticationActions";

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

    useEffect(() => {
        props.getLocalToken();
        if (!props.localToken) {
            navigate("/logout");
        } else {
            const token = localStorage.getItem("sigmoidLocalToken");
            const dateRangeEndpointURI =
                "https://sigviewauth.sigmoid.io/api/v1/getDateRange";
            const options = {
                headers: {
                    "x-auth-token": token,
                },
            };
            const payload = {
                organization: "DemoTest",
                view: "Auction",
            };
            axios
                .post(dateRangeEndpointURI, payload, options)
                .then((response) => {
                    console.log(response);
                    const startEpoch = response.data.result.startDate;
                    const endEpoch = response.data.result.endDate;

                    const startDate = new Date(parseInt(startEpoch));
                    const endDate = new Date(parseInt(endEpoch));
                    // endDate.setDate(endDate.getDate() - 1);

                    console.log(startDate, endDate);
                    setMinDate(startDate);
                    setMaxDate(endDate);
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
            <Flex padding="2rem" w="40%">
                {minDate && maxDate && (
                    <DateRange
                        defaultSelected={minDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        onDateSelect={onMinDateSelect}
                    />
                )}
                <Spacer />
                {minDate && maxDate && (
                    <DateRange
                        defaultSelected={maxDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        onDateSelect={onMaxDateSelect}
                    />
                )}
            </Flex>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
