import { Box, Container, Text } from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";

function Authentication() {
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

export default Authentication;
