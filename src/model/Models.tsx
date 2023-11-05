export interface loginModel {
    email: string,
    password:string
}

export interface response {
    data : unknown,
    localDateTime: number,
    statusCode: number
    message: string
}