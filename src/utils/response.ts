import { Response } from "express";
import { IAuth, IAuthRes, IToken } from "../types/type";

class IResponse {
    message: string | null
    data: IAuthRes | null
    token?: IToken | null

    constructor(message: string | null = null, data: IAuthRes | null = null, token?: IToken | null) {
        this.message = message;
        this.data = data;
        this.token = token;
    }

    success(res: Response) {
        return res.status(200).json({
            success: true,
            message: this.message ?? "İşlem Başarılı",
            data: this.data,
            token: this.token
        })
    }

    created(res: Response) {
        return res.status(201).json({
            success: true,
            message: this.message ?? "Create İşlemi Başarılı",
            data: this.data,
            token: this.token
        })
    }
}


export default IResponse;