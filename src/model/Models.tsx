export interface response {
    data : unknown,
    localDateTime: number,
    statusCode: number
    message: string
}

export interface loginModel {
    email: string,
    password:string
}
export interface role {
    id:string
}

export interface registerModel {
    name: string,
    surname: string,
    email: string,
    password: string
    birtday: Date,
    phoneNumber:string
    role: Array<role>
}

export interface forgotPasswordModel {
    email: string
}