import { RootState } from "../store";

export const commentsItemsSelector = (state: RootState) => state.comments.items;
export const commentsLengthSelector = (state: RootState) => state.comments.length;