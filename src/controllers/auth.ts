import { NextFunction, Request, Response } from "express";
import Auth from "../models/auth";
import APIError from "../utils/error";
import { IAuth, IToken } from "../types/type";
import IResponse from "../utils/response";
import bcrypt from "bcrypt";
import jwt,{JwtPayload} from "jsonwebtoken";


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

        return new IResponse("Kayıt İşlemi Başarılı",null, token).created(res);


    } catch (error) {
        throw new APIError("Kayıt İşlemi Başarısız", 400);
    }

}