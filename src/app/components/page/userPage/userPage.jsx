import React from "react";
import Loader from "../../common/loader";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <Loader />
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
