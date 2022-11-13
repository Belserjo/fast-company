import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfession,
    getProfessionLoadingState
} from "../../../store/professions";
import { getUserById } from "../../../store/users";

const userEditPage = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const { updateUserData } = useAuth();
    const currentUser = useSelector(getUserById(userId));
    const user = useSelector(getUserById(userId));

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };

    const professions = useSelector(getProfession());
    const professionsLoading = useSelector(getProfessionLoadingState());
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (
            !professionsLoading &&
            !qualitiesLoading &&
            currentUser &&
            !userData
        ) {
            setUserData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, userData]);
    useEffect(() => {
        if (userData && isLoading) {
            setLoading(false);
        }
    }, [userData]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [userData]);

    const validate = () => {
        const errors = validator(userData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...user,
            ...userData,
            qualities: userData.qualities.map((q) => q.value)
        });
        history.replace(`/users/${userId}`);
    }
    return (
        !isLoading && (
            <div className="container mt-5">
                <BackButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя:"
                                onChange={handleChange}
                                value={userData.name}
                                name="name"
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта:"
                                onChange={handleChange}
                                value={userData.email}
                                name="email"
                                error={errors.email}
                            />
                            <SelectField
                                label="Профессия:"
                                value={userData.profession}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                label="Выберите ваш пол:"
                                value={userData.sex}
                                name="sex"
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                label="Ваши качества:"
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={userData.qualities}
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                Обновить данные
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default userEditPage;
