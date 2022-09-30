import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();

    if (!isLoading) {
        return (
            <>
                {qualities.map((quality) => {
                    return <Quality id={quality} key={quality} />;
                })}
            </>
        );
    } else {
        return "loading...";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
