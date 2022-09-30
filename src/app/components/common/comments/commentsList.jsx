import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onDel }) => {
    return comments.map((comment) => (
        <Comment
            // className="bg-dark"
            key={comment._id}
            {...comment}
            onDel={onDel}
        />
    ));
};
CommentsList.propTypes = {
    comment: PropTypes.array,
    onRemove: PropTypes.func
};

export default CommentsList;
