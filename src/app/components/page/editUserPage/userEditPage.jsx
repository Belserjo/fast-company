import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import Loader from "../../common/loader";

const userEditPage = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    console.log(userData);
    console.log("allQualities", qualities);
    console.log("userData.qualities", userData.qualities);
    useEffect(() => {
        setLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setUserData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id,
                qualities: getDefaultUserQualities(qualities)
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (userData.name) setLoading(false);
    });

    const getDefaultUserQualities = (qualities) => {
        return qualities.map((quality) => ({
            label: quality.name,
            value: quality._id,
            color: quality.color
        }));
    };

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

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const handleChange = (target) => {
        console.log(target);
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = userData;

        api.users
            .update(userId, {
                ...userData,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((userData) => history.push(`/users/${userId}`));
    };
    return !isLoading ? (
        <div className="container mt-5">
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
                            options={professions}
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
                            options={qualities}
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
    ) : (
        <Loader />
    );
};

export default userEditPage;
