import React, { useState, useEffect } from "react";
import api from "../../../api";
import Loader from "../../common/loader";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    return user ? (
        <>
            <div className="container bg-dark">
                <div className="row gutters-sm bg-dark">
                    <div className="col-md-4 mb-3 ">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingCard value={user.completedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <Loader />
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
