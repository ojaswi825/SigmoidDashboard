import React from "react";

function LoadingScreen() {
    return (
        <div display="flex" alignItems="center" justifyContent="center">
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                    alt="Loading"
                />
                Loading...
            </div>
        </div>
    );
}

export default LoadingScreen;
