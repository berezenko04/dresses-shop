export type TComment = {
    text: string,
    likes: number,
    dislikes: number,
    rating: number,
    user: string,
    date: string
}

export interface IPostComment {
    comment: TComment,
    itemId: string
}

export interface IComments {
    comments: TComment[],
    length: number
}

export interface ICommentsSliceState {
    items: TComment[],
    status: 'loading' | 'success' | 'error',
    length: number
}