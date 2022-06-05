import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

function NotFound404() {
    return (
        <div style={{ padding: "5rem" }}>
            <Text fontSize="5xl">Error 404! Page not found.</Text>
            You might want to &nbsp;
            <Link to="/">
                <u style={{ color: "#FE4A49" }}>Login.</u>
            </Link>
            &nbsp; or &nbsp;
            <Link to="/dashboard">
                <u style={{ color: "#FE4A49" }}>Go to dashboard.</u>
            </Link>
        </div>
    );
}

export default NotFound404;
