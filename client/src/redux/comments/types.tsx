export type Comment = {
    text: string,
    likes: number,
    dislikes: number,
    rating: number,
    date: Date
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