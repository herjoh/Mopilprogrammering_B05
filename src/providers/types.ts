//type for a sucsessfull response
export type Success<T> = {
    success: true;
    data: T;
}

//type for Failed response
export type Failure = {
    success: false,
    error: string
}
export type Result<T> = Success<T> | Failure;