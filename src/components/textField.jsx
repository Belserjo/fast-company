import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPass, setShowPass] = useState(false);
    const toggleShowPass = () => {
        setShowPass((prevState) => !prevState);
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validati">
                <input
                    type={showPass ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPass}
                    >
                        <i
                            className={"bi bi-eye" + (showPass ? "-slash" : "")}
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextField;
