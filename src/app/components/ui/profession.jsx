import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionByIds,
    getProfessionLoadingState
} from "../../store/professions";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionLoadingState());
    const prof = useSelector(getProfessionByIds(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Profession;
