import React from "react";

const Bookmark = (props) => {
    return (
        <button
            className="btn "
            onClick={() => {
                props.onToogleBookmark(props.userId);
            }}
        >
            <i
                className={`bi bi-${
                    props.isBookmarked ? "heart-fill" : "heart"
                }`}
            ></i>
        </button>
    );
};

export default Bookmark;
