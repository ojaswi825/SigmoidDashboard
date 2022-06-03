import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightAddon,
    VStack,
    Checkbox,
    useToast,
} from "@chakra-ui/react";

import {
    getToken,
    setToken,
} from "../../Redux/Authentication/AuthenticationActions";

const mapStateToProps = (state) => {
    return { authToken: state.authentication.token };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthToken: () => dispatch(getToken()),
        setAuthToken: (token) => dispatch(setToken(token)),
    };
};

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginEndpointURI = "https://sigviewauth.sigmoid.io/signIn";

    const navigate = useNavigate();
    useEffect(() => {
        props.getAuthToken();
        if (props.authToken) {
            navigate("/dashboard");
        }
        // eslint-disable-next-line
    }, []);

    const toast = useToast();
    const handleLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please enter all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const loginDetails = {
                email: email,
                password: password,
                rememberMe: remember,
            };

            const response = await axios.post(
                loginEndpointURI,
                loginDetails,
                config
            );

            toast({
                title: "User logged in successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            if (remember) {
                props.setAuthToken(response.data.token);
            }

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.statusMessage,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
        setLoading(false);
    };

    return (
        <div>
            <VStack spacing="2rem">
                <FormControl id="email">
                    <FormLabel>Email: </FormLabel>
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password: </FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightAddon width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>
                <br />
                <Checkbox
                    isChecked={remember}
                    onChange={() => setRemember((remember) => !remember)}
                >
                    Remember Me
                </Checkbox>
                <br />
                <Button
                    bgColor="#FE4A49"
                    color="whiteAlpha.900"
                    width="100%"
                    style={{ marginTop: "1rem" }}
                    isLoading={loading}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </VStack>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
