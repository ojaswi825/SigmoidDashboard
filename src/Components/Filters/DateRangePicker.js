import React, { useState } from "react";

import { Button, Text, VStack } from "@chakra-ui/react";
import Moment from "react-moment";
import DatePicker from "sassy-datepicker";

function DateRangePicker(props) {
    const [startShow, setStartShow] = useState(true);
    const [endShow, setEndShow] = useState(false);

    const [error, setError] = useState(false);

    const handleStartShow = () => {
        setStartShow(!startShow);
        setEndShow(false);
    };

    const handleEndShow = () => {
        setStartShow(false);
        setEndShow(!endShow);
    };

    const handleMinChange = (date) => {
        if (date >= props.maxDate) {
            setError(true);
        } else {
            props.onMinDateSelect(date);
            setError(false);
        }
    };

    const handleMaxChange = (date) => {
        if (date <= props.minDate) {
            setError(true);
        } else {
            props.onMaxDateSelect(date);
            setError(false);
        }
    };

    return (
        <div className="card" style={{ width: "max-content" }}>
            <Text fontSize="3xl">Pick a range</Text>
            <hr />
            <br />
            <VStack align="center">
                <Button
                    color="white"
                    backgroundColor="#fe4439"
                    w="100%"
                    onClick={() => handleStartShow()}
                >
                    <Moment format="DD MMM, YYYY" date={props.minDate} />
                </Button>
                {startShow && (
                    <DatePicker
                        selected={props.minDate}
                        minDate={props.start}
                        maxDate={props.end}
                        onChange={(date) => handleMinChange(date)}
                    />
                )}
                <Button
                    color="white"
                    backgroundColor="#fe4439"
                    w="100%"
                    onClick={() => handleEndShow()}
                >
                    <Moment format="DD MMM, YYYY" date={props.maxDate} />
                </Button>
                {endShow && (
                    <DatePicker
                        selected={props.maxDate}
                        minDate={props.start}
                        maxDate={props.end}
                        onChange={(date) => handleMaxChange(date)}
                    />
                )}
                {error && <Text color="red">Please select a valid range</Text>}
            </VStack>
        </div>
    );
}

export default DateRangePicker;
