import { NextFunction, Request, Response } from "express";
import Auth from "../models/auth";
import APIError from "../utils/error";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const token =  req.headers.authorization?.split(" ")[1];

    if(!token) {
        throw next(new APIError("İşlem Yapmak İçin Login Olunuz", 401))
    }

    jwt.verify(token, process.env.JWT_KEY || "", async(err: any, decoded: any) => {
        if(err) {
            const error =  new APIError("Geçersiz Token", 401);
            next(error)
        }

        const user = await Auth.findByPk(decoded?.sub);

        if(!user) {
            const error =  new APIError("Geçersiz Token", 401);
            next(error)
        }

        req.user = user;

        next();
    })
}