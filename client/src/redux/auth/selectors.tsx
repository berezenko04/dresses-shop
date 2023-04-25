import { RootState } from "../store";

export const authDataSelector = (state: RootState) => state.auth.data;
export const authStatusSelector = (state: RootState) => state.auth.status;
export const isAuthSelector = (state: RootState) => Boolean(state.auth.data);