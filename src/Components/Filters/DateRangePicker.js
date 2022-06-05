import React, { useState } from "react";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import Moment from "react-moment";
import DatePicker from "sassy-datepicker";

function DateRangePicker(props) {
    const [startShow, setStartShow] = useState(true);
    const [endShow, setEndShow] = useState(false);

    const handleStartShow = () => {
        setStartShow(!startShow);
        setEndShow(false);
    };

    const handleEndShow = () => {
        setStartShow(false);
        setEndShow(!endShow);
    };

    return (
        <Box border="2px" className="card" w="300px">
            <Text fontSize="3xl">Pick a range</Text>
            <hr />
            <br />
            <VStack align="left">
                <Button
                    color="white"
                    backgroundColor="#fe4439"
                    onClick={() => handleStartShow()}
                >
                    <Moment format="DD MMM, YYYY" date={props.minDate} />
                </Button>
                {startShow && (
                    <DatePicker
                        selected={props.minDate}
                        minDate={props.start}
                        maxDate={props.end}
                        onChange={(date) => props.onMinDateSelect(date)}
                    />
                )}
                <Button
                    color="white"
                    backgroundColor="#fe4439"
                    onClick={() => handleEndShow()}
                >
                    <Moment format="DD MMM, YYYY" date={props.maxDate} />
                </Button>
                {endShow && (
                    <DatePicker
                        selected={props.maxDate}
                        minDate={props.start}
                        maxDate={props.end}
                        onChange={(date) => props.onMaxDateSelect(date)}
                    />
                )}
            </VStack>
        </Box>
    );
}

export default DateRangePicker;
