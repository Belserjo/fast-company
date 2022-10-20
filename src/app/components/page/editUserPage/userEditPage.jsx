import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const userEditPage = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const { updateUserData } = useAuth();
    const { getUserById } = useUser();
    const user = getUserById(userId);

    const {
        qualities,
        getQuality,
        isLoading: qualitiesLoading
    } = useQualities();
    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));
    const userQualities = user.qualities.map((qualId) => getQuality(qualId));

    const { professions, isLoading: professionsLoading } = useProfessions();
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);

    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession,
        sex: user.sex,
        qualities: getDefaultUserQualities(userQualities)
    });
    useEffect(() => {
        if (!qualitiesLoading && !professionsLoading) setLoading(false);
    }, [qualitiesLoading, professionsLoading]);

    function getDefaultUserQualities(qualitiesData) {
        return qualitiesData.map((quality) => ({
            label: quality.name,
            value: quality._id
        }));
    }

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
