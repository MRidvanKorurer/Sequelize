"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IResponse {
    constructor(message = null, data = null, token) {
        this.message = message;
        this.data = data;
        this.token = token;
    }
    success(res) {
        var _a;
        return res.status(200).json({
            success: true,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarılı",
            data: this.data,
            token: this.token
        });
    }
    created(res) {
        var _a;
        return res.status(201).json({
            success: true,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Create İşlemi Başarılı",
            data: this.data,
            token: this.token
        });
    }
}
exports.default = IResponse;
