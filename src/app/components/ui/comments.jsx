import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";

const Comments = () => {
    const { userId: pageId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(pageId));
    }, [pageId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2 bg-dark">
                <div className="card-body bg-dark">
                    <AddCommentForm />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3 bg-dark">
                    <div className="card-body bg-dark">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList comments={sortedComments} />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
