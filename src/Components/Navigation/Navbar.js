import React from "react";
import { Box, Button, Spacer, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { setLocalToken } from "../../Redux/Authentication/AuthenticationActions";

const mapDispatchToProps = (dispatch) => {
    return {
        setLocalToken: (token) => dispatch(setLocalToken(token)),
    };
};

function Navbar(props) {
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        props.setLocalToken("");

        toast({
            title: "User logged out successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        navigate("/logout");
    };

    return (
        <Box
            border="2px"
            display="flex"
            background="black"
            alignItems="center"
            height="5rem"
            padding="2rem"
            width="100%"
            style={{ boxShadow: "0 5px 10px #AAA7A7", position: "sticky" }}
        >
            <Text fontSize="4xl" color="white">
                Dashboard
            </Text>
            <Spacer />
            <Button
                background="black"
                color="#FE4A49"
                fontSize="xl"
                width="max-content"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
}

export default connect(null, mapDispatchToProps)(Navbar);
