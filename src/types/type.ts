

export interface IAuth {
    id: number,
    name: string,
    email: string,
    password: string
}


export interface IAuthRes {
    success: boolean,
    message: string | null,
    data: IAuth | null
}

export interface IToken {
    token?: string
}