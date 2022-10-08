import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
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
