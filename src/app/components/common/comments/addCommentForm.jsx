import React, { useState } from "react";
import TextAreaField from "../form/TextAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { createComment } from "../../../store/comments";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const AddCommentForm = () => {
    const dispatch = useDispatch();
    const { userId: pageId } = useParams();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData({});
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(createComment({ data, pageId }));
        clearForm();
    };
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ""}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
