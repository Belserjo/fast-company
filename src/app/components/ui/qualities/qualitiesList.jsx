import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) return "Loading...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    return (
        <>
            {qualitiesList.map((quality) => {
                return <Quality {...quality} key={quality._id} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
