import { TComment } from "../comments/types";
import { Status } from "../products/types";

export interface IMyReviewsState {
    items: TComment[],
    length: number,
    status: Status.LOADING | Status.ERROR | Status.SUCCESS
}

export type TFetchMyReviews = {
    limit: number,
    page: number
}

export type TReviews = {
    comments: TComment[],
    length: number
}