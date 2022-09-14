import { React, useState, useEffect } from "react";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../common/loader";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleBack = () => {
        history.push("/users");
    };

    return user ? (
        <div className="d-flex justify-content-center">
            <div>
                <h2>{user.name}</h2>
                <p>{`Профессия: ${user.profession.name}`}</p>
                <p>
                    <Qualities qualities={user.qualities} />
                </p>
                <p>{`Встретился раз: ${user.completedMeetings}`}</p>
                <p>{`Оценка: ${user.rate}`}</p>
                <Link to={`/users/${id}/edit`}>
                    <button
                        onClick={() => handleBack()}
                        className="btn btn-primary"
                    >
                        Изменить
                    </button>
                </Link>
            </div>
        </div>
    ) : (
        <Loader />
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
