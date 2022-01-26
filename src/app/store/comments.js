import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFiled(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated(state, action) {
      state.entities.push(action.payload);
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    },
    createCommentFailed(state, action) {
      state.error = action.payload;
    },
    removeCommentFailed(state, payload) {
      state.error = state.payload;
    }
  }
});

const commentCreateRequested = createAction("comment/commentCreateRequested");
const commentRemoveRequested = createAction("comment/commentRemoveRequested");

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFiled,
  commentCreated,
  createCommentFailed,
  commentRemoved,
  removeCommentFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(createCommentFailed(error.message));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) dispatch(commentRemoved(commentId));
  } catch (error) {
    dispatch(removeCommentFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
