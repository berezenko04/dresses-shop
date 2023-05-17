import { RootState } from "../store";

export const userDataSelector = (state: RootState) => state.user.data;
export const authStatusSelector = (state: RootState) => state.user.status;
export const isAuthSelector = (state: RootState) => Boolean(state.user.data);
export const authErrorSelector = (state: RootState) => state.user.message;