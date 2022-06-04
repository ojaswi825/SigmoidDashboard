import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar";
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

function Dashboard(props) {
    const navigate = useNavigate();

    useEffect(() => {
        props.getLocalToken();
        if (!props.localToken) {
            navigate("/logout");
        }
    });

    return (
        <div>
            <Navbar />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
