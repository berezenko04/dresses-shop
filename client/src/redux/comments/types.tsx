export type TComment = {
    _id?: string,
    text: string,
    likes: string[],
    dislikes: string[],
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

export interface IActionComment {
    id: string,
    info: string
}