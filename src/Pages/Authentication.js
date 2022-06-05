import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Container, Text, useToast } from "@chakra-ui/react";

import Login from "../Components/Authentication/Login";
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

function Authentication(props) {
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        props.getLocalToken();

        if (props.localToken) {
            toast({
                title: "User logged in successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate("/dashboard");
        }
        // eslint-disable-next-line
    });

    return (
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="#FE4A49"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                boxShadow="xl"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="Calibri"
                    color="whiteAlpha.900"
                    textAlign="center"
                >
                    Welcome! Please Login to Access the Dashboard
                </Text>
            </Box>
            <br />
            <Box bg="#ffffff" w="100%" p={4} borderRadius="lg" boxShadow="xl">
                <Login />
            </Box>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
