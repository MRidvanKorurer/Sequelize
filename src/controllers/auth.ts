import { NextFunction, Request, Response } from "express";
import Auth from "../models/auth";
import APIError from "../utils/error";
import IResponse from "../utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response, next: NextFunction) => {    
    const {name, email, password} = req.body;

    try {
        const user  = await Auth.findOne({
            where: {email}
        })

        if(user) {
            return next(new APIError("Email adresi zaten kayıtlı", 401));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser: any = await Auth.create({name, email, password: hashPassword});

        const token: any = jwt.sign({sub: newUser.id}, process.env.JWT_KEY || "", {
            expiresIn: "7d",
            algorithm: "HS512"
        })

        return new IResponse("Kayıt İşlemi Başarılı",newUser, token).created(res);


    } catch (error) {
        throw new APIError("Kayıt İşlemi Başarısız", 400);
    }
}


export const login = async (req: Request, res:Response, next: NextFunction) => {
    const {email, password} = req.body;

    const user: any = await Auth.findOne({
        where: {email: email}
    });

    if(!user) {
        return next(new APIError("Email adresi hatalı", 401));
    }

    const comparePassword: boolean = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        return next(new APIError("Parola Hatalı", 401));
    }

    const token: any = jwt.sign({sub: user.id}, process.env.JWT_KEY || "", {
        expiresIn: "7d",
        algorithm: "HS512"
    });

    return new IResponse("Giriş İşlemi Başarılı", user, token).success(res);
}



export const me = async (req: any, res: Response) => {
    const  user = req.user;

    try {
        return new IResponse("İşlem Başarılı Yetkilisiniz", user).success(res);
    } catch (error) {
        throw new APIError("İşlem Başarısız", 400);
    }
}