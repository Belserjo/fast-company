import { React, useState, useEffect } from "react";
import api from "../../../../api";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../ui/loader";

const UserPage = () => {
    const [user, setUser] = useState();
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
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
                <button
                    onClick={() => handleBack()}
                    className="btn btn-primary"
                >
                    Все пользователи
                </button>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default UserPage;
