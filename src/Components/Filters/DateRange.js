import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DatePicker from "sassy-datepicker";

function DateRange(props) {
    return (
        <Box>
            <Text fontSize="xl" marginBottom="1rem">
                {props.title}
            </Text>
            <hr />
            <DatePicker
                selected={props.defaultSelected}
                minDate={props.minDate}
                maxDate={props.maxDate}
                onChange={(date) => props.onDateSelect(date)}
            ></DatePicker>
        </Box>
    );
}

export default DateRange;
