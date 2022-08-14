import React from "react";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-border"
                role="status"
                style={{ width: 4 + "rem", height: 4 + "rem" }}
            >
                <span className="sr-only"></span>
            </div>
        </div>
    );
};

export default Loader;
