import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/type";
import { TicketType } from "@/types/type";
import { CommentType } from "@/types/type";

type CommentState = {
  comments: CommentType[];
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  success: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    getComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<CommentType>) => {
      state.comments.unshift(action.payload);
    },
    commentFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { commentStart, getComments, addComment, commentFail } =
  commentsSlice.actions;

export default commentsSlice.reducer;
