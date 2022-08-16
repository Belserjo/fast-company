import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ onToogleBookmark, userId, isBookmarked }) => {
    return (
        <button
            className="btn "
            onClick={() => {
                onToogleBookmark(userId);
            }}
        >
            <i
                className={`bi bg-white bi-${
                    isBookmarked ? "heart-fill" : "heart"
                }`}
            ></i>
        </button>
    );
};

Bookmark.propTypes = {
    onToogleBookmark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool.isRequired
};

export default Bookmark;
