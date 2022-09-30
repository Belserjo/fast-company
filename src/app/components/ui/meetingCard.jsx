import React from "react";
import PropTypes from "prop-types";

const MeetingCard = ({ value }) => {
    return (
        <div className="card mb-3 bg-dark">
            <div className="card mb-3 bg-dark">
                <div
                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                >
                    <h5 className="card-title">
                        <span>Completed meetings</span>
                    </h5>

                    <h1 className="display-1">{value}</h1>
                </div>
            </div>
        </div>
    );
};

MeetingCard.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default MeetingCard;
