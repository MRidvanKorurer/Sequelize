import APIError from "../utils/error";
import {Request, Response, NextFunction} from "express";

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIError) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message ?? "İşlem Başarısız"
        })
    }

    next();

    return res.status(400).json({
        success: false,
        message: "Api'nizde bir hata meydana geldi lütfen kontrol edin!"
    })
}


export default errorHandlerMiddleware;