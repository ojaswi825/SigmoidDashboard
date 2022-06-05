import React from "react";
import { Box } from "@chakra-ui/react";

function InvalidRange() {
    return (
        <Box
            border="2px"
            h={250}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                    alt="Loading"
                />
                Error! Please select a valid date range.
            </div>
        </Box>
    );
}

export default InvalidRange;
