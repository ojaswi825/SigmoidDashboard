import React from "react";
import { Flex, Button, Spacer, Text, useToast } from "@chakra-ui/react";
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
        <Flex background="black" align="center" height="3rem" padding="1rem">
            <Text color="white">Dashboard</Text>
            <Spacer />
            <Button
                background="black"
                color="#FE4A49"
                width="20%"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Flex>
    );
}

export default connect(null, mapDispatchToProps)(Navbar);
