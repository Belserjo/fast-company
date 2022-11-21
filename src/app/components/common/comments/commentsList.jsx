import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
    ));
};
CommentsList.propTypes = {
    comment: PropTypes.array
};

export default CommentsList;
