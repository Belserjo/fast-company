import React from "react";
import Qualities from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <Qualities key={item._id} {...item} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
