import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { getLocalToken } from "../Redux/Authentication/AuthenticationActions";

const mapStateToProps = (state) => {
    return { localToken: state.authentication.localToken };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLocalToken: () => dispatch(getLocalToken()),
    };
};

function Logout(props) {
    const toast = useToast();
    const navigate = useNavigate();

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
        <div style={{ padding: "5rem" }}>
            <p style={{ marginBottom: "1rem" }}>You have been logged out!</p>
            <Link to="/">
                <u style={{ color: "#FE4A49" }}>Login again?</u>
            </Link>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
