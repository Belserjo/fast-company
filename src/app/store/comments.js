import { createSlice } from "@reduxjs/toolkit";
import commentService from "../servises/comment.service";
import { nanoid } from "nanoid";
import localStorageService from "../servises/localStorage.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreatedFiled: (state, action) => {
            state.error = action.payload;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        },
        commentDeletedFiled: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentCreatedFiled,
    commentDeleted,
    commentDeletedFiled
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment =
    ({ data, pageId }) =>
    async (dispatch) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: pageId,
            created_at: Date.now(),
            userId: localStorageService.getUserId()
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreatedFiled(error.message));
        }
    };

export const deleteComment = (commId) => async (dispatch) => {
    try {
        await commentService.removeComment(commId);
        dispatch(commentDeleted(commId));
    } catch (error) {
        dispatch(commentDeletedFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
