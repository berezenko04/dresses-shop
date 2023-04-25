export type AuthSliceState = {
    data: null | UserData,
    status: 'loading' | 'success' | 'error'
}

export interface UserData {
    id: string,
    email: string,
    fullName: string,
    token: string
}