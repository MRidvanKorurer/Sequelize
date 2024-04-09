"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_1 = __importDefault(require("../models/auth"));
const error_1 = __importDefault(require("../utils/error"));
const response_1 = __importDefault(require("../utils/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield auth_1.default.findOne({
            where: { email }
        });
        if (user) {
            return next(new error_1.default("Email adresi zaten kayıtlı", 401));
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield auth_1.default.create({ name, email, password: hashPassword });
        const token = jsonwebtoken_1.default.sign({ sub: newUser.id }, process.env.JWT_KEY || "", {
            expiresIn: "7d",
            algorithm: "HS512"
        });
        return new response_1.default("Kayıt İşlemi Başarılı", null, token).created(res);
    }
    catch (error) {
        throw new error_1.default("Kayıt İşlemi Başarısız", 400);
    }
});
exports.register = register;
