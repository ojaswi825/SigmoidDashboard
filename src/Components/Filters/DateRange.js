import React from "react";
import { Box } from "@chakra-ui/react";
import DatePicker from "sassy-datepicker";

function DateRange(props) {
    return (
        <Box borderWidth="1px" display="flex" justifyContent="center">
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
