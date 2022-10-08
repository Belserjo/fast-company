import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../servises/profession.service";
import { toast } from "react-toastify";
const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function getProfession(id) {
        return professions.find((prof) => prof._id === id);
    }
    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher() {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
