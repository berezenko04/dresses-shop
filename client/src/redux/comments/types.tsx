export type Comment = {
    text: string,
    likes: number,
    dislikes: number,
    rating: number,
    user: string,
    date: string
}

export interface PostComment {
    comment: Comment,
    itemId: string
}

export interface Comments {
    comments: Comment[],
    length: number
}

export interface CommentsSliceState {
    items: Comment[],
    status: 'loading' | 'success' | 'error',
    length: number
}