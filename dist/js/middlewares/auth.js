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
exports.authMiddleware = void 0;
const auth_1 = __importDefault(require("../models/auth"));
const error_1 = __importDefault(require("../utils/error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        throw next(new error_1.default("İşlem Yapmak İçin Login Olunuz", 401));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            const error = new error_1.default("Geçersiz Token", 401);
            next(error);
        }
        const user = yield auth_1.default.findByPk(decoded === null || decoded === void 0 ? void 0 : decoded.sub);
        if (!user) {
            const error = new error_1.default("Geçersiz Token", 401);
            next(error);
        }
        req.user = user;
        next();
    }));
});
exports.authMiddleware = authMiddleware;
