import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const quality = getQuality(id);
    return (
        <span className={`badge m-1 bg-${quality.color} m-1`}>
            {quality.name}
        </span>
    );
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
