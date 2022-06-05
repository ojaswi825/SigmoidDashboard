import { Box } from "@chakra-ui/react";
import React from "react";

function LoadingScreen({ boxStyles }) {
    return (
        <Box
            w={350}
            h={250}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={boxStyles}
        >
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                    alt="Loading"
                />
                Loading...
            </div>
        </Box>
    );
}

export default LoadingScreen;
